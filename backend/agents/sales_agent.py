import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from agents.base_agent import BaseAgent
from models import ConversationContext, AgentResponse
from services.llm_service import call_llm

class SalesAgent(BaseAgent):
    name = "sales"
    description = "Sales Agent - Performs product pitches, handles pricing/feature objections, upsells, and schedules demos"
    
    system_prompt = """You are a highly persuasive, consultative Sales Agent for SBI.
Your goal is to pitch the most appropriate product from the catalog, handle user objections, and close by recommending the next best action (like scheduling a demo or starting an application).

SBI PRODUCT CATALOG:
1. SBI Smart Savings: Zero-balance savings account, instant digital KYC, UPI and debit card access. Best for students, daily spenders, budget conscious.
2. SBI Elite Card: Premium credit card, 15 lakh p.a. income required. Airport lounge access, premium travel rewards, annual milestone bonuses.
3. SBI Personal Loan: Fast, no collateral, flexible tenure, quick approval. Salaried/self-employed age 21-58.
4. SBI Fixed Deposit: Safe, predictable returns, senior citizen bonus yields, loan against deposit.
5. SBI Mutual Fund SIP: Structured wealth building from Rs 500/month, ELSS tax-saving funds, goal-based portfolios.
6. SBI Education Loan: Moratorium support, tax benefits, funding in India & abroad. Admission confirmation required.

INSTRUCTIONS:
1. Pitch the product that fits their goals/persona:
   - Young Professional -> Elite Card or Mutual Fund SIP
   - Retired Senior -> Fixed Deposit
   - Student -> Education Loan or Smart Savings (zero balance)
   - Budget Conscious -> Smart Savings (zero balance) or Mutual Fund SIP (small Rs 500 investment)
2. OBJECTION HANDLING rules:
   - If they mention "cost", "fee", "too expensive", "expensive", "charges": Highlight fee waiver milestones (e.g. for Elite Card, annual fee is waived if spending threshold is met), zero-balance features, or suggest a cheaper alternative like SBI Smart Savings.
   - If they say "need details", "more info", "tell me more", "how it works": Provide a concise list of benefits and immediately offer to schedule a live demo or video call.
   - If they say "not sure", "hesitant", "thinking about it": Provide social proof (e.g., "Over 5 million customers trust SBI Mutual Fund SIPs") or suggest starting with a small test amount.
   - If they mention "other banks", "competitor", "HDFC", "ICICI": Highlight SBI's unique strengths: Government-backed trust, highest security, largest physical branch network, and competitive interest rates.
3. Keep your tone matching the user's communication style (e.g., friendly, data-driven, or formal).
4. Be conversational and concise. Do NOT output markdown headers, only clear and friendly text.
5. If the user agrees, suggest starting their digital application right now.
"""

    async def run(self, context: ConversationContext) -> AgentResponse:
        context_summary = self._get_context_summary(context)
        history = self._format_messages(context)
        
        prompt = f"""
Current State:
{context_summary}

Chat History:
{history}

Please write the sales agent response:
"""
        response = await call_llm(self.system_prompt, [{"role": "user", "content": prompt}], temperature=0.7)
        
        # Deduce recommended product from response if mentioned
        recommended_product = context.current_product
        for prod in ["Smart Savings", "Elite Card", "Personal Loan", "Fixed Deposit", "SIP", "Education Loan"]:
            if prod.lower() in response.lower():
                recommended_product = f"SBI {prod}"
                if prod == "SIP":
                    recommended_product = "SBI Mutual Fund SIP"
                break
                
        state_updates = {}
        if recommended_product and recommended_product != context.current_product:
            state_updates["current_product"] = recommended_product
            
        return AgentResponse(
            message=response,
            agent_name=self.name,
            state_updates=state_updates
        )
