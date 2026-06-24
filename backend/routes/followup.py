import sys
import os
from fastapi import APIRouter, HTTPException

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from models import FollowUpRequest, FollowUpResponse, FollowUpTarget
from services.state_manager import state_manager
from agents import FollowUpAgent
import database

router = APIRouter(prefix="/followup", tags=["followup"])
followup_agent = FollowUpAgent()

@router.post("", response_model=FollowUpResponse)
async def trigger_followup_endpoint(request: FollowUpRequest):
    try:
        leads_targeted = []
        
        # If target specific lead
        if request.lead_id:
            context = await state_manager.get_context(request.lead_id)
            if not context:
                raise HTTPException(status_code=404, detail="Lead not found")
                
            response = await followup_agent.run(context)
            leads_targeted.append(FollowUpTarget(
                lead_id=request.lead_id,
                message=response.message,
                reason=f"Manually triggered follow-up for lead {request.lead_id}"
            ))
        else:
            # Fetch all active leads from DB
            all_leads = await database.get_all_leads()
            # For demonstration, we target leads that have a conversation but haven't converted
            # and don't have a follow_up_sent state update yet.
            for lead in all_leads[:3]:  # Limit to 3 for safety in hackathon
                lead_id = lead["id"]
                context = await state_manager.get_context(lead_id)
                # Check message count
                if len(context.messages) > 0 and lead["status"] != "qualified":
                    response = await followup_agent.run(context)
                    leads_targeted.append(FollowUpTarget(
                        lead_id=lead_id,
                        message=response.message,
                        reason=f"Automated re-engagement for inactive user with score {lead['lead_score']}"
                    ))
                    
        return FollowUpResponse(
            messages_sent=len(leads_targeted),
            leads_targeted=leads_targeted
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
