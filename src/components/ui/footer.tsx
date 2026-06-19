"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);



function nav(section: string) {
  window.dispatchEvent(new CustomEvent("pje-navigate", { detail: section }));
}

const serviceLinks = [
  { textKey: "services.private.title", section: "services" },
  { textKey: "services.luxury.title", section: "services" },
  { textKey: "services.corporate.title", section: "services" },
  { textKey: "nav.gallery", section: "gallery" },
] as const;

const quickLinks = [
  { textKey: "nav.home", section: "home" },
  { textKey: "nav.about", section: "about" },
  { textKey: "nav.gallery", section: "gallery" },
  { textKey: "nav.howItWorks", section: "how-it-works" },
  { textKey: "nav.contact", section: "contact" },
] as const;

const contactInfo = [
  { icon: Mail, text: "priya@jacoberevents.ch", href: "mailto:priya@jacoberevents.ch" },
  { icon: Phone, text: "+41 76 502 91 74", href: "tel:+41765029174" },
  { icon: MapPin, textKey: "hero.location", href: "#" },
] as const;

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/priyajacoberevents" },
];

export function Footer() {
  const { t } = useLanguage();

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
              {t("footer.desc")}
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
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t("footer.services")}</p>
              <ul className="space-y-2">
                {serviceLinks.map(({ textKey, section }) => (
                  <li key={textKey}>
                    <button onClick={() => nav(section)} className="text-sm text-white/50 hover:text-primary transition-colors duration-300">{t(textKey)}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t("footer.quickLinks")}</p>
              <ul className="space-y-2">
                {quickLinks.map(({ textKey, section }) => (
                  <li key={textKey}>
                    <button onClick={() => nav(section)} className="text-sm text-white/50 hover:text-primary transition-colors duration-300">{t(textKey)}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t("footer.contact")}</p>
              <ul className="space-y-3">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const text = "textKey" in info ? t(info.textKey) : info.text;
                  return (
                    <li key={text}>
                      <a href={info.href} className="flex items-center gap-3 text-sm text-white/50 hover:text-primary transition-colors duration-300">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/30">&copy; 2026 Priya Jacober Events. {t("footer.rights")}</p>
          <p className="text-xs text-white/30 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("hero.title1")} {t("hero.title2")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
