import { motion } from "framer-motion";
import { Info, Search, Smartphone, Sparkles } from "lucide-react";
import { NavLink } from "react-router";

const AppName = () => {
    return (
      <NavLink to="/" className="inline font-bold">
        <span className="text-white">We </span>
        <span className="text-indigo-600">PhoneSpec</span>
      </NavLink>
    )
  }

export default function AboutApp() {
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
    <section className="relative mx-auto max-w-full py-4 sm:py-10">
      {/* Glow / Accent - Updated to blue/purple gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute left-1/4 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 to-slate-800 p-2 shadow-2xl backdrop-blur"
      >
        <header className="mb-6">
          <p className="text-xl font-bold uppercase tracking-widest bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">About</p>
          <p className="mt-3 max-w-2xl text-slate-300">
            <AppName/> is a comprehensive, user‑friendly platform for exploring and discovering
            detailed smartphone specifications. Built for tech enthusiasts, casual buyers, and
            comparison shoppers.
          </p>
        </header>

        <section className="prose prose-invert text-white max-w-none">
          <p>
            At its core, <AppName/> lets users <strong className="text-indigo-400">search smartphones by name or model</strong> and instantly
            retrieve a structured, scannable overview of each device. From essentials like display size,
            processor, RAM, and storage, to in‑depth insights such as camera configurations, battery capacity,
            software version, sensors, and network bands—everything is neatly organized and easy to navigate.
          </p>
          <br/>
          <p>
            The mission is simple: make smartphone research <strong className="text-cyan-400">simple</strong>. Instead of
            bouncing across forums and spec sheets, you get a <em className="text-purple-400">single source</em> for up‑to‑date
            specifications. Whether you're comparing the latest flagships, checking solid mid‑range options,
            or looking up older models, <AppName/> puts the information at your fingertips.
          </p>
        </section>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((f, index) => {
            const iconColors = [
              "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
              "text-cyan-400 border-cyan-500/30 bg-cyan-500/10", 
              "text-purple-400 border-purple-500/30 bg-purple-500/10",
              "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
            ];
            
            return (
              <li key={f.title} className="group flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 hover:border-indigo-500/30 hover:bg-slate-800/70 transition-all duration-200">
                <div className={`mt-1 rounded-lg border p-2 transition-all duration-200 ${iconColors[index]} group-hover:scale-110`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-indigo-100 transition-colors">{f.title}</h3>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{f.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <section className="prose prose-invert text-white mt-8 max-w-none">
          <h3 className="text-indigo-400">Why it matters</h3>
          <p>
            Buying a phone shouldn't feel like detective work. <AppName/> bridges the gap between curiosity and
            clarity, so you can make <strong className="text-cyan-400">informed decisions</strong> with confidence. It also helps you stay on top
            of the mobile landscape without drowning in tabs.
          </p>
          <h3 className="text-purple-400">What's next</h3>
          <p>
            On the roadmap: <strong className="text-indigo-400">device comparisons</strong> with visual diffing, <strong className="text-cyan-400">trending phones</strong> based on search
            volume, <strong className="text-emerald-400">personalized picks</strong> for your budget and priorities, and richer filtering by specs.
          </p>
        </section>

        <footer className="mt-8 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-slate-800/60 to-slate-700/60 p-5">
          <p className="text-sm text-slate-300">
            Whether you're researching your next upgrade or validating a detail mid‑conversation,
            {" "}
            <span className="font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"><AppName/></span> keeps the facts tidy, trustworthy, and fast to find.
          </p>
        </footer>
      </motion.div>
    </section>
  );
}