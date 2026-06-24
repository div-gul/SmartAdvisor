from models import ConversationContext

def calculate_lead_score(context: ConversationContext) -> tuple[int, str, str]:
    """
    Returns (score, tier, explanation)
    """
    score = 20  # Base score
    factors = []
    
    # 1. Persona identified
    if context.persona and context.persona.persona != "Unknown":
        score += 15
        factors.append("Persona identified (+15)")
        
    # 2. Budget verified
    if context.persona and context.persona.budget not in ("unknown", "none"):
        score += 10
        factors.append("Budget level verified (+10)")
        
    # 3. Intent specific
    if context.persona and context.persona.intent not in ("general_inquiry", "unknown"):
        score += 15
        factors.append("Specific purchase intent (+15)")
        
    # 4. User info richness
    if context.user_info:
        info_count = sum(1 for f in (context.user_info.email, context.user_info.phone, context.user_info.income) if f)
        if info_count > 0:
            added = info_count * 5
            score += added
            factors.append(f"Contact/Income info provided (+{added})")
            
    # 5. Product interest
    if context.current_product:
        score += 10
        factors.append(f"Product interest: {context.current_product} (+10)")
        
    # 6. Engagement levels (messages sent by user)
    user_msgs = sum(1 for m in context.messages if m.get("role") == "user")
    if user_msgs > 0:
        added_msg = min(user_msgs * 3, 15)  # Cap at 15
        score += added_msg
        factors.append(f"High conversation engagement (+{added_msg})")
        
    # 7. Qualification status
    if context.qualification_complete:
        score += 15
        factors.append("Qualification criteria met (+15)")

    # Bound check
    score = min(max(score, 0), 100)
    
    # Determine tier
    if score >= 70:
        tier = "Hot"
    elif score >= 40:
        tier = "Warm"
    else:
        tier = "Cold"
        
    explanation = f"Lead score is {score} ({tier}). Factors: {', '.join(factors) if factors else 'None yet'}."
    return score, tier, explanation
