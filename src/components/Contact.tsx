"use client";

import { motion } from "framer-motion";

const CONTACTS = [
  {
    label: "Email",
    value: "Hamadayub64@gmail.com",
    href: "mailto:Hamadayub64@gmail.com",
  },
  {
    label: "Phone / WhatsApp",
    value: "+92 335 5005901",
    href: "https://wa.me/923355005901",
  },
  {
    label: "Location",
    value: "Islamabad, Pakistan",
    href: "https://www.google.com/maps/search/?api=1&query=Islamabad,Pakistan",
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          {...reveal}
          className="mb-5 block text-xs uppercase tracking-[0.35em] text-gold"
        >
          Contact
        </motion.span>
        <motion.h2
          {...reveal}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-cormorant text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Let&apos;s build something{" "}
          <em className="italic text-gold">great.</em>
        </motion.h2>
        <motion.p
          {...reveal}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted"
        >
          Available for national &amp; international opportunities — brand strategy,
          cinematic content, AI advertising, and performance marketing. Let&apos;s talk.
        </motion.p>

        <div className="mt-12 space-y-3 text-left">
          {CONTACTS.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-center justify-between border border-border bg-surface px-7 py-5 transition-colors hover:border-gold hover:bg-gold/5"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                {contact.label}
              </span>
              <span className="flex items-center gap-3 text-sm text-white sm:text-base">
                {contact.value}
                <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 inline-flex items-center gap-2.5 border border-gold/30 px-5 py-3"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_#4CAF50]" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold">
            Available for new projects
          </span>
        </motion.div>
      </div>
    </section>
  );
}
