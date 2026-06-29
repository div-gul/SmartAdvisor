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

def calculate_conversion_probability(context: ConversationContext) -> float:
    # Start from the deterministic lead score so ML telemetry aligns with qualification quality.
    score, _, _ = calculate_lead_score(context)
    prob = max(0.10, (score / 100) * 0.55)
    
    # Increase based on persona identification
    if context.persona and context.persona.persona != "Unknown":
        prob += 0.20
        
    # Increase based on profile completeness (name, email, phone, age, income)
    if context.user_info:
        info_fields = [context.user_info.name, context.user_info.email, context.user_info.phone, context.user_info.income]
        fields_filled = sum(1 for f in info_fields if f)
        prob += fields_filled * 0.05
        
    # Increase based on qualification completeness
    if context.qualification_complete:
        prob += 0.25
        
    # Increase based on engagement levels
    user_msgs = sum(1 for m in context.messages if m.get("role") == "user")
    prob += min(user_msgs * 0.03, 0.15)
    
    # Check for buying signals in last user message
    user_messages = [m for m in context.messages if m.get("role") == "user"]
    if user_messages:
        last_msg = user_messages[-1].get("content", "").lower()
        if any(x in last_msg for x in ["yes", "ok", "sure", "apply", "go ahead", "do it", "agree", "proceed"]):
            prob = 0.99
            
    return min(max(prob, 0.0), 0.99)

