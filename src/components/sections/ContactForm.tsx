"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/data/portfolio-content";
import { Button } from "@/components/ui/Button";
import { OriginButton } from "@/components/ui/origin-button";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const { eyebrow, title, description, email, info } = PORTFOLIO_CONTENT.contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Business & Portfolio Website",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "Business & Portfolio Website",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try emailing directly."
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        "Network connection error. You can email directly at " + email
      );
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col gap-6 pt-10 pb-16 scroll-mt-8"
      aria-label="Contact Channel"
    >
      {/* Section Header */}
      <div className="border-b border-zinc-200 dark:border-[#222533] pb-4 transition-colors duration-250">
        <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED] dark:text-[#A855F7] uppercase tracking-wider mb-1">
          <Mail className="w-3.5 h-3.5" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] tracking-tight transition-colors duration-250">
          {title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mt-2 leading-relaxed transition-colors duration-250 font-medium">
          {description}
        </p>
      </div>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Information Card */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#222533] flex flex-col justify-between gap-6 relative overflow-hidden shadow-sm transition-colors duration-250">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-xs text-[#10B981] font-mono bg-emerald-50 dark:bg-[#10B981]/10 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-[#10B981]/20">
              <span className="w-2 h-2 rounded-full bg-[#10B981] status-dot-pulse" />
              <span className="font-semibold">{PORTFOLIO_CONTENT.site.availability}</span>
            </div>

            <div className="space-y-3 pt-2 text-xs text-zinc-700 dark:text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-[#F9FAFB]">Location</div>
                  <div>{info.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-[#F9FAFB]">Turnaround</div>
                  <div>{info.turnaround}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#7C3AED] dark:text-[#A855F7] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-[#F9FAFB]">Direct Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-purple-700 dark:text-[#C4B5FD] font-semibold hover:underline"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-[#F9FAFB]">
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A855F7]" />
              <span>Direct Email Client</span>
            </div>
            <p className="text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Prefer to send directly from your mail app? Click below to start an email thread.
            </p>
            <a
              href={`mailto:${email}?subject=Website%20Project%20Inquiry`}
              className="inline-flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium bg-white dark:bg-[#13141C] text-zinc-800 dark:text-[#F9FAFB] hover:border-purple-400 dark:hover:border-[#7C3AED]/40 border border-zinc-200 dark:border-[#222533] transition-colors shadow-xs"
            >
              <span>Compose Email Directly</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED] dark:text-[#A855F7]" />
            </a>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border bg-white dark:bg-[#13141C] border-zinc-200 dark:border-[#222533] shadow-sm transition-colors duration-250">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-[#10B981]/15 text-[#10B981] flex items-center justify-center border border-emerald-200 dark:border-[#10B981]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)]">
                Message Received!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#9CA3AF] max-w-md leading-relaxed">
                Thank you for reaching out. Habib has received your message and will reply to your email within 24 hours with a clear plan and price.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setStatus("idle")}
                className="mt-2"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-zinc-800 dark:text-[#F9FAFB]"
                  >
                    Your Name <span className="text-[#7C3AED] dark:text-[#A855F7]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-sm text-zinc-900 dark:text-[#F9FAFB] placeholder-zinc-400 dark:placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-zinc-800 dark:text-[#F9FAFB]"
                  >
                    Email Address <span className="text-[#7C3AED] dark:text-[#A855F7]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-sm text-zinc-900 dark:text-[#F9FAFB] placeholder-zinc-400 dark:placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subject"
                  className="text-xs font-medium text-zinc-800 dark:text-[#F9FAFB]"
                >
                  What do you need?
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-sm text-zinc-900 dark:text-[#F9FAFB] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
                >
                  <option value="Business & Portfolio Website">
                    Business &amp; Portfolio Website
                  </option>
                  <option value="Landing Page">
                    Landing Page
                  </option>
                  <option value="Full-Stack Web App">
                    Full-Stack Web App
                  </option>
                  <option value="Custom AI Prompt System">
                    Custom AI Prompt System
                  </option>
                  <option value="Other / General Inquiry">
                    Other / General Inquiry
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-zinc-800 dark:text-[#F9FAFB]"
                >
                  Project Details / Message <span className="text-[#7C3AED] dark:text-[#A855F7]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me what you need, your ideal timeline, and any links or ideas you have..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-sm text-zinc-900 dark:text-[#F9FAFB] placeholder-zinc-400 dark:placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all resize-y"
                />
              </div>

              {/* Privacy Notice */}
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-[#6B7280] py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>
                  {info.privacy}
                </span>
              </div>

              <OriginButton
                variant="primary"
                size="md"
                type="submit"
                loading={status === "loading"}
                disabled={status === "loading"}
                className="w-full sm:w-auto self-end gap-2 shadow-sm hover:shadow-[0_0_25px_rgba(124,58,237,0.35)]"
              >
                {status === "loading" ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message →</span>
                  </>
                )}
              </OriginButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
