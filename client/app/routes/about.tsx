import { motion } from "framer-motion";
import { Info, Search, Smartphone, Sparkles } from "lucide-react";

/**
 * AboutApp Component
 *
 * A polished, long-form "About" section for a smartphone specification search app.
 * - TailwindCSS for styling
 * - Framer Motion for subtle entrance animations
 * - Lucide icons for visual hints
 *
 * Usage:
 *   <AboutApp appName="PhoneSpec Finder" />
 */
export default function AboutApp({ appName = "Smartphone Spec Search" }: { appName?: string }) {
  const features = [
    {
      icon: <Search className="h-5 w-5" aria-hidden />,
      title: "Powerful Search",
      desc: "Quickly find smartphones by brand, name, or model—typo-tolerant and blazing fast.",
    },
    {
      icon: <Smartphone className="h-5 w-5" aria-hidden />,
      title: "Detailed Specifications",
      desc: "From displays and chipsets to cameras, batteries, and connectivity—all in one place.",
    },
    {
      icon: <Info className="h-5 w-5" aria-hidden />,
      title: "Clean, Intuitive UI",
      desc: "A distraction-free layout that highlights what matters so users decide faster.",
    },
    {
      icon: <Sparkles className="h-5 w-5" aria-hidden />,
      title: "Built for Growth",
      desc: "Planned upgrades: side‑by‑side comparisons, trending devices, and smart recommendations.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-14">
      {/* Glow / Accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border border-white/10 bg-neutral-900/40 p-8 shadow-2xl backdrop-blur"
      >
        <header className="mb-6">
          <p className="text-sm font-medium uppercase tracking-widest text-pink-400/90">About</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-white md:text-4xl">
            {appName}
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            {appName} is a comprehensive, user‑friendly platform for exploring and discovering
            detailed smartphone specifications. Built for tech enthusiasts, casual buyers, and
            comparison shoppers, it delivers fast, reliable access to the facts you need.
          </p>
        </header>

        <section className="prose prose-invert prose-pink max-w-none">
          <p>
            At its core, {appName} lets users <strong>search smartphones by name or model</strong> and instantly
            retrieve a structured, scannable overview of each device. From essentials like display size,
            processor, RAM, and storage, to in‑depth insights such as camera configurations, battery capacity,
            software version, sensors, and network bands—everything is neatly organized and easy to navigate.
          </p>

          <p>
            The mission is simple: make smartphone research <strong>simple, fast, and accurate</strong>. Instead of
            bouncing across forums and spec sheets, you get a <em>single source of truth</em> for up‑to‑date
            specifications. Whether you’re comparing the latest flagships, checking solid mid‑range options,
            or looking up older models, {appName} puts the right information at your fingertips.
          </p>
        </section>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <li key={f.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-neutral-900/50 p-4">
              <div className="mt-1 rounded-lg border border-white/10 p-2 text-pink-300/90">{f.icon}</div>
              <div>
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-neutral-300">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <section className="prose prose-invert prose-pink mt-8 max-w-none">
          <h3>Why it matters</h3>
          <p>
            Buying a phone shouldn’t feel like detective work. {appName} bridges the gap between curiosity and
            clarity, so you can make <strong>informed decisions</strong> with confidence. It also helps you stay on top
            of the mobile landscape without drowning in tabs.
          </p>
          <h3>What’s next</h3>
          <p>
            On the roadmap: <strong>device comparisons</strong> with visual diffing, <strong>trending phones</strong> based on search
            volume, <strong>personalized picks</strong> for your budget and priorities, and richer filtering by specs.
          </p>
        </section>

        <footer className="mt-8 rounded-xl border border-white/10 bg-neutral-900/60 p-5">
          <p className="text-sm text-neutral-300">
            Whether you’re researching your next upgrade or validating a detail mid‑conversation,
            {" "}
            <span className="font-medium text-white">{appName}</span> keeps the facts tidy, trustworthy, and fast to find.
          </p>
        </footer>
      </motion.div>
    </section>
  );
}
