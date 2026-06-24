import uuid
from typing import Dict, Optional, Any
from models import ConversationContext, UserInfo, PersonaProfile
import database

class StateManager:
    def __init__(self):
        # In-memory session cache for active conversations
        self._contexts: Dict[str, ConversationContext] = {}

    async def get_context(self, lead_id: str) -> ConversationContext:
        if lead_id in self._contexts:
            return self._contexts[lead_id]

        # Try to load from database
        lead_data = await database.get_lead(lead_id)
        if not lead_data:
            # Fallback: create an empty context
            ctx = ConversationContext(lead_id=lead_id)
            self._contexts[lead_id] = ctx
            return ctx

        # Load chat messages and decisions
        messages = await database.get_messages(lead_id)
        decisions = await database.get_agent_decisions(lead_id)
        
        # Load user info
        user_info = None
        if lead_data.get('user_id'):
            async with database.get_db_connection() as db:
                db.row_factory = database.aiosqlite.Row
                async with db.execute("SELECT * FROM users WHERE id = ?", (lead_data['user_id'],)) as cursor:
                    user_row = await cursor.fetchone()
                    if user_row:
                        user_info = UserInfo(
                            name=user_row['name'] or "",
                            email=user_row['email'] or "",
                            phone=user_row['phone'] or "",
                            occupation=user_row['occupation'] or "",
                            income=user_row['income'] or "",
                            goals=user_row['goals'] or "",
                            age=user_row['age'] or "",
                            risk_tolerance=user_row['risk_tolerance'] or ""
                        )
        # Parse persona
        persona = None
        if lead_data.get('persona'):
            p_data = lead_data['persona']
            persona = PersonaProfile(
                persona=p_data.get('persona', 'Unknown'),
                budget=p_data.get('budget', 'unknown'),
                intent=p_data.get('intent', 'general_inquiry'),
                risk_tolerance=p_data.get('risk_tolerance', 'moderate'),
                likely_products=p_data.get('likely_products', []),
                key_concerns=p_data.get('key_concerns', []),
                communication_style=p_data.get('communication_style', 'friendly')
            )

        ctx = ConversationContext(
            lead_id=lead_id,
            messages=messages,
            persona=persona,
            lead_score=lead_data.get('lead_score', 0),
            lead_tier=lead_data.get('lead_tier', 'Cold'),
            user_info=user_info,
            current_product=lead_data.get('recommended_product'),
            agent_decisions=decisions,
            qualification_complete=lead_data.get('status') == 'qualified'
        )
        
        self._contexts[lead_id] = ctx
        return ctx

    async def get_or_create_lead(self, lead_id: Optional[str], user_info: Optional[UserInfo] = None) -> str:
        if not lead_id:
            lead_id = str(uuid.uuid4())
            
        lead_data = await database.get_lead(lead_id)
        existing_user_id = lead_data.get("user_id") if lead_data else None
        
        user_id = existing_user_id
        
        # If no user is linked to the lead yet, find or create one based on email
        if not user_id and user_info and user_info.email:
            existing_user = await database.get_user_by_email(user_info.email)
            if existing_user:
                user_id = existing_user["id"]
            else:
                user_id = str(uuid.uuid4())
                await database.save_user(
                    user_id=user_id,
                    name=user_info.name or "",
                    email=user_info.email or "",
                    phone=user_info.phone or ""
                )
        
        # If lead does not exist in DB, create it
        if not lead_data:
            await database.save_lead(lead_id=lead_id, user_id=user_id)
        elif user_id and not existing_user_id:
            # Link user to lead if not done already
            await database.update_lead(lead_id, user_id=user_id)
            
        # Retrieve context (either newly created or cached/loaded)
        ctx = await self.get_context(lead_id)
        
        # Sync user info updates
        if user_info:
            user_info_changed = False
            if ctx.user_info:
                # Compare fields to check for changes
                fields_to_compare = ["name", "email", "phone", "occupation", "income", "goals", "age", "risk_tolerance"]
                for f in fields_to_compare:
                    old_val = getattr(ctx.user_info, f, "") or ""
                    new_val = getattr(user_info, f, "") or ""
                    if str(old_val).strip() != str(new_val).strip():
                        user_info_changed = True
                        break
            else:
                user_info_changed = True
                
            if user_info_changed:
                ctx.user_info = user_info
                # Save updates to DB if user exists
                if user_id:
                    await database.update_user_profile(
                        user_id,
                        name=user_info.name,
                        phone=user_info.phone,
                        age=user_info.age,
                        occupation=user_info.occupation,
                        income=user_info.income,
                        goals=user_info.goals,
                        risk_tolerance=user_info.risk_tolerance
                    )
                # Reset persona in memory and database so ResearchAgent re-runs
                ctx.persona = None
                await database.update_lead(lead_id, persona=None)
            
        return lead_id

    async def add_message(self, lead_id: str, role: str, content: str, agent_name: Optional[str] = None):
        ctx = await self.get_context(lead_id)
        ctx.messages.append({
            "role": role,
            "content": content,
            "agent_name": agent_name
        })
        # Save to DB
        await database.save_message(lead_id, role, content, agent_name)

    async def update_context(self, lead_id: str, **updates):
        ctx = await self.get_context(lead_id)
        
        db_updates = {}
        for key, val in updates.items():
            if hasattr(ctx, key):
                setattr(ctx, key, val)
            
            # Map context fields to DB columns
            if key == "persona":
                db_updates["persona"] = val.dict() if val else None
            elif key == "lead_score":
                db_updates["lead_score"] = val
            elif key == "lead_tier":
                db_updates["lead_tier"] = val
            elif key == "current_product":
                db_updates["recommended_product"] = val
            elif key == "qualification_complete":
                db_updates["status"] = "qualified" if val else "active"

        if db_updates:
            await database.update_lead(lead_id, **db_updates)

state_manager = StateManager()
