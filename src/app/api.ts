const API_BASE = "http://localhost:8080";

export interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
  occupation?: string;
  income?: string;
  goals?: string;
  age?: string;
  risk_tolerance?: string;
}

export interface ChatRequest {
  lead_id?: string;
  user_message: string;
  user_info?: UserInfo;
}

export interface NextBestAction {
  action: string;
  priority: string;
  details: string;
}

export interface PersonaProfile {
  persona: string;
  budget: string;
  intent: string;
  risk_tolerance: string;
  likely_products: string[];
  key_concerns: string[];
  communication_style: string;
}

export interface AgentDecisionInfo {
  next_agent: string;
  reason: string;
  recommended_action: NextBestAction;
  conversation_phase: string;
  confidence: number;
}

export interface ChatResponse {
  lead_id: string;
  response: string;
  agent_used: string;
  lead_score: number;
  lead_tier: string;
  next_best_action?: NextBestAction;
  persona?: PersonaProfile;
  agent_decision?: AgentDecisionInfo;
  conversion_probability: number;
}

export interface LeadScoreResponse {
  lead_id: string;
  score: number;
  tier: string;
  explanation: string;
  factors: Array<{ factor: string; weight: number; met: boolean }>;
}

export interface RecommendResponse {
  lead_id: string;
  product: string;
  reason: string;
  match_score: number;
  alternatives: Array<{ product: string; reason: string; match_score: number }>;
}

export interface PredictResponse {
  lead_id: string;
  conversion_probability: number;
  explanation: string;
  risk_factors: string[];
}

export interface LeadListItem {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  lead_score: number;
  lead_tier: string;
  status: string;
  recommended_product?: string;
  recommended_action?: NextBestAction;
  conversion_probability: number;
  updated_at: string;
}

export async function sendChatMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req)
  });
  if (!res.ok) throw new Error(`Chat failed: ${res.statusText}`);
  return res.json();
}

export async function getLeadScore(leadId: string): Promise<LeadScoreResponse> {
  const res = await fetch(`${API_BASE}/leadscore?lead_id=${leadId}`);
  if (!res.ok) throw new Error(`Lead score failed: ${res.statusText}`);
  return res.json();
}

export async function getRecommendation(leadId: string): Promise<RecommendResponse> {
  const res = await fetch(`${API_BASE}/recommend?lead_id=${leadId}`);
  if (!res.ok) throw new Error(`Recommend failed: ${res.statusText}`);
  return res.json();
}

export async function getPrediction(leadId: string): Promise<PredictResponse> {
  const res = await fetch(`${API_BASE}/predict?lead_id=${leadId}`);
  if (!res.ok) throw new Error(`Predict failed: ${res.statusText}`);
  return res.json();
}

export async function triggerFollowUp(leadId?: string): Promise<any> {
  const res = await fetch(`${API_BASE}/followup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lead_id: leadId })
  });
  if (!res.ok) throw new Error(`Follow-up failed: ${res.statusText}`);
  return res.json();
}

export async function getLeadsList(): Promise<LeadListItem[]> {
  const res = await fetch(`${API_BASE}/leads`);
  if (!res.ok) throw new Error(`Failed to fetch leads list`);
  const data = await res.json();
  return data.leads || [];
}

export interface AuthResponse {
  user_id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  age: string;
  occupation: string;
  income: string;
  goals: string;
  risk_tolerance: string;
  address: string;
  pan: string;
}

export async function apiRegister(name: string, email: string, password: string, role: string = "user"): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Registration failed");
  }
  return res.json();
}

export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Login failed");
  }
  return res.json();
}

export async function apiUpdateProfile(fields: {
  user_id: string;
  name?: string;
  phone?: string;
  age?: string;
  occupation?: string;
  income?: string;
  goals?: string;
  risk_tolerance?: string;
  address?: string;
  pan?: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Profile update failed");
  }
  return res.json();
}


