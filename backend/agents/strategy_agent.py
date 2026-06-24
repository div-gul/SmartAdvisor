import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from agents.base_agent import BaseAgent
from models import ConversationContext, AgentResponse
from services.llm_service import call_llm_json

class StrategyAgent(BaseAgent):
    name = "strategy"
    description = "Strategy Agent (Supervisor) - Orchestrates agent transitions and defines Next Best Action"
    
    system_prompt = """You are the master Strategy Supervisor AI for SBI Onboarding.
Your job is to read the FULL conversation context, previous agent decisions, and the user's latest input, then decide which agent should handle the next turn.

Available Workers:
1. "research" - profile extraction & persona creation. Run this at the start of a conversation, or if no persona exists.
2. "qualification" - BANT qualification. Run this if the persona is known but lead is not fully qualified (need timeline, budget, interest specifics).
3. "sales" - pitching, negotiation, upselling, handling pricing objections, or scheduling demos. Run this if lead is qualified (Warm/Hot), or if the user asks product questions, makes objections, or is ready to make a decision.
4. "followup" - re-engagement for inactive users or closing the loop on cold leads.

Routing Decision Rules:
- If persona is null/unknown -> MUST route to "research".
- If user info has changed or first interaction -> route to "research".
- If persona is known but qualification is NOT complete -> route to "qualification".
- If user asks about product details, rates, eligibility, or displays buying intent -> route to "sales".
- If user complains about cost or says "too expensive" -> route to "sales" (objection handling).
- If qualification is complete and lead is Warm/Hot -> route to "sales".
- If user stops responding, says goodbye, or conversation is dead -> route to "followup".

Output EXACTLY this JSON structure:
{
  "next_agent": "research" | "qualification" | "sales" | "followup",
  "reason": "Clear explanation of why this transition is made",
  "recommended_action": {
    "action": "Schedule Demo" | "Send Discount" | "Share Product Details" | "Request Contact Info" | "Send Follow-Up" | "Close Sale",
    "priority": "low" | "medium" | "high",
    "details": "Specific action guidelines"
  },
  "conversation_phase": "greeting" | "profiling" | "qualification" | "pitch" | "objection" | "closing",
  "confidence": 0.0 to 1.0
}
"""

    async def run(self, context: ConversationContext) -> AgentResponse:
        context_summary = self._get_context_summary(context)
        history = self._format_messages(context)
        
        prompt = f"""
Current State:
{context_summary}

Chat History:
{history}

Please decide the next agent to invoke, provide the reason, and output the Next Best Action.
"""
        decision_dict = await call_llm_json(self.system_prompt, [{"role": "user", "content": prompt}])
        
        # Fallback safety validation
        next_agent = decision_dict.get("next_agent", "qualification")
        if not context.persona or context.persona.persona == "Unknown":
            next_agent = "research"
        elif context.qualification_complete and next_agent == "qualification":
            next_agent = "sales"
            
        decision_dict["next_agent"] = next_agent
        
        return AgentResponse(
            message="", # Supervisor is silent
            agent_name=self.name,
            metadata={"decision": decision_dict},
            state_updates={}
        )
