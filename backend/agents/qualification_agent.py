import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from agents.base_agent import BaseAgent
from models import ConversationContext, AgentResponse
from services.llm_service import call_llm_json

class QualificationAgent(BaseAgent):
    name = "qualification"
    description = "Qualification Agent - Asks smart adaptive questions to qualify lead via BANT"
    
    system_prompt = """You are an expert Lead Qualification Agent at SBI using the BANT framework:
- Budget: Can they afford premium services? What is their income range?
- Authority: Are they the primary decision-maker? (usually Yes for retail banking, but check if co-applicant needed).
- Need: What is their primary pain point or goal? (e.g. tax saving, college fund, business expansion).
- Timeline: When do they want to start or take the loan? (e.g. immediately, in 3 months).

CRITICAL INSTRUCTION: Review the provided user info and conversation history. Identify which BANT fields are ALREADY KNOWN, and DO NOT ask about them. Skip already answered points.
If you know:
- Income/Budget: do NOT ask "what is your income".
- Goal/Need: do NOT ask "what do you need".

If there are unknown fields, ask ONE natural, polite, and conversational question to discover one of the missing details.
If all criteria are satisfied or you have enough info (at least 3 criteria confirmed), mark qualification as complete.

You must respond with a JSON object containing:
{
  "response_message": "Your polite, single conversational question to the user",
  "bant_status": {
    "budget": "confirmed" | "unknown" | "insufficient",
    "authority": "confirmed" | "unknown",
    "need": "confirmed" | "unknown",
    "timeline": "confirmed" | "unknown"
  },
  "qualification_complete": true | false,
  "lead_tier": "Hot" | "Warm" | "Cold",
  "lead_score_delta": 10
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

Please analyze the history, determine BANT status, decide if qualification is complete, and if not, ask the NEXT best question.
"""
        res_dict = await call_llm_json(self.system_prompt, [{"role": "user", "content": prompt}])
        
        complete = res_dict.get("qualification_complete", False)
        
        # Adjust qualification_complete based on BANT status if model is lazy
        status = res_dict.get("bant_status", {})
        confirmed_count = sum(1 for v in status.values() if v == "confirmed")
        if confirmed_count >= 3:
            complete = True
            
        tier = res_dict.get("lead_tier", "Cold")
        msg = res_dict.get("response_message", "Could you share your approximate timeline for getting started?")
        
        state_updates = {
            "lead_tier": tier,
            "qualification_complete": complete
        }
        
        return AgentResponse(
            message=msg,
            agent_name=self.name,
            metadata=res_dict,
            state_updates=state_updates
        )
