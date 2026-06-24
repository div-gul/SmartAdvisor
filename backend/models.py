from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class UserInfo(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    occupation: str = ""
    income: str = ""
    goals: str = ""
    age: str = ""
    risk_tolerance: str = ""

class ChatRequest(BaseModel):
    lead_id: Optional[str] = None
    user_message: str
    user_info: Optional[UserInfo] = None

class NextBestAction(BaseModel):
    action: str
    priority: str = "medium"
    details: str = ""

class AgentDecision(BaseModel):
    next_agent: str
    reason: str
    recommended_action: NextBestAction
    conversation_phase: str
    confidence: float = 0.0

class PersonaProfile(BaseModel):
    persona: str = "Unknown"
    budget: str = "unknown"
    intent: str = "general_inquiry"
    risk_tolerance: str = "moderate"
    likely_products: List[str] = Field(default_factory=list)
    key_concerns: List[str] = Field(default_factory=list)
    communication_style: str = "friendly"

class ChatResponse(BaseModel):
    lead_id: str
    response: str
    agent_used: str
    lead_score: int = 0
    lead_tier: str = "Cold"
    next_best_action: Optional[NextBestAction] = None
    persona: Optional[PersonaProfile] = None
    agent_decision: Optional[AgentDecision] = None

class LeadScoreResponse(BaseModel):
    lead_id: str
    score: int
    tier: str
    explanation: str
    factors: List[Dict[str, Any]] = Field(default_factory=list)

class RecommendResponse(BaseModel):
    lead_id: str
    product: str
    reason: str
    match_score: int = 0
    alternatives: List[Dict[str, Any]] = Field(default_factory=list)

class PredictResponse(BaseModel):
    lead_id: str
    conversion_probability: float
    explanation: str
    risk_factors: List[str] = Field(default_factory=list)

class FollowUpRequest(BaseModel):
    lead_id: Optional[str] = None
    days_inactive: int = 1

class FollowUpTarget(BaseModel):
    lead_id: str
    message: str
    reason: str

class FollowUpResponse(BaseModel):
    messages_sent: int
    leads_targeted: List[FollowUpTarget] = Field(default_factory=list)

class ConversationContext(BaseModel):
    lead_id: str
    messages: List[Dict[str, Any]] = Field(default_factory=list)
    persona: Optional[PersonaProfile] = None
    lead_score: int = 0
    lead_tier: str = "Cold"
    user_info: Optional[UserInfo] = None
    current_product: Optional[str] = None
    agent_decisions: List[Dict[str, Any]] = Field(default_factory=list)
    qualification_complete: bool = False

class AgentResponse(BaseModel):
    message: str
    agent_name: str
    metadata: Dict[str, Any] = Field(default_factory=list)
    state_updates: Dict[str, Any] = Field(default_factory=list)
