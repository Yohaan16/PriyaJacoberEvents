"use client";
 
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import { useLanguage } from "@/context/language-context";
 
export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [minDate, setMinDate] = useState("");
  const { t } = useLanguage();
  
  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    location: "",
    guests: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          date: "",
          location: "",
          guests: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(result.error || t("contact.feedback.error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage(t("contact.feedback.error"));
    }
  };
 
  return (
    <section className="section-padding min-h-full flex flex-col justify-center" style={{ background: "var(--secondary)" }} ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">{t("contact.label")}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("contact.title1")} <span className="text-primary">{t("contact.title2")}</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-primary mx-auto" />
        </motion.div>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Contact info sidebar */}
          <motion.div className="lg:col-span-1 space-y-8" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t("contact.sidebar.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t("contact.sidebar.desc")}</p>
            </div>
            <div className="space-y-5">
              <a href="mailto:priya@jacoberevents.ch" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--pink-gradient)" }}>
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">priya@jacoberevents.ch</p>
                </div>
              </a>
              <a href="tel:+41765029174" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--pink-gradient)" }}>
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">+41 76 502 91 74</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--pink-gradient)" }}>
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Address</p>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    Jacober Events GmbH<br />
                    Seestrasse 143<br />
                    8610 Uster
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
 
          {/* Contact form */}
          <motion.form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl p-8 md:p-10 shadow-lg shadow-primary/5 border border-accent/20" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.name")}</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder={t("contact.form.name.placeholder")} />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.email")}</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder={t("contact.form.email.placeholder")} />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.phone")}</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder={t("contact.form.phone.placeholder")} />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.eventType")}</label>
                <input type="text" required value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder={t("contact.form.eventType.placeholder")} />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.date")}</label>
                <input type="date" min={minDate} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.location")}</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder={t("contact.form.location.placeholder")} />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.guests")}</label>
                <input type="text" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder={t("contact.form.guests.placeholder")} />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.budget")}</label>
                <input type="text" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50" placeholder={t("contact.form.budget.placeholder")} />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{t("contact.form.message")}</label>
              <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-accent/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm bg-secondary/50 resize-none" placeholder={t("contact.form.message.placeholder")} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 ${
                  status === "sending" ? "opacity-75 cursor-not-allowed" : ""
                }`}
                style={{ background: "var(--gold-gradient)" }}
              >
                <Send className={`w-4 h-4 ${status === "sending" ? "animate-pulse" : ""}`} />
                {status === "sending" ? t("contact.feedback.sending") : t("contact.form.submit")}
              </button>

              {status === "success" && (
                <p className="text-sm font-medium text-emerald-600 transition-all duration-300">
                  {t("contact.feedback.success")}
                </p>
              )}

              {status === "error" && (
                <p className="text-sm font-medium text-rose-600 transition-all duration-300">
                  {errorMessage}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
