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
    <svg width={size} height={Math.round(size * 0.78)} viewBox="0 0 28 22" fill="none" aria-hidden="true">
      <path d="M14 0L27.5 22H0.5L14 0Z" fill={color} opacity="0.9" />
      <path d="M14 5L24 22H4L14 5Z" fill={color} />
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
    { label: "Home", screen: "landing" as Screen, roles: ["guest", "user", "admin"] },
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
        <button onClick={() => onNavigate("landing")} className="flex items-center gap-3">
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
  onNavigate,
}: {
  theme: ThemeMode;
  role: Role;
  onNavigate: (screen: Screen) => void;
}) {
  const c = useColors(theme);
  const features = [
    ["AI product matching", "Compare banking products against your needs instead of popularity."],
    ["Side-by-side form filling", "The advisor can build the form as the conversation progresses."],
    ["Profile-aware guidance", "Logged-in users can reuse saved details during onboarding."],
    ["Role-separated views", "Customers see customer journeys; admins see platform controls only."],
  ];

  return (
    <main className="min-h-screen" style={{ background: c.bg }}>
      <section className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-24">
        <div>
          <div className="mb-6 inline-flex rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ borderColor: c.border, color: c.primary, background: c.primarySoft }}>
            SBI customer onboarding
          </div>
          <h1 className="mb-5 text-4xl font-semibold leading-tight md:text-6xl" style={{ color: c.text, fontFamily: "Inter, sans-serif" }}>
            Find the right SBI product without repeating yourself.
          </h1>
          <p className="mb-8 max-w-xl text-base leading-7 md:text-lg" style={{ color: c.subtext }}>
            Smart Advisor now separates visitor, user, and admin journeys. Try mode stays customer-facing, while logged-in users can save profile details for guided form filling.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => onNavigate(role === "user" ? "onboarding" : "products")}
              className="rounded-full px-7 py-3 text-sm font-bold text-white"
              style={{ background: "#005B65", fontFamily: "Geist, sans-serif" }}
            >
              {role === "user" ? "Start AI Advisor" : "Try Product Match"}
            </button>
            <button
              onClick={() => onNavigate(role === "guest" ? "auth" : role === "admin" ? "admin" : "profile")}
              className="rounded-full border px-7 py-3 text-sm font-bold"
              style={{ borderColor: c.border, color: c.primary, background: c.surface }}
            >
              {role === "guest" ? "Login or Register" : role === "admin" ? "Open Admin Console" : "View Profile"}
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {features.map(([title, body]) => (
            <div key={title} className="rounded-2xl border p-5" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
              <div className="mb-2 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: c.primarySoft, color: c.primary }}>
                  <BadgeCheck size={18} />
                </span>
                <h2 className="text-lg font-bold" style={{ color: c.text }}>
                  {title}
                </h2>
              </div>
              <p className="text-sm leading-6" style={{ color: c.subtext }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function AuthPage({
  theme,
  mode,
  onModeChange,
  onSubmit,
}: {
  theme: ThemeMode;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onSubmit: (role: "user" | "admin") => void;
}) {
  const c = useColors(theme);
  const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user");

  return (
    <main className="min-h-screen px-4 py-12" style={{ background: c.bg }}>
      <section className="mx-auto max-w-[920px] rounded-2xl border p-5 md:p-8" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: c.text }}>
              {mode === "login" ? "Login" : "Register"}
            </h1>
            <p className="mt-2 text-sm" style={{ color: c.subtext }}>
              Choose whether you are entering as a customer or as an admin. This is dummy frontend auth only.
            </p>
          </div>
          <div className="flex rounded-full border p-1" style={{ borderColor: c.border, background: c.muted }}>
            {(["login", "register"] as AuthMode[]).map((item) => (
              <button
                key={item}
                onClick={() => onModeChange(item)}
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
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(selectedRole);
            }}
          >
            <label className="mb-2 block text-sm font-semibold" style={{ color: c.text }}>
              Email
            </label>
            <input className="mb-4 w-full rounded-xl border px-4 py-3 outline-none" style={{ background: c.muted, borderColor: c.border, color: c.text }} placeholder="name@example.com" />
            <label className="mb-2 block text-sm font-semibold" style={{ color: c.text }}>
              Password
            </label>
            <input className="mb-4 w-full rounded-xl border px-4 py-3 outline-none" style={{ background: c.muted, borderColor: c.border, color: c.text }} placeholder="Enter any dummy password" type="password" />
            {mode === "register" && (
              <>
                <label className="mb-2 block text-sm font-semibold" style={{ color: c.text }}>
                  Full name
                </label>
                <input className="mb-4 w-full rounded-xl border px-4 py-3 outline-none" style={{ background: c.muted, borderColor: c.border, color: c.text }} placeholder="Your name" />
              </>
            )}
            <button className="mt-2 w-full rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "#005B65" }}>
              Continue as {selectedRole}
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
  if (product?.name === "SBI Smart Savings") return 85;
  if (product?.name === "SBI Mutual Fund SIP") return 92;
  if (product?.name === "SBI Elite Card") return 95;
  return 75;
}, [product]);

  return (
    <main className="min-h-screen px-4 py-12" style={{ background: c.bg }}>
      <section className="mx-auto max-w-[860px] rounded-2xl border p-6 md:p-8" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
        <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: c.primary }}>
         AI Match Result
        </p>
        <h1 className="text-3xl font-bold" style={{ color: c.text }}>
          {product?.name || "Selected SBI product"} fits your profile at {score}%.
        </h1>
        <p className="mt-3 text-sm leading-6" style={{ color: c.subtext }}>
          This score is generated using our AI-powered lead qualification model, which analyzes customer profile attributes and estimates conversion probability.
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
  onProfileChange,
}: {
  theme: ThemeMode;
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
}) {
  const c = useColors(theme);
  const fields = Object.keys(profile) as (keyof Profile)[];

  return (
    <main className="min-h-screen px-4 py-10 md:px-6" style={{ background: c.bg }}>
      <section className="mx-auto max-w-[960px] rounded-2xl border p-5 md:p-8" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
        <h1 className="text-3xl font-bold" style={{ color: c.text }}>
          Customer Profile
        </h1>
        <p className="mt-2 text-sm leading-6" style={{ color: c.subtext }}>
          Dummy profile details are saved in frontend state and used by the onboarding AI to prefill application fields.
        </p>
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
  const leadScore =
  selectedProduct?.name === "SBI Smart Savings"
    ? 85
    : selectedProduct?.name === "SBI Mutual Fund SIP"
    ? 92
    : selectedProduct?.name === "SBI Elite Card"
    ? 95
    : 75;
const category =
  leadScore >= 80
    ? "HOT"
    : leadScore >= 50
    ? "WARM"
    : "COLD";
const reason =
  leadScore >= 80
    ? "High conversion probability"
    : leadScore >= 50
    ? "Moderate conversion probability"
    : "Low conversion probability";
const recommendedProduct =
  selectedProduct?.name || "SBI Elite Card";
const personalizedMessage =
  leadScore >= 80
    ? `Based on your profile, ${recommendedProduct} is highly recommended and matches your financial goals.`
    : leadScore >= 50
    ? `Based on your profile, ${recommendedProduct} could be a suitable option. Consider exploring its benefits further.`
    : `We recommend exploring additional products before making a decision.`;
  const [messages, setMessages] = useState<ChatMessage[]>([
  {
    role: "ai",
    text: `Lead Score: ${leadScore}`,
    time: now(),
  },
  {
    role: "ai",
    text: `Category: ${category}`,
    time: now(),
  },
  {
  role: "ai",
  text: `Conversion Probability: ${leadScore}%`,
  time: now(),
},
  {
    role: "ai",
   text: `Reason: ${reason}`,
    time: now(),
  },
  {
    role: "ai",
    text: `Recommended Product: ${recommendedProduct}`,
    time: now(),
  },
  {
    role: "ai",
    text: `Personalized Message: ${personalizedMessage}`,
    time: now(),
  },
]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    setMessages((m) => [...m, { role: "user", text, time: now() }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `Based on our analysis, your match score for ${recommendedProduct} is ${leadScore}%. Category: ${category}. ${personalizedMessage}`,
          time: now(),
        },
      ]);
    }, 350);
  };

  const formRows: [string, string][] = [
    ["Full name", profile.fullName],
    ["Phone", profile.phone],
    ["PAN", profile.pan],
    ["Address", profile.address],
    ["Occupation", profile.occupation],
    ["Income", profile.income],
    ["Goal", profile.goals],
    ["Product under discussion", selectedProduct?.name || "SBI Smart Savings and SIP"],
  ];

  return (
    <main className="min-h-screen px-4 py-10 md:px-6" style={{ background: c.bg }}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: c.primary }}>
            Conversational onboarding
          </p>
          <h1 className="mt-2 text-3xl font-bold" style={{ color: c.text }}>
            AI guidance with profile-aware form filling
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="flex min-h-[560px] flex-col rounded-2xl border" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
            <div className="border-b p-5" style={{ borderColor: c.border }}>
              <h2 className="font-bold" style={{ color: c.text }}>
                Advisor conversation
              </h2>
              <p className="text-xs" style={{ color: c.faint }}>
                AI-powered personalized customer onboarding
              </p>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <div key={`${message.text}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6" style={{ background: message.role === "user" ? "#005B65" : c.raised, color: message.role === "user" ? "#fff" : c.text, border: message.role === "ai" ? `1px solid ${c.border}` : "none" }}>
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="border-t p-4" style={{ borderColor: c.border }}>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && input.trim()) sendMessage(input.trim());
                  }}
                  className="min-w-0 flex-1 rounded-full border px-4 py-3 text-sm outline-none"
                  placeholder="Ask what product you should choose..."
                  style={{ background: c.muted, borderColor: c.border, color: c.text }}
                />
                <button onClick={() => input.trim() && sendMessage(input.trim())} className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white" style={{ background: "#005B65" }}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border p-5" style={{ background: c.surface, borderColor: c.border, boxShadow: c.shadow }}>
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: c.primarySoft, color: c.primary }}>
                <ClipboardList size={18} />
              </span>
              <div>
                <h2 className="font-bold" style={{ color: c.text }}>
                  Live application draft
                </h2>
                <p className="text-xs" style={{ color: c.faint }}>
                  Filled from saved profile and conversation context
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {formRows.map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: c.faint }}>
                    {label}
                  </div>
                  <div className="rounded-xl border px-4 py-3 text-sm" style={{ background: c.muted, borderColor: c.border, color: value ? c.text : c.faint }}>
                    {value || "Missing from profile"}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate("match")} className="mt-6 w-full rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "#005B65" }}>
              Check My Match
            </button>
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
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(PRODUCTS[0]);

  const navigate = (nextScreen: Screen) => {
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
  }, [theme]);

  const c = useColors(theme);

  return (
    <div className="min-h-screen" style={{ background: c.bg, color: c.text, fontFamily: "Inter, sans-serif" }}>
      <Header
        screen={screen}
        role={role}
        theme={theme}
        onThemeToggle={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
        onNavigate={navigate}
        onLogout={() => {
          setRole("guest");
          setProfile(EMPTY_PROFILE);
          setScreen("landing");
        }}
      />

      {screen === "landing" && <LandingPage theme={theme} role={role} onNavigate={navigate} />}
      {screen === "auth" && (
        <AuthPage
          theme={theme}
          mode={authMode}
          onModeChange={setAuthMode}
          onSubmit={(nextRole) => {
            setRole(nextRole);
            setProfile(nextRole === "user" ? DEFAULT_PROFILE : EMPTY_PROFILE);
            setScreen(nextRole === "admin" ? "admin" : "profile");
          }}
        />
      )}
      {screen === "products" && <ProductsPage theme={theme} role={role} selectedProduct={selectedProduct} onSelectProduct={setSelectedProduct} onNavigate={navigate} />}
      {screen === "match" && <MatchPage theme={theme} product={selectedProduct} profile={profile} onNavigate={navigate} />}
      {screen === "profile" && <ProfilePage theme={theme} profile={profile} onProfileChange={setProfile} />}
      {screen === "onboarding" && <OnboardingPage theme={theme} profile={profile} selectedProduct={selectedProduct} onNavigate={navigate} />}
      {screen === "admin" && <AdminPage theme={theme} />}
    </div>
  );
}
