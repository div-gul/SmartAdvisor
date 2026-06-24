import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from agents.base_agent import BaseAgent
from models import ConversationContext, AgentResponse
from services.llm_service import call_llm

class FollowUpAgent(BaseAgent):
    name = "followup"
    description = "Follow-Up Agent - Generates highly personalized re-engagement messages for inactive users"
    
    system_prompt = """You are a polite, caring Follow-Up Relationship Manager at SBI.
Your task is to analyze the conversation history and write a highly personalized, contextual re-engagement email/message.

CRITICAL RULES:
1. Never write a generic "We miss you, please come back!" message. That is boring.
2. Reference the SPECIFIC product they were looking at (e.g. SBI Mutual Fund SIP, SBI Elite Card, etc.).
3. Reference their SPECIFIC goals or constraints if mentioned in chat (e.g., saving for travel, tax benefits, starting immediately, or concern about annual fees).
4. Address them by name if known.
5. Create a gentle sense of helpfulness or urgency (e.g., tax filing deadline, limited interest rate offer, or simple next steps).
6. Keep the email/message under 150 words.
7. Output ONLY the re-engagement message itself, no headers, no meta-text.
"""

    async def run(self, context: ConversationContext) -> AgentResponse:
        context_summary = self._get_context_summary(context)
        history = self._format_messages(context)
        
        prompt = f"""
Current State:
{context_summary}

Chat History:
{history}

Please write the personalized follow-up message:
"""
        response = await call_llm(self.system_prompt, [{"role": "user", "content": prompt}], temperature=0.7)
        
        return AgentResponse(
            message=response,
            agent_name=self.name,
            state_updates={"follow_up_sent": True}
        )
