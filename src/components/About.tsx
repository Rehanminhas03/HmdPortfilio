"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { INDUSTRIES, PROFILE_IMAGE } from "@/lib/data";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

interface AboutProps {
  industries?: string[];
  profileImage?: string;
}

export default function About({
  industries = INDUSTRIES,
  profileImage = PROFILE_IMAGE,
}: AboutProps) {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <motion.span
          {...reveal}
          className="mb-4 block text-xs uppercase tracking-[0.35em] text-gold"
        >
          About
        </motion.span>
        <motion.h2
          {...reveal}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-cormorant text-4xl font-light text-white sm:text-5xl lg:text-6xl"
        >
          Strategy meets <em className="italic text-gold">cinema.</em>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Photo placeholder */}
          <motion.div {...reveal} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full border border-gold/60" aria-hidden />
            <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden border border-border bg-gradient-to-br from-[#16263a] via-[#0e1420] to-[#080c12]">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Hammad Ayub"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <span className="text-sm uppercase tracking-[0.3em] text-muted">
                  Your Photo Here
                </span>
              )}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-base leading-relaxed text-muted">
              I&apos;m a <span className="font-medium text-white">Head of Media &amp; Marketing</span> and brand
              strategist with a proven track record of helping brands across automotive, EV, real estate, steel
              manufacturing, and e-commerce increase visibility, generate leads, and drive business growth.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">
              My work blends <span className="font-medium text-white">strategic marketing</span> with{" "}
              <span className="font-medium text-white">cinematic creative production</span> — from brand
              positioning and paid media to photography, video, and AI-powered campaigns that deliver impact
              across both B2B and B2C markets.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Today I lead marketing for some of Pakistan&apos;s largest manufacturers and automotive brands,
              while producing <span className="font-medium text-white">AI advertising</span> for international
              clients — always chasing the intersection of data, design, and storytelling.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="border border-border px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  {industry}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
