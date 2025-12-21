export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-white/70">
          This website collects information you voluntarily provide (such as name, email, phone,
          and details about your real estate needs) for the purpose of responding to your inquiry,
          scheduling consultations, and providing real estate-related information.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Information We Collect</h2>
        <ul className="mt-3 list-disc pl-6 text-white/70">
          <li>Contact details you submit (name, email, phone).</li>
          <li>Details about what you’re looking for (areas, budget, timeline, etc.).</li>
          <li>Basic website analytics (e.g., page views) to improve site performance.</li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold">How We Use Information</h2>
        <ul className="mt-3 list-disc pl-6 text-white/70">
          <li>To contact you about your inquiry.</li>
          <li>To schedule meetings you request.</li>
          <li>To improve the website experience and measure performance.</li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold">Sharing</h2>
        <p className="mt-3 text-white/70">
          We do not sell your personal information. We may share it with service providers
          used to operate this site (hosting, database, analytics, and email delivery).
        </p>

        <h2 className="mt-10 text-xl font-semibold">Contact</h2>
        <p className="mt-3 text-white/70">
          For privacy questions, contact us through the website contact form.
        </p>

        <p className="mt-10 text-xs text-white/50">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </main>
  );
}
