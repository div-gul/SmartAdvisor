import { useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  ClipboardList,
  LogIn,
  Moon,
  Search,
  Send,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { sendChatMessage, getPrediction, apiLogin, apiRegister, apiUpdateProfile } from "./api";
import type { ChatResponse, PersonaProfile, NextBestAction, AgentDecisionInfo, AuthResponse } from "./api";

type Screen = "landing" | "auth" | "products" | "onboarding" | "match" | "profile" | "admin";
type Role = "guest" | "user" | "admin";
type AuthMode = "login" | "register";
type ThemeMode = "light" | "dark";

type Profile = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  occupation: string;
  income: string;
  goals: string;
  risk: string;
  address: string;
  pan: string;
};

type Product = {
  name: string;
  category: string;
  tagline: string;
  benefits: string[];
  eligibility: string;
  badge?: string;
};

type ChatMessage = {
  role: "ai" | "user";
  text: string;
  time: string;
};

const DEFAULT_PROFILE: Profile = {
  fullName: "Priya Mehta",
  email: "priya.mehta@example.com",
  phone: "+91 98765 43210",
  age: "31",
  occupation: "Salaried professional",
  income: "Rs 12 lakh p.a.",
  goals: "Emergency fund, travel savings, and long-term investing",
  risk: "Moderate",
  address: "Bandra West, Mumbai",
  pan: "ABCDE1234F",
};

const EMPTY_PROFILE: Profile = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  occupation: "",
  income: "",
  goals: "",
  risk: "",
  address: "",
  pan: "",
};

const PRODUCTS: Product[] = [
  {
    name: "SBI Smart Savings",
    category: "Savings",
    tagline: "A flexible savings account for everyday banking.",
    benefits: ["Zero balance option", "Instant digital KYC", "UPI and debit card access"],
    eligibility: "Age 18+, Aadhaar and PAN required",
    badge: "Popular",
  },
  {
    name: "SBI Elite Card",
    category: "Credit Card",
    tagline: "Premium lifestyle rewards and travel privileges.",
    benefits: ["Travel rewards", "Lounge access", "Annual milestone benefits"],
    eligibility: "Income Rs 15 lakh p.a. or higher",
    badge: "Premium",
  },
  {
    name: "SBI Personal Loan",
    category: "Loan",
    tagline: "Quick credit for planned or urgent expenses.",
    benefits: ["No collateral", "Flexible tenure", "Fast approval journey"],
    eligibility: "Salaried or self-employed, age 21-58",
    badge: "Fast",
  },
  {
    name: "SBI Fixed Deposit",
    category: "Investment",
    tagline: "Predictable returns with bank-backed stability.",
    benefits: ["Flexible tenure", "Senior citizen benefits", "Loan against deposit"],
    eligibility: "Any KYC-verified customer",
  },
  {
    name: "SBI Mutual Fund SIP",
    category: "Investment",
    tagline: "Disciplined long-term investing from small amounts.",
    benefits: ["SIP from Rs 500", "ELSS options", "Goal-based portfolios"],
    eligibility: "PAN and completed KYC required",
  },
  {
    name: "SBI Education Loan",
    category: "Loan",
    tagline: "Funding support for higher education in India or abroad.",
    benefits: ["Moratorium support", "Tax benefits", "Collateral options"],
    eligibility: "Admission confirmation required",
  },
];

const palette = {
  light: {
    bg: "#F7FAFA",
    surface: "rgba(255,255,255,0.76)",
    raised: "#FFFFFF",
    muted: "#F2F4F4",
    border: "#BEC8CA",
    text: "#191C1D",
    subtext: "#3F484A",
    faint: "#6F797A",
    primary: "#005B65",
    primary2: "#28747E",
    primarySoft: "rgba(0,91,101,0.08)",
    shadow: "0 18px 45px rgba(0, 34, 38, 0.10)",
  },
  dark: {
    bg: "#101718",
    surface: "rgba(27,38,40,0.84)",
    raised: "#182224",
    muted: "#202D2F",
    border: "#3E5053",
    text: "#EEF7F8",
    subtext: "#C3D1D3",
    faint: "#91A4A7",
    primary: "#6FD6E3",
    primary2: "#3CA4B0",
    primarySoft: "rgba(111,214,227,0.12)",
    shadow: "0 18px 45px rgba(0, 0, 0, 0.24)",
  },
};

function useColors(theme: ThemeMode) {
  return palette[theme];
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function SBILogo({ color, size = 30 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <path d="M21 3L39 36H3L21 3Z" fill={color} opacity="0.96" />
      <path d="M21 3L21 36H3L21 3Z" fill="#62F4F2" opacity="0.55" />
      <path d="M21 3L39 36H21L21 3Z" fill="#0E7F8A" opacity="0.86" />
      <path d="M21 15L31 36H11L21 15Z" fill="#88FFFF" opacity="0.34" />
    </svg>
  );
}

function Header({
  screen,
  role,
  theme,
  onThemeToggle,
  onNavigate,
  onLogout,
}: {
  screen: Screen;
  role: Role;
  theme: ThemeMode;
  onThemeToggle: () => void;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}) {
  const c = useColors(theme);
  const navItems = [
    { label: "Home", screen: "landing" as Screen, roles: ["guest"] },
    { label: "Products", screen: "products" as Screen, roles: ["guest", "user"] },
    { label: "AI Advisor", screen: "onboarding" as Screen, roles: ["user"] },
    { label: "Profile", screen: "profile" as Screen, roles: ["user"] },
    { label: "Admin", screen: "admin" as Screen, roles: ["admin"] },
  ].filter((item) => item.roles.includes(role));

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: theme === "light" ? "rgba(247,250,250,0.9)" : "rgba(16,23,24,0.92)", borderColor: c.border, backdropFilter: "blur(14px)" }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4 md:px-6">
        <button onClick={() => onNavigate(role === "admin" ? "admin" : role === "user" ? "products" : "landing")} className="flex items-center gap-3">
          <SBILogo color={c.primary} />
          <span className="text-xl font-bold" style={{ color: c.primary, fontFamily: "Inter, sans-serif" }}>
            Smart Advisor
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className="rounded-full px-4 py-2 text-sm font-semibold transition"
              style={{ color: screen === item.screen ? c.primary : c.subtext, background: screen === item.screen ? c.primarySoft : "transparent" }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle color theme"
            onClick={onThemeToggle}
            className="grid h-10 w-10 place-items-center rounded-full border"
            style={{ color: c.primary, borderColor: c.border, background: c.surface }}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {role === "guest" ? (
            <button
              onClick={() => onNavigate("auth")}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white"
              style={{ background: "#005B65", fontFamily: "Geist, sans-serif" }}
            >
              <LogIn size={16} /> Login
            </button>
          ) : (
            <button
              onClick={onLogout}
              className="rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ color: c.primary, borderColor: c.border, background: c.surface }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function LandingPage({
  theme,
  role,
  onThemeToggle,
  onNavigate,
  onAuthSuccess,
}: {
  theme: ThemeMode;
  role: Role;
  onThemeToggle: () => void;
  onNavigate: (screen: Screen) => void;
  onAuthSuccess: (user: AuthResponse, stayOnLanding?: boolean) => void;
}) {
  const c = useColors(theme);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthMode>("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");

  const features = [
    { title: "AI Product Matching", body: "Find the right SBI products for your needs.", icon: <Search size={19} /> },
    { title: "Auto Form Filling", body: "Forms are filled automatically while you chat.", icon: <ClipboardList size={19} /> },
    { title: "Personalized Recommendations", body: "Recommendations based on your financial profile.", icon: <BadgeCheck size={19} /> },
    { title: "Secure & Trusted", body: "Bank-grade encrypted onboarding.", icon: <Shield size={19} /> },
  ];

  const openAuth = (mode: AuthMode) => {
    setModalMode(mode);
    setMessage(null);
    setModalOpen(true);
  };

  const submitLandingAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (modalMode === "login") {
        const user = await apiLogin(loginEmail, loginPassword);
        onAuthSuccess(user);
        setModalOpen(false);
        return;
      }

      const user = await apiRegister(registerName, loginEmail, loginPassword, "user");
      if (registerPhone.trim()) {
        await apiUpdateProfile({ user_id: user.user_id, phone: registerPhone.trim() });
      }
      onAuthSuccess({ ...user, phone: registerPhone.trim() || user.phone });
      setMessage("Account created. Opening products.");
      setModalOpen(false);
    } catch {
      if (modalMode === "login") {
        setMessage("Account not found. Let's create one for you.");
        setTimeout(() => {
          setModalMode("register");
          setRegisterName("");
        }, 850);
      } else {
        setMessage("Could not create the account. Check the details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="premium-landing">
      <div className="landing-grid" />
      <svg className="landing-graph" viewBox="0 0 900 420" fill="none" aria-hidden="true">
        <path
          d="M20 372 C130 350 160 290 242 288 C318 286 350 244 426 224 C512 202 548 148 624 130 C704 112 752 78 864 36"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="864" cy="36" r="9" fill="currentColor" />
      </svg>

      <div className="landing-shell">
        <nav className="landing-nav">
          <button className="landing-brand" onClick={() => onNavigate(role === "admin" ? "admin" : role === "user" ? "products" : "landing")}>
            <span className="landing-brand-mark">
              <SBILogo color={c.primary} size={24} />
            </span>
            <span>Smart Advisor</span>
          </button>
          <div className="landing-actions">
            <button className="landing-theme-toggle" aria-label="Toggle color theme" onClick={onThemeToggle}>
              <Sun size={18} />
              <Moon size={19} />
            </button>
            {role === "guest" ? (
              <button className="landing-login-button" onClick={() => openAuth("login")}>
                <User size={19} />
                <span>Login</span>
              </button>
            ) : (
              <button className="landing-login-button" onClick={() => onNavigate(role === "admin" ? "admin" : "profile")}>
                <User size={19} />
                {role === "admin" ? "Admin" : "Profile"}
              </button>
            )}
          </div>
        </nav>

        <section className="landing-hero">
          <div className="landing-copy">
            <h1 className="landing-title">Up your financial game.</h1>
            <p className="landing-subtitle">specifically designed for you.</p>
            <div className="landing-ctas">
              <button className="landing-cta primary" onClick={() => onNavigate(role === "user" ? "onboarding" : "products")}>
                Try Now
                <span aria-hidden="true">-&gt;</span>
              </button>
              <button className="landing-cta secondary" onClick={() => (role === "guest" ? openAuth("register") : onNavigate("profile"))}>
                Register
                <span aria-hidden="true">-&gt;</span>
              </button>
            </div>
          </div>

          <div className="hanging-cards" aria-label="Smart Advisor capabilities">
            {features.map((feature) => (
              <article className="glass-card" key={feature.title}>
                <span className="card-icon">{feature.icon}</span>
                <h2>{feature.title}</h2>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {modalOpen && (
        <div className="landing-modal-backdrop" role="dialog" aria-modal="true">
          <form className="landing-modal" onSubmit={submitLandingAuth}>
            <div className="landing-modal-header">
              <div>
                <h2>{modalMode === "login" ? "Login" : "Create account"}</h2>
                <p>{modalMode === "login" ? "Access your saved profile and AI advisor." : "Create a customer profile for faster onboarding."}</p>
              </div>
              <button type="button" className="landing-modal-close" onClick={() => setModalOpen(false)} aria-label="Close login modal">
                x
              </button>
            </div>

            {message && <div className="landing-auth-message">{message}</div>}

            {modalMode === "register" && (
              <>
                <label htmlFor="landing-name">Full Name</label>
                <input id="landing-name" value={registerName} onChange={(event) => setRegisterName(event.target.value)} required />
                <label htmlFor="landing-phone">Phone</label>
                <input id="landing-phone" value={registerPhone} onChange={(event) => setRegisterPhone(event.target.value)} required />
              </>
            )}

            <label htmlFor="landing-email">Email</label>
            <input id="landing-email" type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} required />

            <label htmlFor="landing-password">Password</label>
            <input id="landing-password" type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} required />

            <button className="landing-modal-submit" disabled={loading}>
              {loading ? "Please wait..." : modalMode === "login" ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

function AuthPage({
  theme,
  mode,
  onModeChange,
  onAuthSuccess,
}: {
  theme: ThemeMode;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onAuthSuccess: (user: AuthResponse) => void;
}) {
  const c = useColors(theme);
  const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        throw new Error("Email and password are required");
      }
      
      let res: AuthResponse;
      if (mode === "register") {
        if (!name.trim()) {
          throw new Error("Full name is required to register");
        }
        res = await apiRegister(name, email, password, selectedRole);
      } else {
        res = await apiLogin(email, password);
      }
      onAuthSuccess(res);
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please verify your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-12" style={{ background: c.bg }}>
      <section className="mx-auto max-w-[920px] rounded-2xl border p-5 md:p-8" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: c.text }}>
              {mode === "login" ? "Login" : "Register"}
            </h1>
            <p className="mt-2 text-sm" style={{ color: c.subtext }}>
              Enter your credentials to manage your banking profile and chat with the AI Advisor.
            </p>
          </div>
          <div className="flex rounded-full border p-1" style={{ borderColor: c.border, background: c.muted }}>
            {(["login", "register"] as AuthMode[]).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setError(null);
                  onModeChange(item);
                }}
                className="rounded-full px-4 py-2 text-sm font-bold capitalize"
                style={{ background: mode === item ? c.raised : "transparent", color: mode === item ? c.primary : c.subtext }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            {(["user", "admin"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className="flex w-full items-start gap-4 rounded-2xl border p-4 text-left"
                style={{ background: selectedRole === role ? c.primarySoft : c.raised, borderColor: selectedRole === role ? c.primary : c.border }}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ color: c.primary, background: c.primarySoft }}>
                  {role === "admin" ? <Shield size={20} /> : <User size={20} />}
                </span>
                <span>
                  <span className="block font-bold capitalize" style={{ color: c.text }}>
                    {role}
                  </span>
                  <span className="mt-1 block text-sm leading-6" style={{ color: c.subtext }}>
                    {role === "admin" ? "View platform controls without customer records." : "Browse products, manage profile, and use AI onboarding."}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <form
            className="rounded-2xl border p-5"
            style={{ background: c.raised, borderColor: c.border }}
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="mb-4 rounded-xl p-3 text-xs font-bold text-red-500 bg-red-50 border border-red-200">
                {error}
              </div>
            )}
            
            {mode === "register" && (
              <>
                <label className="mb-2 block text-sm font-semibold" style={{ color: c.text }}>
                  Full name
                </label>
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-4 w-full rounded-xl border px-4 py-3 outline-none" 
                  style={{ background: c.muted, borderColor: c.border, color: c.text }} 
                  placeholder="Your name" 
                  required
                />
              </>
            )}

            <label className="mb-2 block text-sm font-semibold" style={{ color: c.text }}>
              Email
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full rounded-xl border px-4 py-3 outline-none" 
              style={{ background: c.muted, borderColor: c.border, color: c.text }} 
              placeholder="name@example.com" 
              required
            />
            
            <label className="mb-2 block text-sm font-semibold" style={{ color: c.text }}>
              Password
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full rounded-xl border px-4 py-3 outline-none" 
              style={{ background: c.muted, borderColor: c.border, color: c.text }} 
              placeholder="Enter your password" 
              required
            />
            
            <button 
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.01]" 
              style={{ background: loading ? "#BEC8CA" : "#005B65" }}
            >
              {loading ? "Authenticating..." : `Continue as ${selectedRole}`}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function ProductCard({
  product,
  theme,
  onMatch,
}: {
  product: Product;
  theme: ThemeMode;
  onMatch: (product: Product) => void;
}) {
  const c = useColors(theme);
  return (
    <article className="flex flex-col rounded-2xl border p-5" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide" style={{ background: c.primarySoft, color: c.primary }}>
          {product.category}
        </span>
        {product.badge && (
          <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "#005B65", color: "#fff" }}>
            {product.badge}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold" style={{ color: c.text }}>
        {product.name}
      </h3>
      <p className="mt-2 text-sm leading-6" style={{ color: c.subtext }}>
        {product.tagline}
      </p>
      <ul className="my-5 flex-1 space-y-2">
        {product.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2 text-sm" style={{ color: c.subtext }}>
            <BadgeCheck size={16} style={{ color: c.primary, flexShrink: 0, marginTop: 2 }} />
            {benefit}
          </li>
        ))}
      </ul>
      <div className="mb-4 rounded-xl p-3 text-xs font-semibold" style={{ background: c.primarySoft, color: c.primary }}>
        Eligibility: {product.eligibility}
      </div>
      <button onClick={() => onMatch(product)} className="rounded-full px-4 py-2.5 text-sm font-bold text-white" style={{ background: "#005B65" }}>
        Check My Match
      </button>
    </article>
  );
}

function TryAdvisor({
  product,
  theme,
  onFillForm,
}: {
  product: Product;
  theme: ThemeMode;
  onFillForm: () => void;
}) {
  const c = useColors(theme);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", text: `I can estimate your fit for ${product.name}. What is your main goal right now?`, time: now() },
  ]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ goal: "", income: "", timeline: "" });
  const [formStarted, setFormStarted] = useState(false);
  const suggestions = [
    ["Save monthly", "Borrow for a need", "Invest safely"],
    ["Below Rs 5 lakh", "Rs 5-15 lakh", "Above Rs 15 lakh"],
    ["Immediately", "In 1-3 months", "Later this year"],
    ["Yes, fill the form", "Not now"],
  ];
  const prompts = [
    "What is your approximate annual income range?",
    "When would you like to start?",
    "Based on your answers, this looks like a reasonable match. Would you like me to fill a basic application beside this chat?",
  ];

  const reply = (text: string) => {
    setMessages((m) => [...m, { role: "user", text, time: now() }]);
    const nextAnswers = { ...answers };
    if (step === 0) nextAnswers.goal = text;
    if (step === 1) nextAnswers.income = text;
    if (step === 2) nextAnswers.timeline = text;
    setAnswers(nextAnswers);

    if (step === 3) {
      if (text.toLowerCase().startsWith("yes")) {
        setFormStarted(true);
        onFillForm();
        setMessages((m) => [...m, { role: "ai", text: "I have started a basic form using your answers. You can continue as a guest or login later to save it.", time: now() }]);
      } else {
        setMessages((m) => [...m, { role: "ai", text: "No problem. You can keep browsing products in try mode without logging in.", time: now() }]);
      }
      return;
    }

    setStep((s) => s + 1);
    setTimeout(() => setMessages((m) => [...m, { role: "ai", text: prompts[step], time: now() }]), 250);
  };

  return (
    <div className="rounded-2xl border p-4" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: c.primarySoft, color: c.primary }}>
          <Search size={18} />
        </span>
        <div>
          <h2 className="font-bold" style={{ color: c.text }}>
            Try Mode Advisor
          </h2>
          <p className="text-xs" style={{ color: c.faint }}>
            Customer view only, no login required
          </p>
        </div>
      </div>

      <div className="mb-4 max-h-[260px] space-y-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div key={`${message.text}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6" style={{ background: message.role === "user" ? "#005B65" : c.raised, color: message.role === "user" ? "#fff" : c.text, border: message.role === "ai" ? `1px solid ${c.border}` : "none" }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {!formStarted && (
        <div className="flex flex-wrap gap-2">
          {suggestions[Math.min(step, suggestions.length - 1)].map((item) => (
            <button key={item} onClick={() => reply(item)} className="rounded-full border px-3 py-1.5 text-sm font-semibold" style={{ background: c.raised, color: c.text, borderColor: c.border }}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GuestApplication({ theme, product, started }: { theme: ThemeMode; product?: Product; started: boolean }) {
  const c = useColors(theme);
  const fields = [
    ["Selected product", product?.name || "Awaiting selection"],
    ["Goal", started ? "Captured from try mode" : "Awaiting advisor"],
    ["Income range", started ? "Captured from try mode" : "Awaiting advisor"],
    ["Timeline", started ? "Captured from try mode" : "Awaiting advisor"],
    ["Contact details", "Not requested in try mode"],
  ];

  return (
    <div className="rounded-2xl border p-5" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
      <h2 className="mb-1 text-xl font-bold" style={{ color: c.text }}>
        Guest Application Draft
      </h2>
      <p className="mb-5 text-sm" style={{ color: c.subtext }}>
        The form fills beside the advisor without requiring login.
      </p>
      <div className="space-y-3">
        {fields.map(([label, value]) => (
          <div key={label}>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: c.faint }}>
              {label}
            </div>
            <div className="rounded-xl border px-4 py-3 text-sm" style={{ color: started || label === "Selected product" ? c.text : c.faint, background: c.muted, borderColor: c.border }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsPage({
  theme,
  role,
  selectedProduct,
  onSelectProduct,
  onNavigate,
}: {
  theme: ThemeMode;
  role: Role;
  selectedProduct?: Product;
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: Screen) => void;
}) {
  const c = useColors(theme);
  const [guestFormStarted, setGuestFormStarted] = useState(false);

  return (
    <main className="min-h-screen px-4 py-10 md:px-6" style={{ background: c.bg }}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: c.text }}>
              Explore SBI Products
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: c.subtext }}>
              Visitors stay in try mode. Logged-in users get a match score directly when they click Check My Match.
            </p>
          </div>
          {role === "guest" && (
            <button onClick={() => onNavigate("auth")} className="rounded-full border px-5 py-2.5 text-sm font-bold" style={{ color: c.primary, borderColor: c.border, background: c.surface }}>
              Login to save profile
            </button>
          )}
        </div>

        <div className={role === "guest" && selectedProduct ? "grid gap-6 lg:grid-cols-[1fr_0.85fr]" : ""}>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                theme={theme}
                onMatch={(item) => {
                  onSelectProduct(item);
                  if (role === "user") onNavigate("match");
                }}
              />
            ))}
          </div>

          {role === "guest" && selectedProduct && (
            <aside className="mt-6 grid gap-5 lg:sticky lg:top-24 lg:mt-0 lg:self-start">
              <TryAdvisor product={selectedProduct} theme={theme} onFillForm={() => setGuestFormStarted(true)} />
              <GuestApplication product={selectedProduct} theme={theme} started={guestFormStarted} />
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}

function MatchPage({
  theme,
  product,
  profile,
  onNavigate,
}: {
  theme: ThemeMode;
  product?: Product;
  profile: Profile;
  onNavigate: (screen: Screen) => void;
}) {
  const c = useColors(theme);
  const score = useMemo(() => {
    const seed = (product?.name || "SBI Smart Savings").length + profile.fullName.length + profile.income.length;
    return 72 + (seed % 18);
  }, [product, profile]);

  return (
    <main className="min-h-screen px-4 py-12" style={{ background: c.bg }}>
      <section className="mx-auto max-w-[860px] rounded-2xl border p-6 md:p-8" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
        <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: c.primary }}>
          Dummy match result
        </p>
        <h1 className="text-3xl font-bold" style={{ color: c.text }}>
          {product?.name || "Selected SBI product"} fits your profile at {score}%.
        </h1>
        <p className="mt-3 text-sm leading-6" style={{ color: c.subtext }}>
          This is a frontend-only score for now. It uses your saved profile context so you do not need to re-enter personal details before getting a match.
        </p>

        <div className="my-8 h-4 overflow-hidden rounded-full" style={{ background: c.muted }}>
          <div className="h-full rounded-full" style={{ width: `${score}%`, background: "#005B65" }} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Profile used", profile.fullName || "Saved user"],
            ["Goal signal", profile.goals || "General banking"],
            ["Risk fit", profile.risk || "Moderate"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border p-4" style={{ background: c.raised, borderColor: c.border }}>
              <div className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: c.faint }}>
                {label}
              </div>
              <div className="text-sm font-semibold" style={{ color: c.text }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => onNavigate("onboarding")} className="rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "#005B65" }}>
            Discuss With AI
          </button>
          <button onClick={() => onNavigate("products")} className="rounded-full border px-5 py-3 text-sm font-bold" style={{ color: c.primary, borderColor: c.border, background: c.raised }}>
            Compare More Products
          </button>
        </div>
      </section>
    </main>
  );
}

function ProfilePage({
  theme,
  profile,
  userId,
  onProfileChange,
}: {
  theme: ThemeMode;
  profile: Profile;
  userId: string | null;
  onProfileChange: (profile: Profile) => void;
}) {
  const c = useColors(theme);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fields = Object.keys(profile) as (keyof Profile)[];

  const handleSaveProfile = async () => {
    if (!userId) {
      alert("Please login first to save your profile details to the database.");
      return;
    }
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await apiUpdateProfile({
        user_id: userId,
        name: profile.fullName,
        phone: profile.phone,
        age: profile.age,
        occupation: profile.occupation,
        income: profile.income,
        goals: profile.goals,
        risk_tolerance: profile.risk,
        address: profile.address,
        pan: profile.pan
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error("Save profile error:", err);
      alert(err.message || "Failed to save profile details");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 md:px-6" style={{ background: c.bg }}>
      <section className="mx-auto max-w-[960px] rounded-2xl border p-5 md:p-8" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: c.text }}>
              Customer Profile
            </h1>
            <p className="mt-2 text-sm leading-6" style={{ color: c.subtext }}>
              Your profile details are stored securely in the SQLite database and used by the multi-agent AI system.
            </p>
          </div>
          {userId && (
            <button 
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="rounded-full px-6 py-2.5 text-sm font-bold text-white transition hover:scale-105"
              style={{ background: saveSuccess ? "#10B981" : "#005B65" }}
            >
              {isSaving ? "Saving..." : saveSuccess ? "Saved Successfully!" : "Save Profile Details"}
            </button>
          )}
        </div>
        
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field} className="block">
              <span className="mb-2 block text-sm font-bold capitalize" style={{ color: c.text }}>
                {field.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                value={profile[field]}
                onChange={(event) => onProfileChange({ ...profile, [field]: event.target.value })}
                className="w-full rounded-xl border px-4 py-3 outline-none"
                style={{ color: c.text, background: c.muted, borderColor: c.border }}
              />
            </label>
          ))}
        </div>
      </section>
    </main>
  );
}

function OnboardingPage({
  theme,
  profile,
  selectedProduct,
  onNavigate,
}: {
  theme: ThemeMode;
  profile: Profile;
  selectedProduct?: Product;
  onNavigate: (screen: Screen) => void;
}) {
  const c = useColors(theme);
  const [messages, setMessages] = useState<any[]>([
    {
      role: "ai",
      text: "Initializing Smart Advisor AI Agent network...",
      time: now(),
      agent_name: "strategy",
    }
  ]);
  const [input, setInput] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leadScore, setLeadScore] = useState(20);
  const [leadTier, setLeadTier] = useState("Cold");
  const [persona, setPersona] = useState<PersonaProfile | null>(null);
  const [nba, setNba] = useState<NextBestAction | null>(null);
  const [decision, setDecision] = useState<AgentDecisionInfo | null>(null);
  const [conversionProbability, setConversionProbability] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize Conversation with User Profile (runs research agent)
  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const userInfo = {
          name: profile.fullName || "Priya Mehta",
          email: profile.email || "priya.mehta@example.com",
          phone: profile.phone || "+91 98765 43210",
          occupation: profile.occupation || "Salaried professional",
          income: profile.income || "Rs 12 lakh p.a.",
          goals: profile.goals || "",
          age: profile.age || "31",
          risk_tolerance: profile.risk || "Moderate"
        };
        
        const welcomeMsg = "";

        const res = await sendChatMessage({
          user_message: welcomeMsg,
          user_info: userInfo
        });

        setLeadId(res.lead_id);
        setLeadScore(res.lead_score);
        setLeadTier(res.lead_tier);
        setNba(res.next_best_action || null);
        setPersona(res.persona || null);
        setDecision(res.agent_decision || null);
        try {
         const pred = await getPrediction(res.lead_id);
         setConversionProbability(pred.conversion_probability);
        } catch (err) {
         console.error("Prediction fetch failed", err);
        }
        
       setMessages([
  {
    role: "ai",
    text: "Welcome! I'm ready to assist you with your banking needs. What financial goal would you like help with today?",
    time: now(),
    agent_name: "research"
  }
]);
      } catch (err) {
        console.error("Initialization error:", err);
        setMessages([
          { 
            role: "ai", 
            text: "Welcome! I'm ready to assist you. To get started, what product or banking goals can I help you with?", 
            time: now(), 
            agent_name: "qualification" 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [profile, selectedProduct]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text, time: now() }]);
    setIsLoading(true);

    try {
      const res = await sendChatMessage({
        lead_id: leadId || undefined,
        user_message: text,
        user_info: {
          name: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          occupation: profile.occupation,
          income: profile.income,
          goals: profile.goals,
          age: profile.age,
          risk_tolerance: profile.risk
        }
      });

      setLeadScore(res.lead_score);
      setLeadTier(res.lead_tier);
      setNba(res.next_best_action || null);
      setPersona(res.persona || null);
      setDecision(res.agent_decision || null);

      setMessages((m) => [
        ...m,
        { role: "ai", text: res.response, time: now(), agent_name: res.agent_used }
      ]);
    } catch (err) {
      console.error("API Error sending message:", err);
      // Fallback response
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { 
            role: "ai", 
            text: "I understand. Let's look at the options. Could you tell me more about your preference?", 
            time: now(), 
            agent_name: "sales" 
          }
        ]);
        setIsLoading(false);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  const getAgentBadgeColor = (agent: string) => {
    switch (agent) {
      case "research": return { bg: "#E0F2FE", text: "#0369A1", label: "Research Agent" };
      case "qualification": return { bg: "#FEF3C7", text: "#D97706", label: "Qualification Agent" };
      case "strategy": return { bg: "#F3E8FF", text: "#7E22CE", label: "Strategy Supervisor" };
      case "sales": return { bg: "#DCFCE7", text: "#15803D", label: "Sales Agent" };
      case "followup": return { bg: "#FEE2E2", text: "#B91C1C", label: "Follow-Up Agent" };
      default: return { bg: "#F3F4F6", text: "#374151", label: "Agent" };
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Hot": return "#10B981";
      case "Warm": return "#F59E0B";
      case "Cold": return "#3B82F6";
      default: return "#9CA3AF";
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 md:px-6" style={{ background: c.bg }}>
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: c.primary }}>
              Active AI Orchestration
            </p>
            <h1 className="mt-2 text-3xl font-bold" style={{ color: c.text }}>
              Multi-Agent Advisory Center
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-wide flex items-center gap-2" style={{ borderColor: c.border, background: c.surface }}>
              <span className="h-2 w-2 rounded-full animate-ping" style={{ background: getTierColor(leadTier) }} />
              Lead Status: <span style={{ color: getTierColor(leadTier) }}>{leadTier}</span>
            </div>
            <div className="rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-wide flex items-center gap-2" style={{ borderColor: c.border, background: c.surface, color: c.primary }}>
              Score: {leadScore}/100
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Chat Panel */}
          <section className="flex min-h-[580px] max-h-[640px] flex-col rounded-2xl border" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
            <div className="border-b p-4 flex items-center justify-between" style={{ borderColor: c.border }}>
              <div>
                <h2 className="font-bold" style={{ color: c.text }}>
                  SBI Customer Assistant
                </h2>
                <p className="text-xs" style={{ color: c.faint }}>
                  Orchestrated by Strategy Supervisor Agent
                </p>
              </div>
              {decision && (
                <div className="text-xs rounded-full px-3 py-1 flex items-center gap-1.5 font-semibold" style={{ background: c.primarySoft, color: c.primary }}>
                  Active Agent: <span className="font-bold capitalize">{decision.next_agent}</span>
                </div>
              )}
            </div>
            
            {/* Message Area */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => {
                const badge = message.agent_name ? getAgentBadgeColor(message.agent_name) : null;
                const isUser = message.role === "user";
                return (
                  <div key={index} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                    {!isUser && badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 tracking-wider uppercase" style={{ background: badge.bg, color: badge.text }}>
                        {badge.label}
                      </span>
                    )}
                    <div 
                      className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6" 
                      style={{ 
                        background: isUser ? "#005B65" : c.raised, 
                        color: isUser ? "#fff" : c.text, 
                        border: isUser ? "none" : `1px solid ${c.border}`,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 tracking-wider uppercase animate-pulse" style={{ background: c.primarySoft, color: c.primary }}>
                    Thinking...
                  </span>
                  <div className="rounded-2xl px-5 py-3.5 border flex gap-1.5 items-center" style={{ background: c.raised, borderColor: c.border }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t p-4" style={{ borderColor: c.border }}>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && input.trim() && !isLoading) sendMessage(input.trim());
                  }}
                  disabled={isLoading}
                  className="min-w-0 flex-1 rounded-full border px-5 py-3 text-sm outline-none transition"
                  placeholder="Tell me your budget, timeline, or ask banking questions..."
                  style={{ background: c.muted, borderColor: c.border, color: c.text }}
                />
                <button 
                  onClick={() => input.trim() && !isLoading && sendMessage(input.trim())}
                  disabled={isLoading}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white transition hover:scale-105" 
                  style={{ background: "#005B65" }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Intelligence Dashboard Panel */}
          <section className="space-y-4">
            {/* 1. Lead Score Card */}
            <div className="rounded-2xl border p-5" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: c.primary }}>
                Lead Scoring (ML telemetry)
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-extrabold" style={{ color: c.text }}>{leadScore}%</span>
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-full" style={{ background: getTierColor(leadTier) + "22", color: getTierColor(leadTier) }}>
                  {leadTier} Lead
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full overflow-hidden mb-3" style={{ background: c.muted }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${leadScore}%`, background: getTierColor(leadTier) }} />
              </div>
              <p className="text-xs leading-5" style={{ color: c.subtext }}>
                Based on active conversation factors, profile parameters, and interest specificity. Hot tier (&gt;70%) triggers automated CRM handoff.
              </p>
              {conversionProbability !== null && (
  <div className="mt-3 rounded-xl p-3" style={{ background: c.muted }}>
    <div className="text-xs font-semibold" style={{ color: c.faint }}>
      Conversion Probability
    </div>
    <div className="text-lg font-bold" style={{ color: c.primary }}>
      {(conversionProbability * 100).toFixed(0)}%
    </div>
  </div>
)}
            </div>

            {/* 2. Persona Profile Card */}
            {persona && (
              <div className="rounded-2xl border p-5 animate-fade-in" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: c.primary }}>
                    Customer Persona Profile
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase" style={{ background: c.primarySoft, color: c.primary }}>
                    Deduced by ResearchAgent
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-xl font-bold" style={{ color: c.text }}>{persona.persona}</div>
                  <div className="text-xs font-semibold capitalize" style={{ color: c.faint }}>Style: {persona.communication_style} | Budget: {persona.budget}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl p-3" style={{ background: c.muted }}>
                    <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Target Need</div>
                    <div className="text-xs font-bold capitalize" style={{ color: c.text }}>{persona.intent.replace('_', ' ')}</div>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: c.muted }}>
                    <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Risk Profile</div>
                    <div className="text-xs font-bold capitalize" style={{ color: c.text }}>{persona.risk_tolerance} Risk</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-bold" style={{ color: c.subtext }}>Likely Suitable Products:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {persona.likely_products.map((p, idx) => (
                      <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: c.primarySoft, color: c.primary }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Strategy Supervisor Node */}
            {decision && (
              <div className="rounded-2xl border p-5" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: c.primary }}>
                  Supervisor Routing Trace
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400">Decided Node:</span>
                    <span className="font-extrabold capitalize text-indigo-500">{decision.next_agent} agent</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400">Confidence Score:</span>
                    <span className="font-extrabold" style={{ color: c.text }}>{Math.round(decision.confidence * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400">Funnel Phase:</span>
                    <span className="font-bold uppercase" style={{ color: c.primary }}>{decision.conversation_phase}</span>
                  </div>
                  <div className="rounded-xl p-3 text-xs leading-5 border border-dashed" style={{ background: c.muted, borderColor: c.border, color: c.subtext }}>
                    <strong className="block mb-1 text-slate-500">Supervisor Rationale:</strong>
                    "{decision.reason}"
                  </div>
                </div>
              </div>
            )}

            {/* 4. Next Best Action Card */}
            {nba && (
              <div className="rounded-2xl border p-5 text-white" style={{ background: "linear-gradient(135deg, #005B65, #007C8A)", borderColor: "transparent", boxShadow: c.shadow }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-teal-100">
                    Next Best Action Recommendation
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-teal-950">
                    {nba.priority} Priority
                  </span>
                </div>
                <div className="text-lg font-bold mb-1">{nba.action}</div>
                <p className="text-xs text-teal-100 mb-4">{nba.details || "Recommended follow up step to accelerate conversion."}</p>
                <button 
                  onClick={() => {
                    if (nba.action === "Schedule Demo") {
                      alert("Demo session booking trigger fired!");
                    } else if (nba.action === "Send Discount") {
                      alert("Promo application voucher processed!");
                    } else {
                      alert("Filing transaction request initiated!");
                    }
                  }}
                  className="w-full rounded-full py-2.5 text-xs font-extrabold text-teal-950 bg-white hover:bg-teal-50 transition tracking-wide uppercase"
                >
                  Execute: {nba.action}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function AdminPage({ theme }: { theme: ThemeMode }) {
  const c = useColors(theme);
  const metrics = [
    ["Product catalogue", "24 active products"],
    ["AI prompts", "6 draft journeys"],
    ["Eligibility rules", "12 dummy rules"],
    ["System status", "Frontend demo only"],
  ];

  return (
    <main className="min-h-screen px-4 py-10 md:px-6" style={{ background: c.bg }}>
      <section className="mx-auto max-w-[1040px]">
        <div className="mb-6 rounded-2xl border p-6" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: c.primary }}>
            Admin console
          </p>
          <h1 className="text-3xl font-bold" style={{ color: c.text }}>
            Platform controls without customer data
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: c.subtext }}>
            This admin view intentionally shows only anonymous product and system configuration data. Customer profiles, forms, and conversations are not visible here.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {metrics.map(([label, value]) => (
            <div key={label} className="rounded-2xl border p-5" style={{ background: c.surface, borderColor: c.border }}>
              <div className="text-sm font-bold" style={{ color: c.faint }}>
                {label}
              </div>
              <div className="mt-2 text-2xl font-bold" style={{ color: c.text }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [role, setRole] = useState<Role>("guest");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = window.localStorage.getItem("smart-advisor-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(PRODUCTS[0]);

  const navigate = (nextScreen: Screen) => {
    if (role === "user" && nextScreen === "landing") {
      setScreen("products");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (role === "admin" && nextScreen === "landing") {
      setScreen("admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (role === "guest" && ["profile", "admin", "onboarding", "match"].includes(nextScreen)) {
      setScreen("auth");
      return;
    }
    if (role === "user" && nextScreen === "admin") {
      setScreen("landing");
      return;
    }
    if (role === "admin" && ["products", "profile", "onboarding", "match"].includes(nextScreen)) {
      setScreen("admin");
      return;
    }
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("smart-advisor-theme", theme);
  }, [theme]);

  const c = useColors(theme);

  const handleAuthSuccess = (user: AuthResponse, stayOnLanding = false) => {
    setRole(user.role as Role);
    setUserId(user.user_id);
    setProfile({
      fullName: user.name,
      email: user.email,
      phone: user.phone || "",
      age: user.age || "",
      occupation: user.occupation || "",
      income: user.income || "",
      goals: user.goals || "",
      risk: user.risk_tolerance || "",
      address: user.address || "",
      pan: user.pan || ""
    });
    if (!stayOnLanding) {
      setScreen(user.role === "admin" ? "admin" : "products");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: c.bg, color: c.text, fontFamily: "Inter, sans-serif" }}>
      {screen !== "landing" && screen !== "auth" && (
        <Header
          screen={screen}
          role={role}
          theme={theme}
          onThemeToggle={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
          onNavigate={navigate}
          onLogout={() => {
            setRole("guest");
            setUserId(null);
            setProfile(EMPTY_PROFILE);
            setScreen("landing");
          }}
        />
      )}

      {screen === "landing" && (
        <LandingPage
          theme={theme}
          role={role}
          onThemeToggle={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
          onNavigate={navigate}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      {screen === "auth" && (
        <div className="auth-landing-shell">
          <div className="auth-landing-backdrop" aria-hidden="true">
            <LandingPage
              theme={theme}
              role="guest"
              onThemeToggle={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
              onNavigate={navigate}
              onAuthSuccess={handleAuthSuccess}
            />
          </div>
          <div className="auth-landing-panel">
            <AuthPage
              theme={theme}
              mode={authMode}
              onModeChange={setAuthMode}
              onAuthSuccess={(user) => handleAuthSuccess(user)}
            />
          </div>
        </div>
      )}
      {screen === "products" && <ProductsPage theme={theme} role={role} selectedProduct={selectedProduct} onSelectProduct={setSelectedProduct} onNavigate={navigate} />}
      {screen === "match" && <MatchPage theme={theme} product={selectedProduct} profile={profile} onNavigate={navigate} />}
      {screen === "profile" && <ProfilePage theme={theme} profile={profile} userId={userId} onProfileChange={setProfile} />}
      {screen === "onboarding" && <OnboardingPage theme={theme} profile={profile} selectedProduct={selectedProduct} onNavigate={navigate} />}
      {screen === "admin" && <AdminPage theme={theme} />}
    </div>
  );
}
