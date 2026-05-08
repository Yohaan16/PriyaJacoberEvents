"use client";

import { Mail, Phone, MapPin } from "lucide-react";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

function nav(section: string) {
  window.dispatchEvent(new CustomEvent("pje-navigate", { detail: section }));
}

const serviceLinks = [
  { text: "Private Events", section: "services" },
  { text: "Luxury Gatherings", section: "services" },
  { text: "Corporate Events", section: "services" },
  { text: "Offers & Packages", section: "packages" },
];

const quickLinks = [
  { text: "Home", section: "home" },
  { text: "About Us", section: "about" },
  { text: "Packages", section: "packages" },
  { text: "How It Works", section: "how-it-works" },
  { text: "Contact", section: "contact" },
];

const contactInfo = [
  { icon: Mail, text: "info@priyajacoberevents.ch", href: "mailto:info@priyajacoberevents.ch" },
  { icon: Phone, text: "+41 76 502 91 74", href: "tel:+41765029174" },
  { icon: MapPin, text: "Zurich, Switzerland", href: "#" },
];

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/priyajacoberevents" },
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com/priyajacoberevents" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-white/80 mt-0 flex-shrink-0">
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-4 lg:px-8 lg:pt-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-foreground" style={{ background: "var(--gold-gradient)" }}>P</div>
              <span className="text-xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Priya Jacober Events</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-4">
              Making every moment unforgettable. Stress‑free event planning for private, luxury &amp; corporate occasions in Zurich.
            </p>
            <ul className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300" aria-label={label}>
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:col-span-2">
            <div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</p>
              <ul className="space-y-2">
                {serviceLinks.map(({ text, section }) => (
                  <li key={text}>
                    <button onClick={() => nav(section)} className="text-sm text-white/50 hover:text-primary transition-colors duration-300">{text}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</p>
              <ul className="space-y-2">
                {quickLinks.map(({ text, section }) => (
                  <li key={text}>
                    <button onClick={() => nav(section)} className="text-sm text-white/50 hover:text-primary transition-colors duration-300">{text}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</p>
              <ul className="space-y-3">
                {contactInfo.map(({ icon: Icon, text, href }) => (
                  <li key={text}>
                    <a href={href} className="flex items-center gap-3 text-sm text-white/50 hover:text-primary transition-colors duration-300">
                      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/30">&copy; 2026 Priya Jacober Events. All rights reserved.</p>
          <p className="text-xs text-white/30 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            Making Every Moment Unforgettable.
          </p>
        </div>
      </div>
    </footer>
  );
}
