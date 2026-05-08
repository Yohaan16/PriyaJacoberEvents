"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    imgUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
    heading: "Private Events",
    description: "Whether you're celebrating a birthday, hosting a ladies' night, or planning a private celebration — we create events that reflect your personality.",
    tags: ["Birthdays", "Ladies' Nights", "Private Celebrations", "Themed Parties"],
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80",
    heading: "Small Luxury Gatherings",
    description: "From boutique and beauty events to intimate dinners and stylish private parties in Zurich — curated experiences for discerning hosts.",
    tags: ["Boutique Events", "Beauty Experiences", "Intimate Dinners", "Stylish Parties"],
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    heading: "Corporate Events",
    description: "Build team spirit and impress clients with expertly coordinated corporate events — from company celebrations to Christmas galas.",
    tags: ["Company Celebrations", "Christmas Parties", "Summer Parties", "Team Events"],
  },
];

export function ServicesParallax() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-white min-h-full flex flex-col justify-center" ref={ref}>
      {/* Logo */}
      <div className="flex justify-center mb-6 md:mb-8">
        <img
          src="/logo.png"
          alt="Priya Jacober Events"
          className="w-80 md:w-96 h-auto object-contain"
        />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">What We Offer</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our <span className="text-primary">Services</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.heading}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-default"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={service.imgUrl}
                  alt={service.heading}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <h3
                  className="absolute bottom-4 left-5 right-5 text-xl md:text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.heading}
                </h3>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 bg-white">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-primary/30 text-primary bg-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
