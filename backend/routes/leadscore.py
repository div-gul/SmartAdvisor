import sys
import os
from fastapi import APIRouter, HTTPException

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from models import LeadScoreResponse
from services.state_manager import state_manager
from services.lead_scorer import calculate_lead_score
import database

router = APIRouter(prefix="/leadscore", tags=["leadscore"])

@router.get("", response_model=LeadScoreResponse)
async def get_lead_score_endpoint(lead_id: str):
    try:
        context = await state_manager.get_context(lead_id)
        if not context:
            raise HTTPException(status_code=404, detail="Lead not found")
            
        score, tier, explanation = calculate_lead_score(context)
        
        # Build factors breakdown list
        factors = []
        
        has_persona = context.persona and context.persona.persona != "Unknown"
        factors.append({"factor": "Persona Profile Identified", "weight": 15, "met": bool(has_persona)})
        
        has_budget = context.persona and context.persona.budget not in ("unknown", "none")
        factors.append({"factor": "Budget/Income Level Verified", "weight": 10, "met": bool(has_budget)})
        
        has_intent = context.persona and context.persona.intent not in ("general_inquiry", "unknown")
        factors.append({"factor": "Specific Purchase Intent Detected", "weight": 15, "met": bool(has_intent)})
        
        info_count = 0
        if context.user_info:
            info_count = sum(1 for f in (context.user_info.email, context.user_info.phone, context.user_info.income) if f)
        factors.append({"factor": "Customer Contact Details Captured", "weight": 15, "met": info_count > 0})
        
        has_product = bool(context.current_product)
        factors.append({"factor": "Product Recommendation Fit", "weight": 10, "met": has_product})
        
        user_msgs = sum(1 for m in context.messages if m.get("role") == "user")
        factors.append({"factor": "Active Conversation Engagement", "weight": 15, "met": user_msgs >= 3})
        
        factors.append({"factor": "Qualification Process Complete", "weight": 15, "met": context.qualification_complete})
        
        return LeadScoreResponse(
            lead_id=lead_id,
            score=score,
            tier=tier,
            explanation=explanation,
            factors=factors
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
