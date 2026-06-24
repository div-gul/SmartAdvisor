import sys
import os
from abc import ABC, abstractmethod

# Add backend dir to python path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from models import ConversationContext, AgentResponse
from services.llm_service import call_llm, call_llm_json

class BaseAgent(ABC):
    name: str = "base"
    description: str = "Base agent"
    system_prompt: str = ""
    
    @abstractmethod
    async def run(self, context: ConversationContext) -> AgentResponse:
        pass
    
    def _format_messages(self, context: ConversationContext) -> list[dict]:
        """Convert context messages to LLM message format"""
        return [{"role": m.get("role", "user"), "content": m.get("content", "")} for m in context.messages]
    
    def _get_context_summary(self, context: ConversationContext) -> str:
        """Generate a summary of current conversation state"""
        summary = f"Lead ID: {context.lead_id}\n"
        summary += f"Lead Score: {context.lead_score} ({context.lead_tier})\n"
        if context.persona:
            summary += f"Persona: {context.persona.persona} | Budget: {context.persona.budget} | Intent: {context.persona.intent}\n"
        if context.user_info:
            info = context.user_info
            if info.name: summary += f"Name: {info.name}\n"
            if info.age: summary += f"Age: {info.age}\n"
            if info.occupation: summary += f"Occupation: {info.occupation}\n"
            if info.income: summary += f"Income: {info.income}\n"
            if info.goals: summary += f"Goals: {info.goals}\n"
            if info.risk_tolerance: summary += f"Risk Tolerance: {info.risk_tolerance}\n"
        summary += f"Messages exchanged: {len(context.messages)}\n"
        summary += f"Qualification complete: {context.qualification_complete}\n"
        return summary
