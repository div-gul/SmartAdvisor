import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from agents.base_agent import BaseAgent
from models import ConversationContext, AgentResponse, PersonaProfile
from services.llm_service import call_llm_json

class ResearchAgent(BaseAgent):
    name = "research"
    description = "Research Agent - Pre-conversation user profiling and persona creation"
    
    system_prompt = """You are an expert Customer Insights Agent for SBI.
Your task is to analyze user profile fields, goals, and initial inputs to build a detailed buyer persona profile as a JSON object.

Classify the user into one of these standard personas:
1. "Tech Enthusiast" - values digital experience, mobile app quality, instant KYC, self-service.
2. "Budget Conscious Professional" - values zero balance, low interest on loans, cashbacks, fee waivers.
3. "Enterprise Buyer" - looking for high-limit credit cards, business lines of credit, tax planning, wealth management.
4. "Student Learner" - looking for education loans, low-limit basic cards, zero balance accounts, study rewards.
5. "Young Professional" - interested in Mutual Fund SIPs, salary accounts, lifestyle cards (Elite card), quick personal loans.
6. "Retired Senior" - values security, fixed deposit yields, senior citizen interest boosts, personalized support.
7. "Small Business Owner" - needs commercial loans, merchant accounts, flexible cash credit, business cards.

Intent Mapping Rules:
- Buying a house, first home, property purchase, mortgage, home financing -> home_loan
- Travel rewards, airport lounge access, premium card, cashback card -> credit_card
- Monthly investing, wealth creation, SIP, mutual funds -> sip
- Education funding, college fees, study abroad -> education_loan
- General banking, savings account, emergency fund -> savings

Return a JSON profile with EXACTLY the following keys:
{
  "persona": "One of the personas above",
  "budget": "low" | "moderate" | "high" | "premium",
  "intent": "savings" | "credit_card" | "personal_loan" | "home_loan" | "fixed_deposit" | "sip" | "education_loan" | "general_inquiry"
  "risk_tolerance": "low" | "moderate" | "high",
 "likely_products": ["Choose 1-2 from: SBI Smart Savings, SBI Elite Card, SBI Personal Loan, SBI Home Loan, SBI Fixed Deposit, SBI Mutual Fund SIP, SBI Education Loan, SBI Life Insurance"],
  "key_concerns": ["concerns like liquidity, interest rate, safety, digital-access, rewards"],
  "communication_style": "formal" | "friendly" | "data-driven" | "educational"
}
"""

    async def run(self, context: ConversationContext) -> AgentResponse:
        user_info_str = ""
        if context.user_info:
            info = context.user_info
            user_info_str = (
                f"Name: {info.name}\n"
                f"Age: {info.age}\n"
                f"Occupation: {info.occupation}\n"
                f"Income: {info.income}\n"
                f"Goals: {info.goals}\n"
                f"Risk Tolerance: {info.risk_tolerance}\n"
            )
            
        # Get first user message if available to add context
        first_msg = ""
        user_msgs = [m for m in context.messages if m.get("role") == "user"]
        if user_msgs:
            first_msg = f"User Initial Message: {user_msgs[0]['content']}"

        prompt = f"Please analyze this user input and generate their persona profile:\n\n{user_info_str}\n{first_msg}"
        
        # Call LLM
        persona_dict = await call_llm_json(self.system_prompt, [{"role": "user", "content": prompt}])
        print("RESEARCH AGENT OUTPUT:", persona_dict)
        
        # Create profile model
        profile = PersonaProfile(
            persona=persona_dict.get("persona", "Young Professional"),
            budget=persona_dict.get("budget", "moderate"),
            intent=persona_dict.get("intent", "general_inquiry"),
            risk_tolerance=persona_dict.get("risk_tolerance", "moderate"),
            likely_products=persona_dict.get("likely_products", ["SBI Smart Savings"]),
            key_concerns=persona_dict.get("key_concerns", ["digital experience"]),
            communication_style=persona_dict.get("communication_style", "friendly")
        )
        
        greeting = "Welcome! I'm ready to assist you with your banking needs. What financial goal would you like help with today?"
            
        return AgentResponse(
            message=greeting,
            agent_name=self.name,
            metadata={"persona": profile.dict()},
            state_updates={"persona": profile}
        )
