"use client";

import { useEffect, useMemo, useState } from "react";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "The Lodge Real Estate";
const CAL_URL = process.env.NEXT_PUBLIC_CALENDAR_URL || "#";
const ZILLOW_URL = process.env.NEXT_PUBLIC_ZILLOW_REVIEWS_URL || "#";

type LeadPayload = Record<string, any>;

async function submitLead(payload: LeadPayload) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Failed to submit.");
  return data;
}

function useFirstVisitModal() {
  const key = "lodge_seen_modal_v1";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(key);
      if (!seen) setOpen(true);
    } catch {}
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(key, "1");
    } catch {}
  };

  return { open, close, setOpen };
}

export default function HomePage() {
  const { open, close, setOpen } = useFirstVisitModal();
  const [toast, setToast] = useState<string | null>(null);

  const heroTagline = useMemo(
    () =>
      "Luxury-level guidance for Worcester County, MetroWest, Greater Boston, and the South Shore.",
    []
  );

  // Reference the uploaded building image
  const heroBg = "/maxim-shklyaev-tFSirJIjl34-unsplash.jpg";

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* HERO */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url('${heroBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 opacity-80">
          {/* Dark overlay */}
          <div className="h-full w-full bg-gradient-to-b from-[#0b0b0d] via-[#070708] to-[#050506]" />
          {/* Gold sheen overlay */}
          <div className="h-full w-full bg-gradient-to-r from-[#bfa76f]/60 to-[#ffd700]/80" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-10">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#bfa76f] to-[#ffd700] shadow-[0_0_30px_rgba(214,170,90,0.22)]" />
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/70">The Lodge</p>
                <p className="text-base font-semibold">{SITE_NAME}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a className="text-sm text-white/70 hover:text-white" href="#buyers">
                Buy
              </a>
              <a className="text-sm text-white/70 hover:text-white" href="#sellers">
                Sell
              </a>
              <a className="text-sm text-white/70 hover:text-white" href="#investors">
                Invest
              </a>
              <a
                className="ml-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
              >
                Book a Call
              </a>
            </div>
          </nav>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Find your next home —
                <span className="block bg-gradient-to-r from-[#bfa76f] to-[#ffd700] bg-clip-text text-transparent">
                  with a guide who moves fast.
                </span>
              </h1>
              <p className="mt-4 text-lg text-white/75">{heroTagline}</p>

              {/* "Zillow-style" lead search */}
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm uppercase tracking-widest text-white/60">Search-style matching</p>
                <p className="mt-1 text-sm text-white/70">
                  Tell me what you want — I'll send matching listings and strategy.
                </p>
                <SearchCapture onSuccess={() => setToast("Got it — I'll follow up with matches shortly.")} />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gradient-to-r from-[#bfa76f] to-[#ffd700] px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
                >
                  Book a consult
                </a>
                <a
                  href={ZILLOW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Read Zillow reviews
                </a>
              </div>
            </div>

            {/* Headshot card */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {/* Replace /headshot.jpg with your image in /public */}
                  <img
                    src="/headshot.jpg"
                    alt="Rasheed Lodge headshot"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold">Rasheed Lodge</p>
                  <p className="text-sm text-white/70">
                    Licensed real estate agent • Central MA + Greater Boston
                  </p>
                </div>
              </div>

              <p className="mt-5 text-white/75 leading-relaxed">
                I combine a data-driven approach with sharp negotiation and fast communication — helping buyers,
                sellers, and investors make confident moves without feeling rushed or lost.
              </p>

              <div className="mt-5 flex gap-3">
                <a className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15" href="#about">
                  About
                </a>
                <button
                  className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                  onClick={() => setOpen(true)}
                >
                  Get help now
                </button>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div id="about" className="mt-14 grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Buyer Guidance"
              body="Strategy, neighborhoods, and sharp offers — with calm communication."
              anchor="buyers"
            />
            <InfoCard
              title="Seller Results"
              body="Pricing and prep that attracts serious buyers — not just showings."
              anchor="sellers"
            />
            <InfoCard
              title="Investor Focus"
              body="Buy-box clarity, deal triage, and underwriting support."
              anchor="investors"
            />
          </div>

          <footer className="mt-14 border-t border-white/10 pt-8 pb-10 text-sm text-white/60">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>© {new Date().getFullYear()} {SITE_NAME}</p>
              <div className="flex gap-4">
                <a className="hover:text-white" href="/privacy">
                  Privacy
                </a>
                <a className="hover:text-white" href={ZILLOW_URL} target="_blank" rel="noreferrer">
                  Zillow Reviews
                </a>
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* Popup Modal */}
      {open && (
        <LeadModal
          onClose={close}
          onSuccess={() => setToast("Thanks — I'll reach out shortly.")}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/80 px-5 py-3 text-sm text-white shadow-lg border border-white/10">
          {toast}
          <button
            className="ml-3 text-white/70 hover:text-white"
            onClick={() => setToast(null)}
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}

function InfoCard({ title, body, anchor }: { title: string; body: string; anchor: string }) {
  return (
    <a
      href={`#${anchor}`}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
    >
      <p className="text-sm uppercase tracking-widest text-white/60">The Lodge</p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-white/70">{body}</p>
      <p className="mt-4 text-sm font-semibold bg-gradient-to-r from-[#bfa76f] to-[#ffd700] bg-clip-text text-transparent">
        Explore →
      </p>
    </a>
  );
}

function SearchCapture({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState({
    areas: "Worcester County",
    towns: "",
    price_min: "",
    price_max: "",
    beds: "3",
    baths: "2",
    property_type: "Any",
    timeline: "0–3 months",
    financing: "Not sure",
    name: "",
    email: "",
    phone: "",
    company: "", // honeypot
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await submitLead({
        source: "search_capture",
        page_path: "/",
        ...form,
        price_min: form.price_min ? Number(form.price_min) : null,
        price_max: form.price_max ? Number(form.price_max) : null,
        beds: form.beds ? Number(form.beds) : null,
        baths: form.baths ? Number(form.baths) : null,
        lead_type: "buyer",
        message: `Search request: ${form.areas}${form.towns ? ` | Towns: ${form.towns}` : ""}`,
      });
      onSuccess();
      setForm((f) => ({ ...f, name: "", email: "", phone: "" }));
    } catch (e: any) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <select
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          value={form.areas}
          onChange={(e) => setForm({ ...form, areas: e.target.value })}
        >
          <option>Worcester County</option>
          <option>MetroWest</option>
          <option>Greater Boston</option>
          <option>South Shore</option>
        </select>

        <input
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="Preferred towns (optional)"
          value={form.towns}
          onChange={(e) => setForm({ ...form, towns: e.target.value })}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="Min $"
          value={form.price_min}
          onChange={(e) => setForm({ ...form, price_min: e.target.value })}
          inputMode="numeric"
        />
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="Max $"
          value={form.price_max}
          onChange={(e) => setForm({ ...form, price_max: e.target.value })}
          inputMode="numeric"
        />
        <select
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          value={form.beds}
          onChange={(e) => setForm({ ...form, beds: e.target.value })}
        >
          <option value="1">1+ beds</option>
          <option value="2">2+ beds</option>
          <option value="3">3+ beds</option>
          <option value="4">4+ beds</option>
          <option value="5">5+ beds</option>
        </select>
        <select
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          value={form.baths}
          onChange={(e) => setForm({ ...form, baths: e.target.value })}
        >
          <option value="1">1+ baths</option>
          <option value="2">2+ baths</option>
          <option value="3">3+ baths</option>
        </select>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <select
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          value={form.property_type}
          onChange={(e) => setForm({ ...form, property_type: e.target.value })}
        >
          <option>Any</option>
          <option>Single Family</option>
          <option>Condo</option>
          <option>Multi-Family</option>
          <option>Land</option>
        </select>

        <select
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          value={form.timeline}
          onChange={(e) => setForm({ ...form, timeline: e.target.value })}
        >
          <option>0–3 months</option>
          <option>3–6 months</option>
          <option>6–12 months</option>
          <option>Just researching</option>
        </select>

        <select
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          value={form.financing}
          onChange={(e) => setForm({ ...form, financing: e.target.value })}
        >
          <option>Not sure</option>
          <option>Pre-approved</option>
          <option>Need a lender</option>
          <option>Cash</option>
        </select>
      </div>

      {/* Contact fields */}
      <div className="grid gap-3 md:grid-cols-3">
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      {/* Honeypot hidden field */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        aria-hidden="true"
      />

      {err && <p className="text-sm text-red-300">{err}</p>}

      <button
        disabled={loading}
        className="mt-1 rounded-2xl bg-gradient-to-r from-[#bfa76f] to-[#ffd700] px-5 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Sending…" : "See Matches (I'll send listings)"}
      </button>
    </form>
  );
}

function LeadModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    lead_type: "buyer",
    message: "",
    company: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await submitLead({
        source: "entry_modal",
        page_path: "/",
        ...form,
      });
      onSuccess();
      onClose();
      window.open(process.env.NEXT_PUBLIC_CALENDAR_URL || "#", "_blank", "noopener,noreferrer");
    } catch (e: any) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b0b0d] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/60">The Lodge</p>
            <h2 className="mt-1 text-2xl font-semibold">Need help with real estate?</h2>
            <p className="mt-2 text-white/70">
              Drop your contact info and pick a time — I'll help you get clear, fast.
            </p>
          </div>
          <button
            className="rounded-full bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 grid gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
              value={form.lead_type}
              onChange={(e) => setForm({ ...form, lead_type: e.target.value })}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="investor">Investor</option>
            </select>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <textarea
            className="min-h-[90px] rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
            placeholder="What are you looking for? (towns, budget, timeline)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <input
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            aria-hidden="true"
          />

          {err && <p className="text-sm text-red-300">{err}</p>}

          <button
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-[#bfa76f] to-[#ffd700] px-5 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Saving…" : "Save + Choose a time"}
          </button>

          <p className="text-xs text-white/50">
            By submitting, you agree to be contacted about your request. {" "}
            <a className="underline hover:text-white" href="/privacy">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
