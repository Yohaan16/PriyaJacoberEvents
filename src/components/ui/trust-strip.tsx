"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";

const eventKeys = [
  "trust.birthdays",
  "trust.corporate",
  "trust.company",
  "trust.ladies",
  "trust.private",
  "trust.luxury",
  "trust.beauty",
  "trust.summer",
  "trust.christmas",
  "trust.team",
] as const;

export function TrustStrip() {
  const { t } = useLanguage();

  return (
    <section className="relative py-6 md:py-8 overflow-hidden" style={{ background: "var(--pink-gradient)" }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...eventKeys, ...eventKeys].map((key, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-6 md:mx-10 text-sm md:text-base font-medium uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-4 flex-shrink-0" />
            {t(key)}
          </span>
        ))}
      </div>
    </section>
  );
}

