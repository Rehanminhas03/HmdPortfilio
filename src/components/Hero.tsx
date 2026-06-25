"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const STATS = [
  { value: "8+", label: "Industries Served" },
  { value: "10+", label: "Brands Elevated" },
  { value: "4+", label: "Years Cinematic Production" },
  { value: "B2B·B2C", label: "Dual Market Expertise" },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, rgba(40,70,110,0.35), transparent 70%), radial-gradient(40% 40% at 85% 70%, rgba(201,168,76,0.10), transparent 70%)",
        }}
      />
      {/* Scan lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 4px)",
        }}
      />
      {/* Film grain */}
      <div className="grain" aria-hidden />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-12 pt-32 sm:px-10 lg:px-14"
      >
        <motion.span
          variants={item}
          className="mb-7 block text-xs uppercase tracking-[0.45em] text-gold sm:text-sm"
        >
          Media &amp; Marketing · Islamabad, Pakistan
        </motion.span>

        <motion.h1
          variants={item}
          className="font-cormorant font-light leading-[0.92] text-white"
          style={{ fontSize: "clamp(4rem, 9vw, 8.5rem)" }}
        >
          <span className="block">Hammad</span>
          <span className="block italic text-gold">Ayub</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 text-xs uppercase tracking-[0.3em] text-muted sm:text-sm"
        >
          Head of Media &amp; Marketing &nbsp;·&nbsp; Brand Strategist &nbsp;·&nbsp; AI Creative Producer
        </motion.p>

        <motion.p
          variants={item}
          className="mt-7 max-w-lg text-base leading-relaxed text-muted"
        >
          Results-driven marketing leader helping brands across steel, automotive,
          EV, real estate, and e-commerce increase visibility, generate leads, and
          drive growth through strategy, cinematic content, and AI-powered creative.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/#work"
            className="bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-[#d8b95c]"
          >
            View My Work
          </Link>
          <Link
            href="/#contact"
            className="border border-border px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            Start a Project
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <div className="relative bottom-0 left-0 right-0 mx-auto w-full max-w-7xl px-6 pb-12 sm:px-10 lg:absolute lg:bottom-14 lg:left-14 lg:right-14 lg:mx-0 lg:max-w-none lg:px-0 lg:pb-0">
        <div className="grid grid-cols-2 gap-8 border-t border-border pt-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="font-cormorant text-4xl font-light text-gold sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
