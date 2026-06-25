import sys
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from models import ChatRequest, ChatResponse, AgentDecision, NextBestAction, PersonaProfile
from services.state_manager import state_manager
from services.lead_scorer import calculate_lead_score
from agents import ResearchAgent, QualificationAgent, StrategyAgent, SalesAgent, FollowUpAgent
import database

router = APIRouter(prefix="/chat", tags=["chat"])

# Instantiate agents
research_agent = ResearchAgent()
qualification_agent = QualificationAgent()
strategy_agent = StrategyAgent()
sales_agent = SalesAgent()
followup_agent = FollowUpAgent()

agent_map = {
    "research": research_agent,
    "qualification": qualification_agent,
    "sales": sales_agent,
    "followup": followup_agent
}

@router.post("", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # 1. Get or create lead and sync user_info
        lead_id = await state_manager.get_or_create_lead(
            lead_id=request.lead_id, 
            user_info=request.user_info
        )
        
        # 2. Add user message to state & database
        await state_manager.add_message(lead_id, "user", request.user_message)
        
        # 3. Retrieve context
        context = await state_manager.get_context(lead_id)
        
        # 4. If no persona exists yet, run research first to initialize it
        if not context.persona or context.persona.persona == "Unknown":
            res_response = await research_agent.run(context)
            
            if "persona" in res_response.state_updates:
                await state_manager.update_context(lead_id, persona=res_response.state_updates["persona"])
            # Refresh context with new persona
            context = await state_manager.get_context(lead_id)
            
        # 5. Run Strategy Agent (Supervisor) to decide next agent
        strategy_response = await strategy_agent.run(context)
        decision_data = strategy_response.metadata.get("decision", {})
        
        # Extract decision details
        next_agent_name = decision_data.get("next_agent", "qualification")
        reason = decision_data.get("reason", "Routing based on context analysis")
        conversation_phase = decision_data.get("conversation_phase", "qualification")
        confidence = decision_data.get("confidence", 0.8)
        
        action_data = decision_data.get("recommended_action", {})
        nba = NextBestAction(
            action=action_data.get("action", "Request Contact Info"),
            priority=action_data.get("priority", "medium"),
            details=action_data.get("details", "")
        )
        
        # Log strategy decision
        await database.save_agent_decision(
            lead_id=lead_id,
            agent_name="strategy",
            decision=decision_data,
            context_summary=f"Next agent chosen: {next_agent_name}. Reason: {reason}"
        )
        
        # 6. Execute the chosen worker agent
        worker_agent = agent_map.get(next_agent_name, qualification_agent)
        worker_response = await worker_agent.run(context)
        
        # 7. Apply worker updates to context
        updates = worker_response.state_updates
        if updates:
            await state_manager.update_context(lead_id, **updates)
            
        # 8. Recalculate lead score
        updated_context = await state_manager.get_context(lead_id)
        score, tier, explanation = calculate_lead_score(updated_context)
        await state_manager.update_context(lead_id, lead_score=score, lead_tier=tier)
        
        # 9. Add assistant response to history
        await state_manager.add_message(lead_id, "assistant", worker_response.message, agent_name=next_agent_name)
        
        # 10. Update DB record for lead
        recommended_prod = updated_context.current_product
        await database.save_lead(
            lead_id=lead_id,
            persona=updated_context.persona.dict() if updated_context.persona else None,
            lead_score=score,
            lead_tier=tier,
            status="qualified" if updated_context.qualification_complete else "active",
            recommended_product=recommended_prod,
            recommended_action=nba.dict()
        )
        
        # Build decision schema
        agent_decision = AgentDecision(
            next_agent=next_agent_name,
            reason=reason,
            recommended_action=nba,
            conversation_phase=conversation_phase,
            confidence=confidence
        )
        
        return ChatResponse(
            lead_id=lead_id,
            response=worker_response.message,
            agent_used=next_agent_name,
            lead_score=score,
            lead_tier=tier,
            next_best_action=nba,
            persona=updated_context.persona,
            agent_decision=agent_decision
        )
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
