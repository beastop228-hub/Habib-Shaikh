"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Compass,
} from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { OriginButton } from "@/components/ui/origin-button";
import { Button } from "@/components/ui/Button";

interface ContactWithGlobeProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

const MUMBAI_COORDS: [number, number] = [72.8777, 19.0760]; // [longitude, latitude]

export function InteractiveGlobe({
  autoRotate = true,
  autoRotateSpeed = 0.35,
}: {
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [worldData, setWorldData] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Rotation state: [yaw (longitude), pitch (latitude), roll]
  const rotationRef = useRef<[number, number, number]>([-MUMBAI_COORDS[0], -MUMBAI_COORDS[1], 0]);
  const animationFrameId = useRef<number | null>(null);

  // Fetch world atlas TopoJSON (local file first, fallback to CDN)
  useEffect(() => {
    let isMounted = true;

    async function loadWorldData() {
      try {
        const res = await fetch("/data/countries-110m.json");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setWorldData(data);
          return;
        }
      } catch (_) {
        // Fallback to CDN
      }

      try {
        const cdnRes = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        if (cdnRes.ok) {
          const data = await cdnRes.json();
          if (isMounted) setWorldData(data);
        }
      } catch (err) {
        console.error("Failed to load globe data", err);
      }
    }

    loadWorldData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Center on Mumbai
  const handleReset = useCallback(() => {
    rotationRef.current = [-MUMBAI_COORDS[0], -MUMBAI_COORDS[1], 0];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !worldData) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Retina DPR scaling
    const dpr = window.devicePixelRatio || 1;
    const width = 320;
    const height = 320;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const radius = width / 2 - 12;

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = d3.geoPath(projection, context);
    const graticule = d3.geoGraticule10();
    const land = topojson.feature(worldData, worldData.objects.land as any);

    // D3 Drag handling
    const dragBehavior = d3
      .drag<HTMLCanvasElement, unknown>()
      .on("start", () => {
        setIsDragging(true);
      })
      .on("drag", (event) => {
        const k = 75 / projection.scale();
        const r = rotationRef.current;
        rotationRef.current = [
          r[0] + event.dx * k,
          Math.max(-60, Math.min(60, r[1] - event.dy * k)),
          r[2],
        ];
      })
      .on("end", () => {
        setIsDragging(false);
      });

    d3.select(canvas).call(dragBehavior);

    let pulseTime = 0;

    const render = () => {
      context.save();
      context.scale(dpr, dpr);
      context.clearRect(0, 0, width, height);

      // Auto rotation when not dragging
      if (autoRotate && !isDragging) {
        rotationRef.current[0] += autoRotateSpeed;
      }

      projection.rotate(rotationRef.current);

      // Palette tokens
      const strokeColor = isDark ? "rgba(168, 85, 247, 0.45)" : "rgba(124, 58, 237, 0.4)";
      const landFill = isDark ? "rgba(124, 58, 237, 0.16)" : "rgba(124, 58, 237, 0.1)";
      const graticuleColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
      const sphereBgStart = isDark ? "#1A1528" : "#F5F3FF";
      const sphereBgEnd = isDark ? "#0F1017" : "#EAE6FD";

      // 1. Render Globe Sphere (Ocean background)
      const grad = context.createRadialGradient(
        width / 2 - 20,
        height / 2 - 20,
        radius * 0.1,
        width / 2,
        height / 2,
        radius
      );
      grad.addColorStop(0, sphereBgStart);
      grad.addColorStop(1, sphereBgEnd);

      context.beginPath();
      context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
      context.fillStyle = grad;
      context.fill();

      // Sphere Outer Rim Shadow
      context.lineWidth = 1.5;
      context.strokeStyle = isDark ? "rgba(168, 85, 247, 0.3)" : "rgba(124, 58, 237, 0.25)";
      context.stroke();

      // 2. Render Graticules
      context.beginPath();
      path(graticule);
      context.lineWidth = 0.5;
      context.strokeStyle = graticuleColor;
      context.stroke();

      // 3. Render Land Geometries
      context.beginPath();
      path(land);
      context.fillStyle = landFill;
      context.fill();
      context.lineWidth = 0.8;
      context.strokeStyle = strokeColor;
      context.stroke();

      // 4. Render Mumbai Pin & Glowing Ring
      const rot = rotationRef.current;
      const centerCoord: [number, number] = [-rot[0], -rot[1]];
      const dist = d3.geoDistance(MUMBAI_COORDS, centerCoord);

      // Visible only on front hemisphere (distance < π/2)
      if (dist < Math.PI / 2) {
        const projected = projection(MUMBAI_COORDS);
        if (projected) {
          const [px, py] = projected;
          pulseTime += 0.04;

          // Animated pulse waves
          const pulseRadius1 = 5 + (Math.sin(pulseTime) + 1) * 4;
          const pulseAlpha1 = Math.max(0, 0.8 - (pulseRadius1 - 5) / 8);

          context.beginPath();
          context.arc(px, py, pulseRadius1, 0, 2 * Math.PI);
          context.strokeStyle = `rgba(168, 85, 247, ${pulseAlpha1})`;
          context.lineWidth = 1.5;
          context.stroke();

          // Core indicator dot
          context.beginPath();
          context.arc(px, py, 3.5, 0, 2 * Math.PI);
          context.fillStyle = "#A855F7";
          context.fill();

          context.beginPath();
          context.arc(px, py, 1.5, 0, 2 * Math.PI);
          context.fillStyle = "#FFFFFF";
          context.fill();

          // Small tag label
          const tagX = px + 8;
          const tagY = py - 8;
          context.font = "bold 9px monospace";
          context.fillStyle = isDark ? "#E9D5FF" : "#6B21A8";
          context.fillText("Mumbai (HQ)", tagX, tagY);
        }
      }

      context.restore();
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [worldData, autoRotate, autoRotateSpeed, isDark, isDragging]);

  return (
    <div
      className="relative flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-50/50 dark:bg-[#13141C]/60 border border-zinc-200/80 dark:border-[#222533] overflow-hidden group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glow behind globe */}
      <div className="absolute inset-0 bg-radial from-purple-500/10 dark:from-purple-600/15 to-transparent blur-2xl pointer-events-none" />

      {/* Top Status Banner */}
      <div className="w-full flex items-center justify-between text-xs mb-2 z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live HQ • Mumbai, India</span>
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg bg-white dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors shadow-xs cursor-pointer"
          title="Reset View to Mumbai"
          aria-label="Reset View to Mumbai"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive 3D Canvas */}
      <div className="relative cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="block rounded-full shadow-lg shadow-purple-950/10" />

        {/* Drag Hint Overlay */}
        <div
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/60 dark:bg-[#0B0C10]/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 pointer-events-none transition-opacity duration-300 flex items-center gap-1.5 ${
            isHovered && !isDragging ? "opacity-100" : "opacity-0"
          }`}
        >
          <Compass className="w-3 h-3 text-[#A855F7]" />
          <span>Drag to explore</span>
        </div>
      </div>
    </div>
  );
}

export function ContactWithGlobe({
  subtitle = "CONTACT",
  title = "Let's build something great together.",
  description = "Have a website in mind? Tell me what you need and I'll reply within 24 hours with a clear plan and price.",
}: ContactWithGlobeProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Business & Portfolio Website",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        projectScope: formData.subject,
        message: formData.message,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        setErrorMessage(data.error || "Something went wrong. Please email directly.");
      }
    } catch (_) {
      setStatus("error");
      setErrorMessage("Network connection error. You can email directly at habibshaikhbtw100@gmail.com");
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col gap-6 pt-10 pb-16 scroll-mt-8 relative"
      aria-label="Contact Section"
    >
      {/* Section Header */}
      <div className="border-b border-zinc-200 dark:border-[#222533] pb-4 transition-colors duration-250">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
          <Mail className="w-3.5 h-3.5" />
          <span>{subtitle}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)] tracking-tight transition-colors duration-250">
          {title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mt-2 leading-relaxed transition-colors duration-250 font-medium">
          {description}
        </p>
      </div>

      {/* Main Grid: Info + 3D Globe (Col 5) & Interactive Form (Col 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Identity & Globe Card */}
        <div className="lg:col-span-5 rounded-2xl p-6 border bg-white/80 dark:bg-[#13141C]/90 border-zinc-200 dark:border-[#222533] backdrop-blur-xl flex flex-col gap-5 relative overflow-hidden shadow-sm transition-colors duration-250">
          <div className="space-y-4">
            {/* Direct Information Details */}
            <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7C3AED] dark:text-[#A855F7] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-[#F9FAFB]">Location</div>
                  <div>Mumbai, Maharashtra, India (UTC+5:30)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-[#F9FAFB]">Turnaround</div>
                  <div>Usually replies within 12–24 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#7C3AED] dark:text-[#A855F7] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-[#F9FAFB]">Direct Email</div>
                  <a
                    href="mailto:habibshaikhbtw100@gmail.com"
                    className="text-purple-700 dark:text-[#C4B5FD] font-semibold hover:underline"
                  >
                    habibshaikhbtw100@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Radix UI Separator */}
          <SeparatorPrimitive.Root
            orientation="horizontal"
            className="h-[1px] w-full bg-zinc-200 dark:border-[#222533] bg-zinc-200 dark:bg-[#222533] my-1"
          />

          {/* Interactive D3 3D Globe */}
          <InteractiveGlobe autoRotate={true} autoRotateSpeed={0.35} />
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 border bg-white/80 dark:bg-[#13141C]/90 border-zinc-200 dark:border-[#222533] backdrop-blur-xl shadow-sm transition-colors duration-250">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-[#10B981]/15 text-[#10B981] flex items-center justify-center border border-emerald-200 dark:border-[#10B981]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-[#F9FAFB] font-[family-name:var(--font-jakarta)]">
                Message Dispatched!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                Thank you for reaching out. Habib has received your project details and will reply within 24 hours with a clear plan and price.
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
                    htmlFor="globe-name"
                    className="text-xs font-medium text-zinc-800 dark:text-[#F9FAFB]"
                  >
                    Full Name <span className="text-[#7C3AED] dark:text-[#A855F7]">*</span>
                  </label>
                  <input
                    id="globe-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="globe-email"
                    className="text-xs font-medium text-zinc-800 dark:text-[#F9FAFB]"
                  >
                    Email Address <span className="text-[#7C3AED] dark:text-[#A855F7]">*</span>
                  </label>
                  <input
                    id="globe-email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="globe-subject"
                  className="text-xs font-medium text-zinc-800 dark:text-[#F9FAFB]"
                >
                  Project Scope / What do you need?
                </label>
                <select
                  id="globe-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="Business & Portfolio Website">Business &amp; Portfolio Website</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Full-Stack Web App">Full-Stack Web App</option>
                  <option value="Custom AI Prompt System">Custom AI Prompt System</option>
                  <option value="Other / General Inquiry">Other / General Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="globe-message"
                  className="text-xs font-medium text-zinc-800 dark:text-[#F9FAFB]"
                >
                  Project Details / Message <span className="text-[#7C3AED] dark:text-[#A855F7]">*</span>
                </label>
                <textarea
                  id="globe-message"
                  required
                  rows={4}
                  placeholder="Tell me what you need, your ideal timeline, and any links or ideas you have..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#1A1C26] border border-zinc-200 dark:border-[#222533] text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-y"
                />
              </div>

              {/* Privacy Notice */}
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-[#6B7280] py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>Your details are used only to reply to your message. No spam, no sharing.</span>
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

export default ContactWithGlobe;
