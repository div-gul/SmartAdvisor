import sys
import os
from fastapi import APIRouter, HTTPException

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from models import RecommendResponse
from services.state_manager import state_manager
from services.llm_service import call_llm_json

router = APIRouter(prefix="/recommend", tags=["recommend"])

@router.get("", response_model=RecommendResponse)
async def get_recommendation_endpoint(lead_id: str):
    try:
        context = await state_manager.get_context(lead_id)
        if not context:
            raise HTTPException(status_code=404, detail="Lead not found")
            
        persona_str = context.persona.persona if context.persona else "General Visitor"
        likely_prods = context.persona.likely_products if context.persona else []
        
        system_prompt = """You are an expert product recommender for SBI banking.
Analyze the user's persona and context, then recommend the single best product and a list of alternative choices.

SBI CATALOG:
1. SBI Smart Savings (zero balance account)
2. SBI Elite Card (premium rewards card)
3. SBI Personal Loan (quick unsecured credit)
4. SBI Fixed Deposit (stable guaranteed returns)
5. SBI Mutual Fund SIP (wealth building investment)
6. SBI Education Loan (student studies credit)

Provide output in JSON format:
{
  "product": "Name of best product",
  "reason": "Detailed matching reason linking user's profile to product benefits",
  "match_score": 0 to 100,
  "alternatives": [
     {"product": "Alt product 1", "reason": "Alternative match reason", "match_score": 0-100}
  ]
}
"""
        user_prompt = f"Persona: {persona_str}\nLikely Products: {likely_prods}\nMessages count: {len(context.messages)}"
        
        res_dict = await call_llm_json(system_prompt, [{"role": "user", "content": user_prompt}])
        
        product = res_dict.get("product", "SBI Smart Savings")
        reason = res_dict.get("reason", "Perfect zero-balance entry level account.")
        match_score = res_dict.get("match_score", 85)
        alternatives = res_dict.get("alternatives", [])
        
        # Save recommended product to context
        await state_manager.update_context(lead_id, current_product=product)
        
        return RecommendResponse(
            lead_id=lead_id,
            product=product,
            reason=reason,
            match_score=match_score,
            alternatives=alternatives
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
