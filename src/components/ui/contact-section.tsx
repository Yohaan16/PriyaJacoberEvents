"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";

const eventTypes = [
  "Birthday Party",
  "Corporate Event",
  "Company Party",
  "Private House Party",
  "Ladies' Event",
  "Community Event",
  "Destination Event",
  "Other",
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", eventType: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Event Inquiry: ${formData.eventType}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nEvent Type: ${formData.eventType}\n\n${formData.message}`);
    window.location.href = `mailto:info@priyajacoberevents.ch?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding" style={{ background: "var(--secondary)" }} ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contact <span className="text-primary">Us</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Contact info sidebar */}
          <motion.div className="lg:col-span-1 space-y-8" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Let&apos;s Plan Together</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Have an event in mind? Reach out and let&apos;s start planning something unforgettable.</p>
            </div>
            <div className="space-y-5">
              <a href="mailto:info@priyajacoberevents.ch" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--pink-gradient)" }}>
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">info@priyajacoberevents.ch</p>
                </div>
              </a>
              <a href="tel:+41765029174" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--pink-gradient)" }}>
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">+41 76 502 91 74</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl p-8 md:p-10 shadow-lg shadow-primary/5 border border-accent/20" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder="+41 ..." />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Event Type</label>
                <select required value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50 appearance-none">
                  <option value="">Select event type</option>
                  {eventTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Message</label>
              <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50 resize-none" placeholder="Tell us about your event..." />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20" style={{ background: "var(--gold-gradient)" }}>
              <Send className="w-4 h-4" /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
