"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mb-4 block text-xs uppercase tracking-[0.35em] text-gold"
        >
          Services
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.05 }}
          className="font-cormorant text-4xl font-light text-white sm:text-5xl lg:text-6xl"
        >
          What I <em className="italic text-gold">do.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.1 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-muted"
        >
          End-to-end media and marketing — from strategy and content to AI-powered
          creative and performance — delivered with a cinematic standard.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group border-b-2 border-transparent bg-surface p-10 transition-all duration-300 hover:border-gold hover:bg-gold/5"
            >
              <div className="font-cormorant text-[3.5rem] font-light leading-none text-border/40 transition-colors duration-300 group-hover:text-gold/30">
                {service.number}
              </div>
              <h3 className="mt-5 font-cormorant text-[1.3rem] font-medium text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
