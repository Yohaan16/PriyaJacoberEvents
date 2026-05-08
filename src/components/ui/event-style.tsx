"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShoppingBag, Sparkles, Scissors, Camera, ChefHat, Car, Wine, UtensilsCrossed, GlassWater,
} from "lucide-react";

const packages = [
  { icon: ShoppingBag, title: "Boutique Tour", description: "Luxury brand experience" },
  { icon: Sparkles, title: "Private Beauty Schooling", description: "Makeup refresh at Dior before a soirée" },
  { icon: Scissors, title: "Manicure & Pedicure", description: "Pampering experience with apéro" },
  { icon: Camera, title: "Professional Photoshoot", description: "Capture every moment beautifully" },
  { icon: ChefHat, title: "Cooking Class", description: "Culinary fun for groups" },
  { icon: Car, title: "Indoor Car Racing", description: "Thrilling team competition" },
  { icon: Wine, title: "Wine Tasting Events", description: "Curated tastings in stunning venues" },
  { icon: UtensilsCrossed, title: "Wine & Dine", description: "Gourmet dining experience" },
  { icon: GlassWater, title: "Cocktail Workshop", description: "Mix, shake & enjoy together" },
];

export function EventStyle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="packages" className="section-padding" style={{ background: "var(--secondary)" }} ref={ref}>
      {/* Logo */}
      <div className="flex justify-center mb-6 md:mb-8">
        <img
          src="/logo.png"
          alt="Priya Jacober Events"
          className="w-80 md:w-96 h-auto object-contain"
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">Inspiration</p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Offers & <span className="text-primary">Packages</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Perfect for clients who need ideas — each package comes with a clear price tag.
            And many more tailor‑made options available.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.title}
                className="group relative bg-white rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-accent/20 hover:border-primary/30 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "var(--pink-gradient)" }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {pkg.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pkg.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("pje-navigate", { detail: "contact" }))}
            className="inline-block px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
            style={{ background: "var(--gold-gradient)" }}
          >
            Enquire Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
