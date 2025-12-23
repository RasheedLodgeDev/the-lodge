"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

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

  const heroBg = "/maxim-shklyaev-tFSirJIjl34-unsplash.jpg";

  return (
    <main className="min-h-screen bg-[#fafaf8] text-gray-900">
      {/* HERO */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url('${heroBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Lighter, more welcoming overlay */}
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-b from-white/95 via-white/90 to-[#fafaf8]/95" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/20 via-transparent to-[#b8934a]/15" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-10">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#c9a961] to-[#b8934a] shadow-lg" />
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-gray-600">The Lodge</p>
                <p className="text-base font-semibold text-gray-900">{SITE_NAME}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a className="text-sm text-gray-600 hover:text-gray-900 transition" href="#buyers">
                Buy
              </a>
              <a className="text-sm text-gray-600 hover:text-gray-900 transition" href="#sellers">
                Sell
              </a>
              <a className="text-sm text-gray-600 hover:text-gray-900 transition" href="#investors">
                Invest
              </a>
              <a
                className="ml-2 rounded-full bg-gray-900/5 px-4 py-2 text-sm hover:bg-gray-900/10 transition"
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
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl text-gray-900">
                Find your next home —
                <span className="block bg-gradient-to-r from-[#c9a961] to-[#b8934a] bg-clip-text text-transparent">
                  with a guide who moves fast.
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-700">{heroTagline}</p>

              {/* Search capture with cleaner styling */}
              <div className="mt-8 rounded-3xl border border-gray-200 bg-white/80 p-5 backdrop-blur shadow-sm">
                <p className="text-sm uppercase tracking-widest text-gray-500">Search-style matching</p>
                <p className="mt-1 text-sm text-gray-600">
                  Tell me what you want — I'll send matching listings and strategy.
                </p>
                <SearchCapture onSuccess={() => setToast("Got it — I'll follow up with matches shortly.")} />
              </div>

              <form className="mt-5" onSubmit={onSubmit}>

                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gradient-to-r from-[#c9a961] to-[#b8934a] px-5 py-3 text-sm font-semibold text-white hover:shadow-lg transition-all"
                >
                  Book a consult
                </a>
                <a
                  href={ZILLOW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
                >
                  Read Zillow reviews
                  </a>
                </div>
              </form>
            </div>

            {/* Headshot card with lighter styling */}
            <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-gray-200 bg-gray-50">
                  <img
                    src="/headshot.jpg"
                    alt="Rasheed Lodge headshot"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900">Rasheed Lodge</p>
                  <p className="text-sm text-gray-600">
                    Licensed real estate agent • Central MA + Greater Boston
                  </p>
                </div>
              </div>

              <p className="mt-5 text-gray-700 leading-relaxed">
                I combine a data-driven approach with sharp negotiation and fast communication — helping buyers,
                sellers, and investors make confident moves without feeling rushed or lost.
              </p>

              <div className="mt-5 flex gap-3">
                <a className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 transition text-gray-900" href="#about">
                  About
                </a>
                <button
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 transition text-gray-900"
                  onClick={() => setOpen(true)}
                >
                  Get help now
                </button>
              </div>
            </div>
          </div>

          {/* Quick info cards */}
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
        </div>
      </section>

      {/* DETAILED SECTIONS - New content */}
      <section id="buyers" className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">For Buyers</p>
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Find the right home with <span className="bg-gradient-to-r from-[#c9a961] to-[#b8934a] bg-clip-text text-transparent">confidence and clarity</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Buying a home shouldn't feel overwhelming. I help you understand your options, navigate competitive markets, and make strong offers that actually get accepted — all while keeping your stress level low and your timeline realistic.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a961] to-[#b8934a] flex items-center justify-center text-white text-sm font-semibold">✓</div>
                  <div>
                    <p className="font-semibold text-gray-900">Neighborhood expertise</p>
                    <p className="text-sm text-gray-600">Deep knowledge of Worcester County, MetroWest, Greater Boston, and South Shore markets</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a961] to-[#b8934a] flex items-center justify-center text-white text-sm font-semibold">✓</div>
                  <div>
                    <p className="font-semibold text-gray-900">Sharp offer strategy</p>
                    <p className="text-sm text-gray-600">Data-driven pricing and negotiation tactics that win in competitive situations</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a961] to-[#b8934a] flex items-center justify-center text-white text-sm font-semibold">✓</div>
                  <div>
                    <p className="font-semibold text-gray-900">Fast, clear communication</p>
                    <p className="text-sm text-gray-600">Quick responses when it matters, with straightforward guidance every step of the way</p>
                  </div>
                </div>
              </div>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-[#c9a961] to-[#b8934a] px-6 py-3 text-sm font-semibold text-white hover:shadow-lg transition-all"
              >
                Start your search
              </a>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 border border-gray-200">
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">How it works</p>
              <div className="space-y-6">
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">1. Discovery call</p>
                  <p className="text-sm text-gray-600">We'll discuss your must-haves, budget, timeline, and preferred locations</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">2. Personalized search</p>
                  <p className="text-sm text-gray-600">I'll send curated listings and set up showings that match your criteria</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">3. Strategic offers</p>
                  <p className="text-sm text-gray-600">When you're ready, I'll help craft competitive offers with strong negotiation backing</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">4. Smooth closing</p>
                  <p className="text-sm text-gray-600">I'll coordinate inspections, appraisals, and paperwork to keep everything on track</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sellers" className="py-20 bg-[#fafaf8]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1 rounded-3xl bg-white p-8 border border-gray-200 shadow-sm">
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Seller advantages</p>
              <div className="space-y-6">
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Market-tested pricing</p>
                  <p className="text-sm text-gray-600">Comp analysis and data insights to price competitively without leaving money on the table</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Strategic staging & prep</p>
                  <p className="text-sm text-gray-600">Guidance on high-impact improvements and presentation that attracts serious offers</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Professional marketing</p>
                  <p className="text-sm text-gray-600">Quality photos, targeted digital advertising, and broad MLS exposure</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Skilled negotiation</p>
                  <p className="text-sm text-gray-600">Experience handling multiple offers, contingencies, and closing obstacles</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">For Sellers</p>
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Get <span className="bg-gradient-to-r from-[#c9a961] to-[#b8934a] bg-clip-text text-transparent">top dollar</span> without the stress
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Selling your home is more than just listing it online. It's about positioning your property to attract the right buyers, managing showings efficiently, and negotiating offers that close on time and on terms that work for you.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                I bring a strategic approach to every listing: from initial pricing and prep recommendations to marketing execution and offer review. My goal is to help you sell confidently, quickly, and for the best possible price.
              </p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full bg-gradient-to-r from-[#c9a961] to-[#b8934a] px-6 py-3 text-sm font-semibold text-white hover:shadow-lg transition-all"
              >
                Get a home valuation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="investors" className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">For Investors</p>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Build your portfolio with <span className="bg-gradient-to-r from-[#c9a961] to-[#b8934a] bg-clip-text text-transparent">clarity and speed</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Whether you're buying your first rental or scaling a multi-property portfolio, I help investors move quickly on deals that make financial sense.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c9a961] to-[#b8934a] flex items-center justify-center mb-4 text-white font-semibold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Buy-box clarity</h3>
              <p className="text-gray-600 text-sm">
                Define your investment criteria, target markets, and financial goals so we only look at properties that fit your strategy.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c9a961] to-[#b8934a] flex items-center justify-center mb-4 text-white font-semibold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Deal triage</h3>
              <p className="text-gray-600 text-sm">
                Fast analysis of potential acquisitions with rent comps, repair estimates, and cash flow projections to help you decide quickly.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c9a961] to-[#b8934a] flex items-center justify-center mb-4 text-white font-semibold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Closing support</h3>
              <p className="text-gray-600 text-sm">
                Coordination with lenders, inspectors, and contractors to keep deals moving and minimize time from offer to closing.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 border border-gray-200 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-2">Ready to find your next investment?</p>
            <p className="text-gray-600 mb-6">Let's discuss your portfolio goals and market opportunities.</p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-gradient-to-r from-[#c9a961] to-[#b8934a] px-6 py-3 text-sm font-semibold text-white hover:shadow-lg transition-all"
            >
              Schedule investor consultation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fafaf8] border-t border-gray-200 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#c9a961] to-[#b8934a] shadow-lg" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{SITE_NAME}</p>
                <p className="text-xs text-gray-500">© {new Date().getFullYear()} All rights reserved</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <a className="text-gray-600 hover:text-gray-900 transition" href="/privacy">
                Privacy
              </a>
              <a className="text-gray-600 hover:text-gray-900 transition" href={ZILLOW_URL} target="_blank" rel="noreferrer">
                Zillow Reviews
              </a>
              <a className="text-gray-600 hover:text-gray-900 transition" href={CAL_URL} target="_blank" rel="noreferrer">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Popup Modal */}
      {open && (
        <LeadModal
          onClose={close}
          onSuccess={() => setToast("Thanks — I'll reach out shortly.")}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-5 py-3 text-sm text-white shadow-lg">
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
      className="rounded-3xl border border-gray-200 bg-white/90 p-6 hover:shadow-lg transition backdrop-blur"
    >
      <p className="text-sm uppercase tracking-widest text-gray-500">The Lodge</p>
      <h3 className="mt-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{body}</p>
      <p className="mt-4 text-sm font-semibold bg-gradient-to-r from-[#c9a961] to-[#b8934a] bg-clip-text text-transparent">
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

  async function onSubmit(e: FormEvent) {
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
      setErr(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const goldFrom = "#b98a2e"; // richer gold (less lemon-yellow)
  const goldTo = "#8a5a12";   // deeper “antique” gold

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3">
      {/* Row 1 */}
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          placeholder="Area (e.g., Worcester County, MetroWest)"
          value={form.areas}
          onChange={(e) => setForm({ ...form, areas: e.target.value })}
        />
        <input
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          placeholder="Towns (optional)"
          value={form.towns}
          onChange={(e) => setForm({ ...form, towns: e.target.value })}
        />
      </div>

      {/* Row 2 */}
      <div className="grid gap-3 md:grid-cols-4">
        <input
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          placeholder="Min $"
          inputMode="numeric"
          value={form.price_min}
          onChange={(e) => setForm({ ...form, price_min: e.target.value })}
        />
        <input
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          placeholder="Max $"
          inputMode="numeric"
          value={form.price_max}
          onChange={(e) => setForm({ ...form, price_max: e.target.value })}
        />
        <select
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          value={form.beds}
          onChange={(e) => setForm({ ...form, beds: e.target.value })}
        >
          <option value="1">1+ Beds</option>
          <option value="2">2+ Beds</option>
          <option value="3">3+ Beds</option>
          <option value="4">4+ Beds</option>
          <option value="5">5+ Beds</option>
        </select>
        <select
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          value={form.baths}
          onChange={(e) => setForm({ ...form, baths: e.target.value })}
        >
          <option value="1">1+ Baths</option>
          <option value="2">2+ Baths</option>
          <option value="3">3+ Baths</option>
          <option value="4">4+ Baths</option>
        </select>
      </div>

      {/* Row 3 */}
      <div className="grid gap-3 md:grid-cols-3">
        <select
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          value={form.property_type}
          onChange={(e) => setForm({ ...form, property_type: e.target.value })}
        >
          <option>Any</option>
          <option>Single-family</option>
          <option>Condo</option>
          <option>Multi-family</option>
          <option>Townhouse</option>
          <option>Land</option>
        </select>

        <select
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          value={form.timeline}
          onChange={(e) => setForm({ ...form, timeline: e.target.value })}
        >
          <option>0–3 months</option>
          <option>3–6 months</option>
          <option>6–12 months</option>
          <option>Just browsing</option>
        </select>

        <select
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          value={form.financing}
          onChange={(e) => setForm({ ...form, financing: e.target.value })}
        >
          <option>Not sure</option>
          <option>Pre-approved</option>
          <option>Need a lender</option>
          <option>Cash</option>
        </select>
      </div>

      {/* Contact */}
      <div className="grid gap-3 md:grid-cols-3">
        <input
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1"
          style={{ outlineColor: goldFrom }}
          placeholder="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      {/* Honeypot */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        aria-hidden="true"
      />

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        disabled={loading}
        type="submit"
        className="mt-1 rounded-2xl px-5 py-3 text-sm font-semibold text-white hover:shadow-lg transition-all disabled:opacity-60"
        style={{
          backgroundImage: `linear-gradient(90deg, ${goldFrom}, ${goldTo})`,
        }}
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

  async function onSubmit(e: FormEvent) {
    
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500">The Lodge</p>
            <h2 className="mt-1 text-2xl font-semibold text-gray-900">Need help with real estate?</h2>
            <p className="mt-2 text-gray-600">
              Drop your contact info and pick a time — I'll help you get clear, fast.
            </p>
          </div>
          <button
            className="rounded-full bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200 transition"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-5">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#c9a961] focus:outline-none focus:ring-1 focus:ring-[#c9a961]"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-[#c9a961] focus:outline-none focus:ring-1 focus:ring-[#c9a961]"
              value={form.lead_type}
              onChange={(e) => setForm({ ...form, lead_type: e.target.value })}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="investor">Investor</option>
            </select>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#c9a961] focus:outline-none focus:ring-1 focus:ring-[#c9a961]"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#c9a961] focus:outline-none focus:ring-1 focus:ring-[#c9a961]"
              placeholder="Phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <textarea
            className="mt-3 min-h-[90px] w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#c9a961] focus:outline-none focus:ring-1 focus:ring-[#c9a961]"
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

          {err && <p className="mt-3 text-sm text-red-500">{err}</p>}

          <button
            disabled={loading}
            onClick={onSubmit}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#c9a961] to-[#b8934a] px-5 py-3 text-sm font-semibold text-white hover:shadow-lg transition-all disabled:opacity-60"
          >
            {loading ? "Saving…" : "Save + Choose a time"}
          </button>

          <p className="mt-3 text-xs text-gray-500 text-center">
            By submitting, you agree to be contacted about your request.{" "}
            <a className="underline hover:text-gray-900" href="/privacy">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
