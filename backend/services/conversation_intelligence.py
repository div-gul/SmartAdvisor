import re
from typing import Optional

from models import ConversationContext, UserInfo

PRODUCT_KEYWORDS = {
    "SBI Smart Savings": ["saving money", "save money", "savings", "saving", "saving account", "zero balance", "account", "upi"],
    "SBI Elite Card": ["credit card", "card", "elite", "rewards", "lounge"],
    "SBI Personal Loan": ["personal loan", "loan", "borrow", "emi", "urgent money"],
    "SBI Fixed Deposit": ["fixed deposit", "fd", "deposit", "guaranteed return"],
    "SBI Mutual Fund SIP": ["sip", "mutual fund", "invest", "investment", "wealth", "tax saving", "elss"],
    "SBI Education Loan": ["education loan", "study loan", "college", "university", "abroad study", "tuition"],
}

GOAL_KEYWORDS = {
    "education funding": ["education", "study", "college", "university", "tuition", "abroad"],
    "premium credit card rewards": ["credit card", "rewards", "lounge", "travel card"],
    "quick personal loan": ["personal loan", "loan", "emi", "borrow"],
    "safe fixed returns": ["fixed deposit", "fd", "safe return", "guaranteed"],
    "long-term investing": ["sip", "mutual fund", "invest", "wealth", "tax saving", "elss"],
    "zero-balance everyday banking": ["saving money", "save money", "savings", "saving", "zero balance", "upi", "account"],
}

TIMELINE_WORDS = ["today", "now", "immediately", "this week", "this month", "next month", "3 months", "six months", "year"]
RISK_WORDS = ["low risk", "moderate risk", "medium risk", "high risk", "safe", "aggressive"]


def _clean(value: str) -> str:
    return re.sub(r"\s+", " ", value.strip(" .,!?:;-"))


def _has_value(value: Optional[str]) -> bool:
    return bool(value and str(value).strip())


def _last_assistant_asked_for_income(context: Optional[ConversationContext]) -> bool:
    if not context:
        return False
    for message in reversed(context.messages):
        if message.get("role") != "assistant":
            continue
        content = (message.get("content") or "").lower()
        return any(term in content for term in ["annual income", "approximate income", "income", "salary", "earning"])
    return False


def merge_user_info(existing: Optional[UserInfo], incoming: Optional[UserInfo], message: str, context: Optional[ConversationContext] = None) -> tuple[UserInfo, bool]:
    """Merge explicit profile form fields with facts typed naturally in chat."""
    merged = existing.copy(deep=True) if existing else UserInfo()
    changed = False

    if incoming:
        for field in UserInfo.__fields__:
            new_value = getattr(incoming, field, "") or ""
            old_value = getattr(merged, field, "") or ""
            if _has_value(new_value) and new_value.strip() != old_value.strip():
                setattr(merged, field, new_value.strip())
                changed = True

    extracted = extract_user_info_from_message(message, context)
    for field, value in extracted.items():
        old_value = getattr(merged, field, "") or ""
        if value and value != old_value.strip():
            setattr(merged, field, value)
            changed = True

    return merged, changed


def extract_user_info_from_message(message: str, context: Optional[ConversationContext] = None) -> dict[str, str]:
    text = message or ""
    lower = text.lower()
    facts: dict[str, str] = {}

    email_match = re.search(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+", text)
    if email_match:
        facts["email"] = email_match.group(0)

    phone_match = re.search(r"(?:\+?91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}", text)
    if phone_match:
        facts["phone"] = _clean(phone_match.group(0))

    name_match = re.search(r"\b(?:my name is|i am|i'm|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})", text)
    if name_match and not any(word in name_match.group(1).lower() for word in ["student", "engineer", "developer", "owner", "retired"]):
        facts["name"] = _clean(name_match.group(1))

    age_match = re.search(r"\b(?:i am|i'm|age is|aged)\s*(\d{2})\b|\b(\d{2})\s*(?:years old|yrs old|yo)\b", lower)
    if age_match:
        facts["age"] = next(group for group in age_match.groups() if group)

    income_match = re.search(
        r"(?:income|salary|earn|earning|package|ctc)\s*(?:is|of|around|about|approx(?:imately)?|:)?\s*(rs\.?\s*)?([\d,.]+\s*(?:lakh|lakhs|lac|lacs|lpa|crore|k|thousand)?(?:\s*(?:p\.a\.|pa|per annum|monthly|per month))?)",
        lower,
    )
    if income_match:
        facts["income"] = _clean(income_match.group(2))
    else:
        short_income_match = re.fullmatch(
            r"(?:rs\.?\s*)?([\d,.]+)\s*(lakh|lakhs|lac|lacs|lpa|crore|k|thousand)(?:\s*(?:p\.a\.|pa|per annum|monthly|per month))?",
            lower.strip(),
        )
        if short_income_match:
            facts["income"] = _clean(f"{short_income_match.group(1)} {short_income_match.group(2)}")
        elif _last_assistant_asked_for_income(context):
            numeric_income_match = re.fullmatch(r"(?:rs\.?\s*)?([\d,.]+)\s*(?:p\.a\.|pa|per annum)?", lower.strip())
            if numeric_income_match:
                facts["income"] = _clean(f"{numeric_income_match.group(1)} lpa")

    occupation_patterns = [
        r"\b(?:i work as|working as|employed as|profession is|occupation is)\s+([^,.]+)",
        r"\b(?:i am|i'm)\s+(?:a|an)\s+([^,.]+?)(?:\s+with\s+|\s+and\s+|$)",
    ]
    for pattern in occupation_patterns:
        occupation_match = re.search(pattern, lower)
        if occupation_match:
            occupation = _clean(occupation_match.group(1))
            if len(occupation) <= 60 and not occupation.isdigit():
                facts["occupation"] = occupation
                break

    for goal, keywords in GOAL_KEYWORDS.items():
        if any(keyword in lower for keyword in keywords):
            facts["goals"] = goal
            break

    if any(word in lower for word in RISK_WORDS):
        if "high" in lower or "aggressive" in lower:
            facts["risk_tolerance"] = "high"
        elif "low" in lower or "safe" in lower:
            facts["risk_tolerance"] = "low"
        else:
            facts["risk_tolerance"] = "moderate"

    return facts


def infer_product_from_context(context: ConversationContext, latest_message: str = "") -> Optional[str]:
    haystack = " ".join(
        [latest_message or ""]
        + [m.get("content", "") for m in context.messages if m.get("role") == "user"]
    ).lower()

    savings_terms = ["saving money", "save money", "savings", "saving", "zero balance", "bank account"]
    investment_terms = ["sip", "mutual fund", "invest", "investment", "wealth", "tax saving", "elss"]
    loan_terms = ["personal loan", "education loan", "study loan", "borrow", "emi", "urgent money"]

    if any(term in haystack for term in savings_terms):
        return "SBI Smart Savings"
    if any(term in haystack for term in investment_terms):
        return "SBI Mutual Fund SIP"
    if any(term in haystack for term in loan_terms):
        if any(term in haystack for term in ["education loan", "study loan", "college", "university", "tuition"]):
            return "SBI Education Loan"
        return "SBI Personal Loan"

    for product, keywords in PRODUCT_KEYWORDS.items():
        if any(keyword in haystack for keyword in keywords):
            return product

    if context.persona and context.persona.likely_products:
        return context.persona.likely_products[0]

    return context.current_product


def has_timeline_signal(context: ConversationContext) -> bool:
    text = " ".join(m.get("content", "") for m in context.messages if m.get("role") == "user").lower()
    return any(word in text for word in TIMELINE_WORDS) or bool(re.search(r"\b\d+\s*(?:days?|weeks?|months?|years?)\b", text))


def has_buying_signal(context: ConversationContext) -> bool:
    user_messages = [m.get("content", "").lower() for m in context.messages if m.get("role") == "user"]
    if not user_messages:
        return False
    last_msg = user_messages[-1]
    return any(word in last_msg for word in ["apply now", "proceed", "go ahead", "sign me", "book appointment", "schedule call", "start application", "start my application", "submit application"])


def is_profile_complete_enough(context: ConversationContext) -> bool:
    info = context.user_info
    if not info:
        return False
    return bool(_has_value(info.income) and (_has_value(info.goals) or context.current_product) and (_has_value(info.age) or has_timeline_signal(context)))




