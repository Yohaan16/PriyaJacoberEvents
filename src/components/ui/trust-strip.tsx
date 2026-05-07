"use client";

import React from "react";

const eventTypes = [
  "Birthdays",
  "Corporate Events",
  "Company Parties",
  "Ladies' Events",
  "Private Parties",
  "Community Events",
  "Destination Events",
  "Summer Parties",
  "Christmas Parties",
  "Team Events",
];

export function TrustStrip() {
  return (
    <section className="relative py-6 md:py-8 overflow-hidden" style={{ background: "var(--pink-gradient)" }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...eventTypes, ...eventTypes].map((event, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-6 md:mx-10 text-sm md:text-base font-medium uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-4 flex-shrink-0" />
            {event}
          </span>
        ))}
      </div>
    </section>
  );
}
