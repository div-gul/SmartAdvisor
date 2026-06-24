import sys
import os
from fastapi import APIRouter, HTTPException

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from models import PredictResponse
from services.state_manager import state_manager
from services.llm_service import call_llm_json
import database

router = APIRouter(prefix="/predict", tags=["predict"])

@router.get("", response_model=PredictResponse)
async def get_prediction_endpoint(lead_id: str):
    try:
        context = await state_manager.get_context(lead_id)
        if not context:
            raise HTTPException(status_code=404, detail="Lead not found")
            
        persona_str = context.persona.persona if context.persona else "Unknown"
        history_len = len(context.messages)
        score = context.lead_score
        
        system_prompt = """You are an ML forecasting agent predicting customer conversion probability (0.0 to 1.0) for SBI bank products.
Analyze user status and history, then estimate conversion probability and identify key risk factors (objections, timeline delay, budget mismatch).

Provide output in JSON format:
{
  "conversion_probability": 0.0 to 1.0,
  "explanation": "Clear explanation of estimate",
  "risk_factors": ["List of risk factors"]
}
"""
        user_prompt = f"Persona: {persona_str}\nLead Score: {score}\nConversation length: {history_len} messages"
        
        res_dict = await call_llm_json(system_prompt, [{"role": "user", "content": user_prompt}])
        
        prob = res_dict.get("conversion_probability", 0.5)
        explanation = res_dict.get("explanation", "Standard forecast based on chat progression.")
        risks = res_dict.get("risk_factors", [])
        
        # Save to database
        await database.save_prediction(lead_id, "conversion", prob, explanation)
        
        # Update lead record with probability
        await database.update_lead(lead_id, conversion_probability=prob)
        
        return PredictResponse(
            lead_id=lead_id,
            conversion_probability=prob,
            explanation=explanation,
            risk_factors=risks
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
