import json
import logging
import re
import litellm
from config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure API keys
if settings.GROQ_API_KEY and settings.GROQ_API_KEY != "your_groq_api_key_here":
    litellm.groq_api_key = settings.GROQ_API_KEY
if settings.OPENAI_API_KEY and settings.OPENAI_API_KEY != "your_openai_api_key_here":
    litellm.api_key = settings.OPENAI_API_KEY

def extract_context_info(messages: list[dict]) -> dict:
    info = {
        "name": "Guest User",
        "income": "",
        "goals": "",
        "occupation": "",
        "age": "",
        "risk": "moderate",
        "last_input": "",
        "persona": ""
    }
    
    # If the message content contains the formatted prompt, parse details from it
    full_content = ""
    for msg in messages:
        content = msg.get("content", "")
        full_content += content + "\n"
        
    # Extract fields using regex/substring from full_content
    name_match = re.search(r"Name:[ \t]*([^\r\n]*)", full_content, re.IGNORECASE)
    if name_match:
        info["name"] = name_match.group(1).strip()
        
    income_match = re.search(r"Income:[ \t]*([^\r\n]*)", full_content, re.IGNORECASE)
    if income_match:
        info["income"] = income_match.group(1).strip()
        
    goals_match = re.search(r"Goals:[ \t]*([^\r\n]*)", full_content, re.IGNORECASE)
    if goals_match:
        info["goals"] = goals_match.group(1).strip()
        
    occupation_match = re.search(r"Occupation:[ \t]*([^\r\n]*)", full_content, re.IGNORECASE)
    if occupation_match:
        info["occupation"] = occupation_match.group(1).strip()
        
    age_match = re.search(r"Age:[ \t]*([^\r\n]*)", full_content, re.IGNORECASE)
    if age_match:
        info["age"] = age_match.group(1).strip()
        
    risk_match = re.search(r"(?:risk tolerance|risk):[ \t]*([^\r\n]*)", full_content, re.IGNORECASE)
    if risk_match and risk_match.group(1).strip():
        info["risk"] = risk_match.group(1).strip()
        
    persona_match = re.search(r"Persona:\s*([^|]*)", full_content, re.IGNORECASE)
    if persona_match:
        info["persona"] = persona_match.group(1).strip()

    # Now let's extract the actual last user input.
    # If the prompt contains the Chat History section, extract the last user message from it.
    last_msg = ""
    history_block_match = re.search(r"Chat History:\s*(\[.*?\])", full_content, re.DOTALL)
    if history_block_match:
        try:
            import ast
            history_list = ast.literal_eval(history_block_match.group(1))
            user_msgs = [m for m in history_list if m.get("role") == "user"]
            if user_msgs:
                last_msg = user_msgs[-1].get("content", "")
        except Exception as e:
            logger.error(f"Error parsing history literal: {e}")
            
    if not last_msg:
        # Fallback to the last msg content if it's not a formatted prompt
        for msg in reversed(messages):
            if msg.get("role") == "user":
                content = msg.get("content", "")
                if "current state:" not in content.lower() and "chat history:" not in content.lower():
                    last_msg = content
                    break
                    
    # If still empty, use a default fallback
    if not last_msg and messages:
        last_msg = messages[-1].get("content", "")
        
    info["last_input"] = last_msg
    return info

async def call_llm(system_prompt: str, messages: list[dict], temperature: float = 0.7) -> str:
    provider = settings.LLM_PROVIDER.lower()
    model = settings.LLM_MODEL
    
    if provider == "groq":
        model_str = f"groq/{model}"
        api_key = settings.GROQ_API_KEY
    elif provider == "openai":
        model_str = model
        api_key = settings.OPENAI_API_KEY
    else:
        model_str = f"{provider}/{model}"
        api_key = getattr(settings, f"{provider.upper()}_API_KEY", None)

    # Check if a valid API key is present
    if not api_key or api_key.startswith("your_") or api_key == "":
        logger.warning(f"API key for {provider} not configured. Returning dynamic fallback response.")
        return get_mock_response(system_prompt, messages)

    formatted_msgs = [{"role": "system", "content": system_prompt}]
    for msg in messages:
        formatted_msgs.append({
            "role": msg.get("role", "user"),
            "content": msg.get("content", "")
        })

    try:
        response = await litellm.acompletion(
            model=model_str,
            messages=formatted_msgs,
            temperature=temperature,
            api_key=api_key
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"LLM Call failed for {model_str}: {e}. Falling back to dynamic mock.")
        return get_mock_response(system_prompt, messages)

async def call_llm_json(system_prompt: str, messages: list[dict], temperature: float = 0.3) -> dict:
    provider = settings.LLM_PROVIDER.lower()
    model = settings.LLM_MODEL
    
    if provider == "groq":
        model_str = f"groq/{model}"
        api_key = settings.GROQ_API_KEY
    elif provider == "openai":
        model_str = model
        api_key = settings.OPENAI_API_KEY
    else:
        model_str = f"{provider}/{model}"
        api_key = getattr(settings, f"{provider.upper()}_API_KEY", None)

    if not api_key or api_key.startswith("your_") or api_key == "":
        return get_mock_json_response(system_prompt, messages)

    formatted_msgs = [{"role": "system", "content": system_prompt}]
    for msg in messages:
        formatted_msgs.append({
            "role": msg.get("role", "user"),
            "content": msg.get("content", "")
        })

    try:
        response = await litellm.acompletion(
            model=model_str,
            messages=formatted_msgs,
            temperature=temperature,
            response_format={"type": "json_object"},
            api_key=api_key
        )
        raw_res = response.choices[0].message.content
        cleaned = raw_res.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        return json.loads(cleaned.strip())
    except Exception as e:
        logger.error(f"LLM JSON Call failed: {e}. Falling back to dynamic JSON mock.")
        return get_mock_json_response(system_prompt, messages)

def classify_persona(info: dict, last_msg: str) -> dict:
    occupation = info["occupation"].lower()
    goals = info["goals"].lower()
    income = info["income"].lower()
    age = info["age"].lower()
    risk = info["risk"].lower()
    last_msg = last_msg.lower()
    
    # Defaults
    persona = "Young Professional"
    budget = "moderate"
    intent = "general_inquiry"
    likely_products = ["SBI Smart Savings"]
    key_concerns = ["digital-access", "interest rate"]
    communication_style = "friendly"
    
    # 1. Student Learner
    if "student" in occupation or "study" in goals or "education" in goals or "student" in last_msg or (age.isdigit() and int(age) < 22):
        persona = "Student Learner"
        budget = "low"
        intent = "education_loan"
        likely_products = ["SBI Education Loan", "SBI Smart Savings"]
        key_concerns = ["zero balance", "interest rate"]
        communication_style = "educational"
        
    # 2. Retired Senior
    elif "retire" in occupation or "senior" in last_msg or "fd" in last_msg or "fixed deposit" in last_msg or (age.isdigit() and int(age) >= 60):
        persona = "Retired Senior"
        budget = "moderate"
        intent = "fixed_deposit"
        likely_products = ["SBI Fixed Deposit"]
        key_concerns = ["safety", "interest rate"]
        communication_style = "formal"
        
    # 3. Small Business Owner
    elif "business" in occupation or "merchant" in occupation or "owner" in occupation or "shop" in last_msg or "commercial" in last_msg:
        persona = "Small Business Owner"
        budget = "high"
        intent = "personal_loan"
        likely_products = ["SBI Personal Loan", "SBI Elite Card"]
        key_concerns = ["liquidity", "rewards"]
        communication_style = "data-driven"
        
    # 4. Enterprise Buyer
    elif "enterprise" in occupation or "ceo" in occupation or "director" in occupation or "high net worth" in goals or "corporate" in last_msg:
        persona = "Enterprise Buyer"
        budget = "premium"
        intent = "credit_card"
        likely_products = ["SBI Elite Card"]
        key_concerns = ["rewards", "safety"]
        communication_style = "formal"
        
    # 5. Tech Enthusiast
    elif "tech" in occupation or "developer" in occupation or "software" in occupation or "digital" in goals or "online" in last_msg:
        persona = "Tech Enthusiast"
        budget = "moderate"
        intent = "savings"
        likely_products = ["SBI Smart Savings", "SBI Mutual Fund SIP"]
        key_concerns = ["digital-access", "rewards"]
        communication_style = "friendly"
        
    # 6. Budget Conscious Professional
    elif "budget" in goals or "zero balance" in last_msg or "save money" in goals or "saving money" in last_msg or "save money" in last_msg or "saving" in last_msg or "cashback" in last_msg:
        persona = "Budget Conscious Professional"
        budget = "low"
        intent = "savings"
        likely_products = ["SBI Smart Savings"]
        key_concerns = ["zero balance", "liquidity"]
        communication_style = "educational"
        
    # 7. Young Professional (Fallback/Default check)
    else:
        persona = "Young Professional"
        budget = "moderate"
        if "sip" in last_msg or "invest" in goals or "mutual fund" in last_msg:
            intent = "sip"
            likely_products = ["SBI Mutual Fund SIP", "SBI Elite Card"]
        elif "loan" in last_msg or "personal loan" in last_msg:
            intent = "personal_loan"
            likely_products = ["SBI Personal Loan"]
        else:
            intent = "savings"
            likely_products = ["SBI Smart Savings", "SBI Mutual Fund SIP"]
        key_concerns = ["digital-access", "interest rate"]
        communication_style = "friendly"
        
    # Determine budget from income
    if any(x in income for x in ["15 lakh", "20 lakh", "25 lakh", "30 lakh", "40 lakh", "50 lakh", "crore"]):
        budget = "premium"
    elif any(x in income for x in ["8 lakh", "10 lakh", "12 lakh", "15 lakh"]):
        budget = "high"
    elif any(x in income for x in ["3 lakh", "4 lakh", "5 lakh", "6 lakh"]):
        budget = "moderate"
    elif income:
        budget = "low"
        
    return {
        "persona": persona,
        "budget": budget,
        "intent": intent,
        "risk_tolerance": risk if risk else "moderate",
        "likely_products": likely_products,
        "key_concerns": key_concerns,
        "communication_style": communication_style
    }

def get_mock_response(system_prompt: str, messages: list[dict]) -> str:
    info = extract_context_info(messages)
    last_msg = info["last_input"].lower()
    name_first = info["name"].split()[0] if info["name"] and info["name"] != "Guest User" else "there"
    sys_lower = system_prompt.lower()
    
    # 1. Objection Handling
    if "too expensive" in last_msg or "charge" in last_msg or "fee" in last_msg or "cost" in last_msg:
        if "card" in last_msg or "elite" in last_msg or (info["goals"] and "card" in info["goals"].lower()):
            return f"Hi {name_first}, I completely understand your concern about the fees. We can actually waive the annual charge of Rs 4,999 on the SBI Elite Card if you hit a basic milestone spend in the first 90 days. Shall we go ahead with this?"
        return f"Hi {name_first}, I completely understand your concern about the fees. Many of our primary products, like the SBI Smart Savings account and our basic credit options, offer a zero-balance facility or complete fee waiver programs. Shall we check your options?"

    # Determine product context using persona classification
    classification = classify_persona(info, last_msg)
    target_product = classification["likely_products"][0] if classification["likely_products"] else "SBI Smart Savings"
    
    # Overwrite target product if user explicitly mentions another category
    if "saving money" in last_msg or "save money" in last_msg or "savings" in last_msg or "saving" in last_msg or "smart savings" in last_msg:
        target_product = "SBI Smart Savings"
    elif "card" in last_msg or "credit" in last_msg or "elite" in last_msg:
        target_product = "SBI Elite Card"
    elif "loan" in last_msg or "borrow" in last_msg or "education" in last_msg or "personal" in last_msg:
        if "education" in last_msg or "student" in info["occupation"].lower() or "study" in info["goals"].lower():
            target_product = "SBI Education Loan"
        else:
            target_product = "SBI Personal Loan"
    elif "fd" in last_msg or "fixed deposit" in last_msg:
        target_product = "SBI Fixed Deposit"
    elif "sip" in last_msg or "invest" in last_msg or "mutual fund" in last_msg:
        if classification["persona"] == "Retired Senior":
            target_product = "SBI Fixed Deposit"
        else:
            target_product = "SBI Mutual Fund SIP"

    # 2. Sales Agent Pitching
    if "sales" in sys_lower:
        print(f"[DEBUG SALES] sys_lower: '{sys_lower}', last_msg: '{last_msg}', target_product: '{target_product}'")
        # Check if user shows agreement/buying signal to close the sale
        if any(x in last_msg for x in ["yes", "ok", "sure", "apply", "go ahead", "do it", "agree", "proceed", "close", "start", "sign up"]):
            print("[DEBUG SALES] MATCHED AGREEMENT! CLOSING SALE.")
            return f"Excellent decision, {name_first}! I have successfully processed your application interest and closed the sale. Your conversion probability is now at 99%! Let's get your digital onboarding and KYC finalized. Please check your dashboard for the next steps!"
            
        if target_product == "SBI Elite Card":
            return f"The SBI Elite Card offers premium lifestyle rewards like airport lounge access and points on travel. Based on your income, it's a great match. Would you like me to guide you through starting a digital application?"
        elif target_product == "SBI Mutual Fund SIP":
            return f"An SBI Mutual Fund SIP is perfect for your goals of '{info['goals']}'. It allows you to build wealth disciplined from as little as Rs 500 per month. Shall we schedule a brief demo or set it up?"
        elif target_product == "SBI Personal Loan":
            return f"SBI Personal Loans offer fast, collateral-free approvals with flexible tenures. Let me know how much you need, and I'll estimate your monthly EMIs and check your eligibility."
        elif target_product == "SBI Education Loan":
            return f"SBI Education Loans offer moratorium support, tax benefits, and flexible repayment terms for studies. Would you like to check our direct university funding options?"
        elif target_product == "SBI Fixed Deposit":
            return f"SBI Fixed Deposits offer complete safety and guaranteed returns. As a senior citizen, you can earn up to 0.50% extra yield. Shall we open a deposit online?"
        else:
            return f"The SBI Smart Savings account is perfect for your day-to-day banking. It has zero-balance requirements and instant KYC. Shall I help you start a draft application?"

    # 3. Qualification flow
    if "qualif" in sys_lower:
        has_income = info["income"] != ""
        has_goals = info["goals"] != ""
        has_age = info["age"] != ""
        
        if not has_income:
            return f"To match you with the right banking option, {name_first}, could you share your approximate annual income?"
        elif not has_age:
            return f"Thank you, {name_first}. Could you please share your age to verify eligibility for {target_product}?"
        elif not has_goals:
            return f"Understood. What are your primary financial goals or timelines for setting up {target_product}?"
        else:
            return f"Got it, {name_first}! Your profile details match the criteria for {target_product}. What is your preferred timeline to get started?"

    # 4. Follow Up Re-engagement
    if "followup" in sys_lower or "follow-up" in sys_lower:
        return f"Hi {name_first}, you were looking at the SBI product options for your goals: '{info['goals']}'. Since our last chat, we have updated interest yields — would you like to review them?"

    # 5. Fallback/Research
    if "research" in sys_lower or "insights" in sys_lower or "persona" in sys_lower:
        return f"Welcome! Based on your interest, I've identified you as a candidate for SBI's top-tier banking products. I recommend we explore {target_product}. How can I help you today?"

    return f"Hi {name_first}! I'm your SBI Smart Onboarding Assistant. Let me ask a few quick questions to match you with the perfect savings, investment, or credit option."

def get_mock_json_response(system_prompt: str, messages: list[dict]) -> dict:
    info = extract_context_info(messages)
    last_msg = info["last_input"].lower()
    sys_lower = system_prompt.lower()
    name_first = info["name"].split()[0] if info["name"] and info["name"] != "Guest User" else "there"
    
    # Run classification helper
    classification = classify_persona(info, last_msg)
    
    if "research" in sys_lower or "insights" in sys_lower or "persona" in sys_lower:
        return classification
        
    elif "qualif" in sys_lower:
        has_income = info["income"] != ""
        has_goals = info["goals"] != ""
        has_age = info["age"] != ""
        
        target_product = classification["likely_products"][0] if classification["likely_products"] else "SBI Smart Savings"
        
        if not has_income:
            msg = f"To match you with the right banking option, {name_first}, could you share your approximate annual income?"
        elif not has_age:
            msg = f"Thank you, {name_first}. Could you please share your age to verify eligibility for {target_product}?"
        elif not has_goals:
            msg = f"Understood. What are your primary financial goals or timelines for setting up {target_product}?"
        else:
            msg = f"Got it, {name_first}! Your profile details match the criteria for {target_product}. What is your preferred timeline to get started?"
            
        has_budget = has_income
        has_timeline = "timeline" in last_msg or "month" in last_msg or "now" in last_msg or "week" in last_msg or "start" in last_msg or "today" in last_msg or (has_income and has_goals and has_age)
        
        return {
            "response_message": msg,
            "bant_status": {
                "budget": "confirmed" if has_budget else "unknown",
                "authority": "confirmed",
                "need": "confirmed" if has_goals else "unknown",
                "timeline": "confirmed" if has_timeline else "unknown"
            },
            "qualification_complete": has_budget and has_timeline and has_goals and has_age,
            "lead_tier": "Hot" if (has_budget and has_timeline) else ("Warm" if has_budget else "Cold"),
            "lead_score_delta": 20 if (has_budget and has_timeline) else 10
        }
        
    elif "strategy" in sys_lower or "supervisor" in sys_lower:
        # Determine routing transition
        next_agent = "qualification"
        reason = "Gathering initial details and verifying eligibility criteria."
        action = "Request Contact Info"
        phase = "qualification"
        
        has_all_profile = info["name"] and info["income"] and info["goals"] and info["age"] and info["name"] != "Guest User"
        
        if not info["name"] or info["name"] == "Guest User":
            next_agent = "research"
            reason = "New guest user detected. Running Research Agent to create persona."
            action = "Request Contact Info"
            phase = "profiling"
        elif not has_all_profile:
            next_agent = "qualification"
            reason = "Profile fields are incomplete. Routing to Qualification Agent to gather BANT/eligibility details."
            action = "Request Contact Info"
            phase = "qualification"
        elif "expensive" in last_msg or "fee" in last_msg or "cost" in last_msg or "charge" in last_msg:
            next_agent = "sales"
            reason = "Objection detected regarding product cost/fees. Routing to Sales Agent for objection handling."
            action = "Send Discount"
            phase = "objection"
        elif "apply now" in last_msg or "go ahead" in last_msg or "proceed" in last_msg or "buy" in last_msg or "start application" in last_msg:
            next_agent = "sales"
            reason = "User shows clear buying signal. Routing to Sales Agent to close sale."
            action = "Close Sale"
            phase = "closing"
        else:
            next_agent = "sales"
            reason = "User profile and eligibility are verified. Routing to Sales Agent to pitch the target product."
            action = "Share Product Details"
            phase = "pitch"
            
        return {
            "next_agent": next_agent,
            "reason": reason,
            "recommended_action": {
                "action": action,
                "priority": "high" if next_agent == "sales" else "medium",
                "details": "Action guided by strategy routing decisions."
            },
            "conversation_phase": phase,
            "confidence": 0.95
        }
        
    elif "recommend" in sys_lower:
        target_product = classification["likely_products"][0] if classification["likely_products"] else "SBI Smart Savings"
        reason = f"Identified as a top-matching product for your {classification['persona']} persona with {classification['intent']} intent."
        
        alternatives = []
        if len(classification["likely_products"]) > 1:
            for p in classification["likely_products"][1:]:
                alternatives.append({
                    "product": p,
                    "reason": "Secondary matching option based on goals",
                    "match_score": 75
                })
        else:
            alternatives.append({
                "product": "SBI Smart Savings",
                "reason": "Basic transaction liquidity backup",
                "match_score": 75
            })
            
        return {
            "product": target_product,
            "reason": reason,
            "match_score": 90,
            "alternatives": alternatives
        }
        
    elif "predict" in sys_lower:
        has_income = info["income"] != ""
        return {
            "conversion_probability": 0.85 if has_income else 0.50,
            "explanation": f"Lead {name_first} is actively engaged, showing high-intent queries.",
            "risk_factors": [] if has_income else ["Timeline delay risk", "Missing verification details"]
        }
        
    return {}




