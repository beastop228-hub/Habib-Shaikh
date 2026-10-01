"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Layers,
  Eye,
  Crosshair,
  RotateCw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  Cpu,
  FileCode2,
  Video,
  Sparkles,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Activity,
  Terminal,
} from "lucide-react";

// --- Types & Interfaces ---
export type FactoryMode = "Assembled" | "Cutaway" | "Stations";

export interface StationData {
  id: string;
  index: number;
  name: string;
  category: string;
  tagline: string;
  icon: React.ElementType;
  position: [number, number, number];
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  role: string;
  agent: string;
  throughput: string;
  latency: string;
  accuracy: string;
  status: "ONLINE" | "PROCESSING" | "OPTIMIZED";
  description: string;
}

export interface AgenticFactory3DProps {
  embed?: boolean;
  height?: string | number;
  className?: string;
}

// 5 Industrial Agentic Pipeline Stations
const STATIONS: StationData[] = [
  {
    id: "order",
    index: 1,
    name: "Order Intake",
    category: "INGESTION & INTENT",
    tagline: "Autonomous Scope Parsing & Token Allocation",
    icon: Cpu,
    position: [-11, 0, 0],
    cameraPos: [-11, 4.2, 7.8],
    targetPos: [-11, 1.2, 0],
    role: "Multimodal spec deconstruction, user intent tokenization, and architecture routing",
    agent: "Claude 3.7 Sonnet & GPT-4o Ingestion Agent",
    throughput: "2.4M tok/min",
    latency: "18ms",
    accuracy: "99.8%",
    status: "PROCESSING",
    description: "High-throughput intake chamber. High-speed laser scanners verify client requirements, allocate vector budget, and establish deterministic execution DAGs.",
  },
  {
    id: "script",
    index: 2,
    name: "Script & Logic",
    category: "REASONING MATRIX",
    tagline: "Recursive Code Synthesis & Logic Proofs",
    icon: FileCode2,
    position: [-5.5, 0, 1.2],
    cameraPos: [-5.5, 4.0, 7.5],
    targetPos: [-5.5, 1.4, 1.2],
    role: "Full-stack code generation, dependency tree resolution, and zero-shot test synthesis",
    agent: "DeepSeek-R1 & Qwen-2.5 Coder Cluster",
    throughput: "148 files/sec",
    latency: "32ms",
    accuracy: "99.4%",
    status: "OPTIMIZED",
    description: "Multi-tiered dual computing tower. Executes AST parsing, static analysis, and automated invariant verification before code commits to memory.",
  },
  {
    id: "video",
    index: 3,
    name: "Video & Asset Forge",
    category: "GENERATIVE CORE",
    tagline: "High-Fidelity Rendering & UI Compositing",
    icon: Video,
    position: [0, 0, 0],
    cameraPos: [0, 4.6, 8.4],
    targetPos: [0, 1.8, 0],
    role: "Three.js WebGL procedural synthesis, Tailwind styling, and 60fps UI compilation",
    agent: "Flux 1.1 Pro & ComfyUI Realtime Core",
    throughput: "60 FPS Render",
    latency: "45ms",
    accuracy: "99.9%",
    status: "ONLINE",
    description: "Central gyroscopic fusion core. High-energy magnetic gimbal rings accelerate vector embeddings into interactive 3D assets and photorealistic UI elements.",
  },
  {
    id: "post",
    index: 4,
    name: "Post & State Store",
    category: "MEMORY & CACHE",
    tagline: "Vector Database & Telemetry Indexing",
    icon: Sparkles,
    position: [5.5, 0, 1.2],
    cameraPos: [5.5, 4.2, 7.5],
    targetPos: [5.5, 1.4, 1.2],
    role: "PostgreSQL state sync, Pinecone embedding indexing, and telemetry tracing",
    agent: "pgvector & Redis Edge Cache Daemon",
    throughput: "12.8k QPS",
    latency: "4ms",
    accuracy: "100%",
    status: "ONLINE",
    description: "Twin server blade monolith with vertical cryo-cooling conduits. Persists transactional logs, dynamic session states, and embeddings with instant recovery.",
  },
  {
    id: "payment",
    index: 5,
    name: "Payment & Deploy",
    category: "ESCROW & PRODUCTION",
    tagline: "Cryptographic Settlement & Zero-Downtime Launch",
    icon: CreditCard,
    position: [11, 0, 0],
    cameraPos: [11, 4.2, 7.8],
    targetPos: [11, 1.2, 0],
    role: "Stripe Escrow validation, automated SSL provisioning, and Vercel edge deployment",
    agent: "Smart Contract & Edge Release Bot",
    throughput: "Sub-sec Deploy",
    latency: "12ms",
    accuracy: "100%",
    status: "OPTIMIZED",
    description: "Final quality assurance and automated delivery portal. Features scanning verification arch, cryptographic seal stamp, and direct CDN egress.",
  },
];

export function AgenticFactory3D({
  embed = false,
  height = "100%",
  className = "",
}: AgenticFactory3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // User Interactive State
  const [activeMode, setActiveMode] = useState<FactoryMode>("Assembled");
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [fpsMetric, setFpsMetric] = useState<number>(60);

  // References for Three.js control & interpolation
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 13, 24));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));

  // Mutable cutaway interpolation value (0 = assembled, 1 = full cutaway)
  const cutawayFactorRef = useRef<number>(0);
  const targetCutawayFactorRef = useRef<number>(0);

  // Active mode ref for animation loop
  const modeRef = useRef<FactoryMode>("Assembled");
  useEffect(() => {
    modeRef.current = activeMode;
    if (activeMode === "Assembled") {
      targetCutawayFactorRef.current = 0;
      targetCamPos.current.set(0, 13, 24);
      targetLookAt.current.set(0, 1, 0);
    } else if (activeMode === "Cutaway") {
      targetCutawayFactorRef.current = 1;
      targetCamPos.current.set(0, 11, 20);
      targetLookAt.current.set(0, 1.2, 0);
    } else if (activeMode === "Stations") {
      targetCutawayFactorRef.current = 0.5;
      const st = STATIONS[activeStationIndex];
      targetCamPos.current.set(...st.cameraPos);
      targetLookAt.current.set(...st.targetPos);
    }
  }, [activeMode, activeStationIndex]);

  // Camera presets
  const handleSetCameraPreset = useCallback((preset: "ISO" | "FRONT" | "TOP" | "STATION") => {
    setAutoRotate(false);
    if (preset === "ISO") {
      targetCamPos.current.set(16, 14, 18);
      targetLookAt.current.set(0, 1, 0);
    } else if (preset === "FRONT") {
      targetCamPos.current.set(0, 4, 22);
      targetLookAt.current.set(0, 1.5, 0);
    } else if (preset === "TOP") {
      targetCamPos.current.set(0, 26, 0.1);
      targetLookAt.current.set(0, 0, 0);
    } else if (preset === "STATION") {
      const st = STATIONS[activeStationIndex];
      targetCamPos.current.set(...st.cameraPos);
      targetLookAt.current.set(...st.targetPos);
    }
  }, [activeStationIndex]);

  const handleSelectStation = useCallback((index: number) => {
    setActiveStationIndex(index);
    setActiveMode("Stations");
    setAutoRotate(false);
    const st = STATIONS[index];
    targetCamPos.current.set(...st.cameraPos);
    targetLookAt.current.set(...st.targetPos);
  }, []);

  const handleResetView = useCallback(() => {
    setActiveMode("Assembled");
    setAutoRotate(true);
    targetCamPos.current.set(0, 13, 24);
    targetLookAt.current.set(0, 1, 0);
  }, []);

  // Main Three.js Scene Setup & Lifecycle
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // --- 1. Scene, Camera, WebGLRenderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const width = container.clientWidth || 1200;
    const heightPx = container.clientHeight || 800;

    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.1, 120);
    camera.position.set(0, 13, 24);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // --- 2. Orbit Controls ---
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.02; // Do not dip below ground
    controls.minDistance = 4;
    controls.maxDistance = 45;
    controls.target.set(0, 1, 0);
    controlsRef.current = controls;

    // When embed mode is explicitly false, scroll-to-zoom is enabled
    controls.enableZoom = !embed;

    // --- 3. Lighting Architecture ---
    const ambientLight = new THREE.AmbientLight(0x181424, 1.6);
    scene.add(ambientLight);

    // Primary High Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(16, 25, 18);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 60;
    keyLight.shadow.camera.left = -20;
    keyLight.shadow.camera.right = 20;
    keyLight.shadow.camera.top = 20;
    keyLight.shadow.camera.bottom = -20;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Deep Purple Rim & Fill Lights (Swapped from Orange to Portfolio Brand Purple 0xa855f7)
    const purpleFillLight = new THREE.DirectionalLight(0xa855f7, 1.8);
    purpleFillLight.position.set(-16, 12, -10);
    scene.add(purpleFillLight);

    const purpleSpotLight = new THREE.SpotLight(0xa855f7, 5.0, 40, Math.PI / 4, 0.8, 1.5);
    purpleSpotLight.position.set(0, 16, 6);
    purpleSpotLight.target.position.set(0, 1, 0);
    scene.add(purpleSpotLight);
    scene.add(purpleSpotLight.target);

    const stationLightOrder = new THREE.PointLight(0xa855f7, 2.2, 14);
    stationLightOrder.position.set(-11, 3.5, 1);
    scene.add(stationLightOrder);

    const stationLightPost = new THREE.PointLight(0xa855f7, 2.2, 14);
    stationLightPost.position.set(5.5, 3.5, 1);
    scene.add(stationLightPost);

    const stationLightGreen = new THREE.PointLight(0x10b981, 2.0, 12);
    stationLightGreen.position.set(11, 3, 1);
    scene.add(stationLightGreen);

    // Ground Cyber Underglow
    const underGlow = new THREE.PointLight(0x7c3aed, 3.0, 25);
    underGlow.position.set(0, -0.4, 0);
    scene.add(underGlow);

    // --- 4. Curated Materials Palette (Brand Purple 0xa855f7) ---
    const darkChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0e1017,
      metalness: 0.88,
      roughness: 0.22,
    });

    const brushedTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1f2230,
      metalness: 0.82,
      roughness: 0.28,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.98,
      roughness: 0.08,
    });

    const brassGearsMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      metalness: 0.85,
      roughness: 0.25,
    });

    // Swapped Orange materials to Portfolio Brand Purple 0xa855f7
    const purpleAccentMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.5,
      metalness: 0.6,
      roughness: 0.25,
    });

    const glowPurpleSolidMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 1.4,
    });

    const glowCyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
    });

    const glowEmeraldMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 1.0,
    });

    // Outer Assembled Casing Shell Materials
    const shellOpaqueMat = new THREE.MeshStandardMaterial({
      color: 0x161824,
      metalness: 0.75,
      roughness: 0.32,
      transparent: true,
      opacity: 1.0,
    });

    const shellGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x24143a,
      transmission: 0.85,
      opacity: 0.55,
      transparent: true,
      roughness: 0.1,
      reflectivity: 0.8,
    });

    const rubberConveyorMat = new THREE.MeshStandardMaterial({
      color: 0x181920,
      roughness: 0.85,
      metalness: 0.1,
    });

    // --- PROCEDURAL CANVAS TEXTURE GENERATION ---
    // Helper: generate a 2D canvas texture, returns a THREE.CanvasTexture
    const createCanvasTexture = (width: number, height: number, drawFn: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = width;
      offCanvas.height = height;
      const ctx = offCanvas.getContext("2d")!;
      drawFn(ctx);
      const tex = new THREE.CanvasTexture(offCanvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      return tex;
    };

    // 6 distinct platform packet face textures for the conveyor cargo
    interface PlatformPacketDef {
      name: string;
      monogram: string;
      badgeColor: string;
      subtext: string;
    }
    const platformPacketDefs: PlatformPacketDef[] = [
      { name: "Upwork", monogram: "Up", badgeColor: "#14A800", subtext: "Direct Contract" },
      { name: "Fiverr", monogram: "Fi", badgeColor: "#1DBF73", subtext: "Pro Web Project" },
      { name: "Freelancer", monogram: "Fl", badgeColor: "#29B2FE", subtext: "Verified Milestone" },
      { name: "LinkedIn", monogram: "in", badgeColor: "#0A66C2", subtext: "Enterprise Inbound" },
      { name: "Toptal", monogram: "Tt", badgeColor: "#204ECF", subtext: "Core Architecture" },
      { name: "Remote OK", monogram: "RO", badgeColor: "#8B5CF6", subtext: "Remote Contract" },
    ];

    const packetTextures = platformPacketDefs.map((def) =>
      createCanvasTexture(256, 256, (ctx) => {
        // Card body
        ctx.fillStyle = "#0e1017";
        ctx.fillRect(0, 0, 256, 256);
        // Subtle border
        ctx.strokeStyle = "#a855f740";
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, 252, 252);
        // Top accent bar
        ctx.fillStyle = def.badgeColor;
        ctx.fillRect(0, 0, 256, 6);
        // Circular badge
        ctx.beginPath();
        ctx.arc(128, 88, 42, 0, Math.PI * 2);
        ctx.fillStyle = def.badgeColor;
        ctx.fill();
        // Monogram text in badge
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(def.monogram, 128, 90);
        // Platform name
        ctx.fillStyle = "#e4e4e7";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText(def.name, 128, 158);
        // Subtext
        ctx.fillStyle = "#a1a1aa";
        ctx.font = "14px monospace";
        ctx.fillText(def.subtext, 128, 186);
        // Bottom status dot and label
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.arc(98, 220, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#71717a";
        ctx.font = "12px monospace";
        ctx.fillText("ACTIVE", 136, 224);
      })
    );

    // Packet face materials (one per platform)
    const packetFaceMaterials = packetTextures.map(
      (tex) => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, metalness: 0.3 })
    );

    // Station 2 (Script & Logic) — Main monitor: Code Synthesis Pipeline
    const st2MonitorTex = createCanvasTexture(512, 320, (ctx) => {
      ctx.fillStyle = "#0c0c14";
      ctx.fillRect(0, 0, 512, 320);
      // Header bar
      ctx.fillStyle = "#a855f7";
      ctx.fillRect(0, 0, 512, 5);
      // Title
      ctx.fillStyle = "#a855f7";
      ctx.font = "bold 18px monospace";
      ctx.textAlign = "left";
      ctx.fillText("CODE SYNTHESIS PIPELINE", 20, 36);
      ctx.fillStyle = "#71717a";
      ctx.font = "12px monospace";
      ctx.fillText("Active Build Queue", 20, 56);
      // Queue items
      const items = [
        { dot: "#14A800", text: "Upwork — Next.js Full-Stack App", status: "COMPILING" },
        { dot: "#1DBF73", text: "Fiverr — AI Web Architecture", status: "TYPE-CHECK" },
        { dot: "#0A66C2", text: "LinkedIn — Landing Page System", status: "BUNDLING" },
        { dot: "#204ECF", text: "Toptal — Enterprise Dashboard", status: "QUEUED" },
      ];
      items.forEach((item, i) => {
        const y = 90 + i * 48;
        // Status dot
        ctx.fillStyle = item.dot;
        ctx.beginPath();
        ctx.arc(32, y, 6, 0, Math.PI * 2);
        ctx.fill();
        // Text
        ctx.fillStyle = "#e4e4e7";
        ctx.font = "14px sans-serif";
        ctx.fillText(item.text, 50, y + 5);
        // Status badge
        ctx.fillStyle = "#27272a";
        ctx.fillRect(380, y - 10, 110, 22);
        ctx.fillStyle = "#a855f7";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(item.status, 435, y + 5);
        ctx.textAlign = "left";
      });
      // Bottom metrics bar
      ctx.fillStyle = "#1a1a24";
      ctx.fillRect(0, 286, 512, 34);
      ctx.fillStyle = "#52525b";
      ctx.font = "11px monospace";
      ctx.fillText("148 files/sec • 99.4% syntax accuracy • 0 type errors", 20, 308);
    });
    const st2MonitorMat = new THREE.MeshStandardMaterial({ map: st2MonitorTex, roughness: 0.3, metalness: 0.2 });

    // Station 4 (Post & State Store) — Incoming Orders Monitor
    const st4MonitorTex = createCanvasTexture(256, 384, (ctx) => {
      ctx.fillStyle = "#0a0b12";
      ctx.fillRect(0, 0, 256, 384);
      // Top accent
      ctx.fillStyle = "#a855f7";
      ctx.fillRect(0, 0, 256, 5);
      // Title
      ctx.fillStyle = "#a855f7";
      ctx.font = "bold 15px monospace";
      ctx.textAlign = "center";
      ctx.fillText("PLATFORM PIPELINE", 128, 30);
      ctx.fillStyle = "#71717a";
      ctx.font = "11px monospace";
      ctx.fillText("Active Global Feeds", 128, 50);
      // Divider
      ctx.fillStyle = "#27272a";
      ctx.fillRect(16, 62, 224, 1);
      // Order list
      const orders = [
        { badge: "#14A800", platform: "Upwork", project: "Next.js App", status: "In Progress" },
        { badge: "#1DBF73", platform: "Fiverr Pro", project: "AI Web Arch", status: "Rendering" },
        { badge: "#0A66C2", platform: "LinkedIn", project: "Landing Page", status: "Ready" },
        { badge: "#29B2FE", platform: "Freelancer", project: "UI Redesign", status: "Queued" },
        { badge: "#8B5CF6", platform: "Wellfound", project: "MVP Build", status: "Pending" },
      ];
      orders.forEach((order, i) => {
        const y = 82 + i * 56;
        // Badge circle
        ctx.fillStyle = order.badge;
        ctx.beginPath();
        ctx.arc(32, y + 14, 10, 0, Math.PI * 2);
        ctx.fill();
        // Monogram inside badge
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(order.platform.substring(0, 2), 32, y + 18);
        // Platform name
        ctx.textAlign = "left";
        ctx.fillStyle = "#e4e4e7";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(order.platform, 52, y + 10);
        // Project name
        ctx.fillStyle = "#a1a1aa";
        ctx.font = "11px monospace";
        ctx.fillText(order.project, 52, y + 26);
        // Status
        ctx.fillStyle = order.status === "In Progress" ? "#10b981" : order.status === "Rendering" ? "#a855f7" : "#52525b";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "right";
        ctx.fillText(order.status, 240, y + 18);
        ctx.textAlign = "left";
        // Divider
        ctx.fillStyle = "#1c1c26";
        ctx.fillRect(20, y + 42, 216, 1);
      });
    });
    const st4MonitorMat = new THREE.MeshStandardMaterial({ map: st4MonitorTex, roughness: 0.3, metalness: 0.2 });

    // Station 5 (Checkout) — Escrow Settlement & Receipt Screen
    const st5ReceiptTex = createCanvasTexture(256, 256, (ctx) => {
      ctx.fillStyle = "#070a0d";
      ctx.fillRect(0, 0, 256, 256);
      // Top bar emerald
      ctx.fillStyle = "#10b981";
      ctx.fillRect(0, 0, 256, 6);
      // Large check icon
      ctx.fillStyle = "#10b981";
      ctx.font = "48px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✓", 128, 60);
      // Title
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 14px monospace";
      ctx.fillText("PAYMENT ESCROW", 128, 92);
      ctx.fillText("RELEASED", 128, 112);
      // Divider
      ctx.fillStyle = "#27272a";
      ctx.fillRect(40, 126, 176, 1);
      // Details
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "11px monospace";
      ctx.fillText("Verified via Upwork", 128, 148);
      ctx.fillText("/ Direct Stripe", 128, 164);
      // Receipt line
      ctx.fillStyle = "#52525b";
      ctx.fillRect(30, 180, 196, 1);
      ctx.fillStyle = "#e4e4e7";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("Habib Web Studio", 128, 202);
      ctx.fillStyle = "#71717a";
      ctx.font = "10px monospace";
      ctx.fillText("Platform Order Verified", 128, 220);
      // Bottom bar
      ctx.fillStyle = "#0f1f17";
      ctx.fillRect(0, 238, 256, 18);
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 9px monospace";
      ctx.fillText("100% ENCRYPTED • INSTANT SETTLE", 128, 250);
    });
    const st5ReceiptMat = new THREE.MeshStandardMaterial({ map: st5ReceiptTex, roughness: 0.3, metalness: 0.2 });

    // --- 5. Base Platform & Machine Architecture Bed ---
    const machineRoot = new THREE.Group();
    scene.add(machineRoot);

    // Cast-iron Substructure Foundation Bed
    const bedGeo = new THREE.BoxGeometry(34, 0.7, 12);
    const machineBed = new THREE.Mesh(bedGeo, darkChassisMat);
    machineBed.position.y = -0.35;
    machineBed.receiveShadow = true;
    machineRoot.add(machineBed);

    // Platform Bevel Trim in Brand Purple 0xa855f7
    const bedTrimGeo = new THREE.BoxGeometry(34.2, 0.1, 12.2);
    const bedTrim = new THREE.Mesh(bedTrimGeo, purpleAccentMat);
    bedTrim.position.y = 0.02;
    machineRoot.add(bedTrim);

    // Infinite Dark Grid on ground
    const grid = new THREE.GridHelper(40, 40, 0xa855f7, 0x1a1c28);
    grid.position.y = 0.01;
    scene.add(grid);

    // Dual Linear Heavy Guide Tracks with Chrome Rails
    for (const zOffset of [-2.8, 2.8]) {
      const railBase = new THREE.Mesh(new THREE.BoxGeometry(32, 0.18, 0.35), darkChassisMat);
      railBase.position.set(0, 0.1, zOffset);
      machineRoot.add(railBase);

      const railRod = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 32, 16), chromeMat);
      railRod.rotation.z = Math.PI / 2;
      railRod.position.set(0, 0.22, zOffset);
      machineRoot.add(railRod);

      // Embedded Glowing Neon Track Inlay (0xa855f7)
      const neonStrip = new THREE.Mesh(new THREE.BoxGeometry(31.5, 0.04, 0.08), glowPurpleSolidMat);
      neonStrip.position.set(0, 0.12, zOffset + (zOffset > 0 ? 0.22 : -0.22));
      machineRoot.add(neonStrip);
    }

    // --- 6. Central Linear Conveyor System & Rollers ---
    const conveyorGroup = new THREE.Group();
    conveyorGroup.position.set(0, 0.35, 0);
    machineRoot.add(conveyorGroup);

    const beltGeo = new THREE.BoxGeometry(30, 0.1, 1.8);
    const conveyorBelt = new THREE.Mesh(beltGeo, rubberConveyorMat);
    conveyorBelt.receiveShadow = true;
    conveyorGroup.add(conveyorBelt);

    // 24 Rotating Rollers along the conveyor length
    const rollers: THREE.Mesh[] = [];
    for (let r = 0; r < 24; r++) {
      const rollerMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.9, 12), chromeMat);
      rollerMesh.rotation.x = Math.PI / 2;
      rollerMesh.position.set(-14 + r * 1.22, -0.06, 0);
      conveyorGroup.add(rollerMesh);
      rollers.push(rollerMesh);
    }

    // --- 7. Internal Mechanical Anatomy (Revealed in CUTAWAY mode) ---
    const cutawayInternalGroup = new THREE.Group();
    machineRoot.add(cutawayInternalGroup);

    // Internal Spinning Bevel & Spur Gears with mechanical interlocking
    interface GearItem {
      mesh: THREE.Mesh;
      speed: number;
      axis: "x" | "y" | "z";
    }
    const internalGears: GearItem[] = [];

    const createIndustrialGear = (radius: number, teeth: number, depth: number, mat: THREE.Material) => {
      const group = new THREE.Group();
      // Center disc
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, teeth * 2), mat);
      disc.castShadow = true;
      group.add(disc);

      // Shaft collar
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.35, radius * 0.35, depth * 1.3, 16), chromeMat);
      group.add(hub);

      // Perimeter teeth
      const toothGeo = new THREE.BoxGeometry(radius * 0.25, depth * 0.95, radius * 0.28);
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeo, mat);
        tooth.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        tooth.rotation.y = -angle;
        group.add(tooth);
      }
      return group;
    };

    // Gear Clusters located beneath each station
    const gearConfigs = [
      { pos: [-11, 0.45, -1.2], r: 0.9, teeth: 16, speed: 1.2, axis: "y" },
      { pos: [-9.6, 0.45, -1.2], r: 0.5, teeth: 9, speed: -2.16, axis: "y" },
      { pos: [-5.5, 0.45, -1.4], r: 1.1, teeth: 20, speed: -0.9, axis: "y" },
      { pos: [-3.8, 0.45, -1.4], r: 0.6, teeth: 11, speed: 1.63, axis: "y" },
      { pos: [0, 0.45, -1.8], r: 1.3, teeth: 24, speed: 0.7, axis: "y" },
      { pos: [5.5, 0.45, -1.4], r: 0.9, teeth: 16, speed: -1.2, axis: "y" },
      { pos: [11, 0.45, -1.2], r: 0.8, teeth: 14, speed: 1.4, axis: "y" },
    ];

    gearConfigs.forEach((cfg) => {
      const gear = createIndustrialGear(cfg.r, cfg.teeth, 0.25, brassGearsMat);
      gear.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      cutawayInternalGroup.add(gear);
      internalGears.push({ mesh: gear as unknown as THREE.Mesh, speed: cfg.speed, axis: "y" });
    });

    // Hydraulic Pistons Cycling Up and Down
    interface PistonItem {
      cylinder: THREE.Mesh;
      rod: THREE.Mesh;
      baseY: number;
      offset: number;
      stroke: number;
    }
    const pistons: PistonItem[] = [];

    const createPiston = (x: number, z: number, offset: number) => {
      const baseCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 1.2, 16), darkChassisMat);
      baseCylinder.position.set(x, 0.9, z);
      baseCylinder.castShadow = true;
      cutawayInternalGroup.add(baseCylinder);

      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.4, 16), chromeMat);
      rod.position.set(x, 1.4, z);
      rod.castShadow = true;
      cutawayInternalGroup.add(rod);

      pistons.push({
        cylinder: baseCylinder,
        rod,
        baseY: 1.4,
        offset,
        stroke: 0.35,
      });
    };

    createPiston(-8.2, 0, 0);
    createPiston(-2.8, 0, Math.PI * 0.5);
    createPiston(2.8, 0, Math.PI);
    createPiston(8.2, 0, Math.PI * 1.5);

    // Glowing Fiber Optic Manifold Pulse Buses linking all stations
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-13, 0.6, -1.8),
      new THREE.Vector3(-8, 1.2, -2.2),
      new THREE.Vector3(-3, 0.8, -2.4),
      new THREE.Vector3(0, 1.5, -2.5),
      new THREE.Vector3(5, 0.9, -2.3),
      new THREE.Vector3(10, 1.3, -2.0),
      new THREE.Vector3(13, 0.6, -1.8),
    ]);
    const cableGeo = new THREE.TubeGeometry(cableCurve, 64, 0.12, 8, false);
    const cableMesh = new THREE.Mesh(cableGeo, glowPurpleSolidMat);
    cutawayInternalGroup.add(cableMesh);

    // --- 8. Exterior Shell & Cowling Panels (Controlled by ASSEMBLED vs CUTAWAY) ---
    const outerShellGroup = new THREE.Group();
    machineRoot.add(outerShellGroup);

    interface ShellPanel {
      mesh: THREE.Mesh;
      origPos: THREE.Vector3;
      explodedPos: THREE.Vector3;
      origRot: THREE.Euler;
    }
    const shellPanels: ShellPanel[] = [];

    // Left Cowling Canopy (Station 1 & 2)
    const leftCanopyGeo = new THREE.BoxGeometry(11, 2.8, 4.6);
    const leftCanopy = new THREE.Mesh(leftCanopyGeo, shellOpaqueMat);
    leftCanopy.position.set(-8.2, 2.2, 0);
    leftCanopy.castShadow = true;
    outerShellGroup.add(leftCanopy);
    shellPanels.push({
      mesh: leftCanopy,
      origPos: new THREE.Vector3(-8.2, 2.2, 0),
      explodedPos: new THREE.Vector3(-8.2, 5.8, -3.2),
      origRot: leftCanopy.rotation.clone(),
    });

    // Glass Observation Window inset on Left Canopy
    const leftWindow = new THREE.Mesh(new THREE.BoxGeometry(6.5, 1.3, 4.7), shellGlassMat);
    leftWindow.position.set(-8.2, 2.4, 0);
    outerShellGroup.add(leftWindow);
    shellPanels.push({
      mesh: leftWindow,
      origPos: new THREE.Vector3(-8.2, 2.4, 0),
      explodedPos: new THREE.Vector3(-8.2, 6.0, -3.2),
      origRot: leftWindow.rotation.clone(),
    });

    // Center Stage Aerodynamic Bonnet
    const centerBonnetGeo = new THREE.CylinderGeometry(2.4, 2.8, 1.8, 8, 1, false, 0, Math.PI);
    const centerBonnet = new THREE.Mesh(centerBonnetGeo, shellOpaqueMat);
    centerBonnet.rotation.z = Math.PI / 2;
    centerBonnet.rotation.y = Math.PI / 2;
    centerBonnet.position.set(0, 3.8, 0);
    centerBonnet.castShadow = true;
    outerShellGroup.add(centerBonnet);
    shellPanels.push({
      mesh: centerBonnet,
      origPos: new THREE.Vector3(0, 3.8, 0),
      explodedPos: new THREE.Vector3(0, 7.2, 0),
      origRot: centerBonnet.rotation.clone(),
    });

    // Right Cowling Canopy (Station 4 & 5)
    const rightCanopyGeo = new THREE.BoxGeometry(11, 2.8, 4.6);
    const rightCanopy = new THREE.Mesh(rightCanopyGeo, shellOpaqueMat);
    rightCanopy.position.set(8.2, 2.2, 0);
    rightCanopy.castShadow = true;
    outerShellGroup.add(rightCanopy);
    shellPanels.push({
      mesh: rightCanopy,
      origPos: new THREE.Vector3(8.2, 2.2, 0),
      explodedPos: new THREE.Vector3(8.2, 5.8, -3.2),
      origRot: rightCanopy.rotation.clone(),
    });

    // Glass Observation Window on Right Canopy
    const rightWindow = new THREE.Mesh(new THREE.BoxGeometry(6.5, 1.3, 4.7), shellGlassMat);
    rightWindow.position.set(8.2, 2.4, 0);
    outerShellGroup.add(rightWindow);
    shellPanels.push({
      mesh: rightWindow,
      origPos: new THREE.Vector3(8.2, 2.4, 0),
      explodedPos: new THREE.Vector3(8.2, 6.0, -3.2),
      origRot: rightWindow.rotation.clone(),
    });

    // Exterior Purple Seam Lines (0xa855f7 accent)
    const seamLineGeo = new THREE.BoxGeometry(10.8, 0.08, 0.1);
    const leftSeam = new THREE.Mesh(seamLineGeo, glowPurpleSolidMat);
    leftSeam.position.set(-8.2, 3.65, 2.32);
    outerShellGroup.add(leftSeam);
    shellPanels.push({
      mesh: leftSeam,
      origPos: new THREE.Vector3(-8.2, 3.65, 2.32),
      explodedPos: new THREE.Vector3(-8.2, 7.25, -0.88),
      origRot: leftSeam.rotation.clone(),
    });

    const rightSeam = new THREE.Mesh(seamLineGeo, glowPurpleSolidMat);
    rightSeam.position.set(8.2, 3.65, 2.32);
    outerShellGroup.add(rightSeam);
    shellPanels.push({
      mesh: rightSeam,
      origPos: new THREE.Vector3(8.2, 3.65, 2.32),
      explodedPos: new THREE.Vector3(8.2, 7.25, -0.88),
      origRot: rightSeam.rotation.clone(),
    });

    // --- 9. STATION 1 (X = -11): Intake & Order Parsing ---
    const st1Group = new THREE.Group();
    st1Group.position.set(-11, 0, 0);
    machineRoot.add(st1Group);

    // Conical Intake Turbine Housing
    const turbineHousing = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.9, 1.6, 16), darkChassisMat);
    turbineHousing.position.y = 1.2;
    turbineHousing.castShadow = true;
    st1Group.add(turbineHousing);

    // Spinning Rotor Blades
    const turbineRotorGroup = new THREE.Group();
    turbineRotorGroup.position.y = 2.05;
    st1Group.add(turbineRotorGroup);

    for (let b = 0; b < 6; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 1.1), chromeMat);
      blade.rotation.y = (b / 6) * Math.PI * 2;
      blade.position.set(Math.cos(blade.rotation.y) * 0.5, 0, Math.sin(blade.rotation.y) * 0.5);
      turbineRotorGroup.add(blade);
    }

    // Outer Torus Induction Ring (Brand Purple 0xa855f7)
    const inductionRing = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.08, 16, 48), glowPurpleSolidMat);
    inductionRing.rotation.x = Math.PI / 2;
    inductionRing.position.y = 1.6;
    st1Group.add(inductionRing);

    // Laser Barcode Scanner sweeping beam
    const scannerBeam = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.04, 0.04), glowPurpleSolidMat);
    scannerBeam.position.set(0, 1.8, 0);
    st1Group.add(scannerBeam);

    // --- 10. STATION 2 (X = -5.5): Script & Logic Reasoning Tower ---
    const st2Group = new THREE.Group();
    st2Group.position.set(-5.5, 0, 1.2);
    machineRoot.add(st2Group);

    // Heavy Octagonal Console Base
    const consoleBase = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.9, 8), darkChassisMat);
    consoleBase.position.y = 0.45;
    consoleBase.castShadow = true;
    st2Group.add(consoleBase);

    // Multi-tier Holographic Display Monoliths (Station 2 — Code Synthesis Pipeline Monitor)
    const mainScreenGeo = new THREE.BoxGeometry(1.9, 1.2, 0.06);
    const mainScreen = new THREE.Mesh(mainScreenGeo, st2MonitorMat);
    mainScreen.position.set(0, 1.6, -0.2);
    mainScreen.rotation.x = -0.15;
    st2Group.add(mainScreen);

    // Dual Angled Secondary Displays
    const sideScreenGeo = new THREE.BoxGeometry(0.85, 0.9, 0.05);
    const screenLeft = new THREE.Mesh(sideScreenGeo, glowCyanMat);
    screenLeft.position.set(-1.1, 1.5, -0.05);
    screenLeft.rotation.y = 0.35;
    st2Group.add(screenLeft);

    const screenRight = new THREE.Mesh(sideScreenGeo, glowCyanMat);
    screenRight.position.set(1.1, 1.5, -0.05);
    screenRight.rotation.y = -0.35;
    st2Group.add(screenRight);

    // Twin Cryo Cooler Chimneys
    for (const cx of [-0.9, 0.9]) {
      const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 1.8, 16), brushedTitaniumMat);
      chimney.position.set(cx, 1.4, -0.8);
      chimney.castShadow = true;
      st2Group.add(chimney);

      const ventCap = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.05, 12, 24), glowPurpleSolidMat);
      ventCap.rotation.x = Math.PI / 2;
      ventCap.position.set(cx, 2.3, -0.8);
      st2Group.add(ventCap);
    }

    // --- 11. STATION 3 (X = 0): Generative Core & Product Stage ---
    const st3Group = new THREE.Group();
    st3Group.position.set(0, 0, 0);
    machineRoot.add(st3Group);

    // Circular Glass Synthesis Platform Pedestal
    const stagePedestal = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.7, 0.6, 32), brushedTitaniumMat);
    stagePedestal.position.y = 0.3;
    stagePedestal.castShadow = true;
    st3Group.add(stagePedestal);

    const stageGlassTop = new THREE.Mesh(new THREE.CylinderGeometry(2.38, 2.38, 0.1, 32), shellGlassMat);
    stageGlassTop.position.y = 0.65;
    st3Group.add(stageGlassTop);

    // Inner Glowing Fusion Core Sphere (Brand Purple 0xa855f7)
    const coreSphereGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const coreSphere = new THREE.Mesh(coreSphereGeo, glowPurpleSolidMat);
    coreSphere.position.y = 2.1;
    st3Group.add(coreSphere);

    // Gyroscopic Dual Gimbal Rings (Gimbal 1 & Gimbal 2)
    const gimbalRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.08, 16, 48), purpleAccentMat);
    gimbalRing1.position.y = 2.1;
    st3Group.add(gimbalRing1);

    const gimbalRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.07, 16, 48), chromeMat);
    gimbalRing2.position.y = 2.1;
    gimbalRing2.rotation.x = Math.PI / 2;
    st3Group.add(gimbalRing2);

    // 4 Symmetrical Particle Accelerators
    for (let p = 0; p < 4; p++) {
      const angle = (p / 4) * Math.PI * 2;
      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.7, 16), darkChassisMat);
      nozzle.position.set(Math.cos(angle) * 2.0, 2.1, Math.sin(angle) * 2.0);
      nozzle.lookAt(0, 2.1, 0);
      nozzle.rotateX(Math.PI / 2);
      st3Group.add(nozzle);
    }

    // --- 12. STATION 4 (X = +5.5): Post & State Vector Blade Monolith ---
    const st4Group = new THREE.Group();
    st4Group.position.set(5.5, 0, 1.2);
    machineRoot.add(st4Group);

    // Server Rack Monolith Cabinet
    for (const rx of [-0.9, 0.9]) {
      const rack = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3.2, 1.3), darkChassisMat);
      rack.position.set(rx, 1.6, 0);
      rack.castShadow = true;
      st4Group.add(rack);

      // Server Blade Slots with Pulsing LED Status Arrays
      for (let s = 0; s < 7; s++) {
        const slotY = 0.5 + s * 0.38;
        const bladeStripe = new THREE.Mesh(
          new THREE.BoxGeometry(1.15, 0.08, 0.04),
          s % 2 === 0 ? glowPurpleSolidMat : glowCyanMat
        );
        bladeStripe.position.set(rx, slotY, 0.66);
        st4Group.add(bladeStripe);
      }
    }

    // Glass Cooling Chamber linking the racks
    const coolingBridge = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.8), shellGlassMat);
    coolingBridge.position.set(0, 2.2, 0);
    st4Group.add(coolingBridge);

    // Internal Plasma Filament in cooling chamber (Brand Purple 0xa855f7)
    const filamentGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.1, 16);
    const filamentMesh = new THREE.Mesh(filamentGeo, glowPurpleSolidMat);
    filamentMesh.position.set(0, 2.2, 0);
    st4Group.add(filamentMesh);

    // Station 4 — Incoming Orders Monitor Screen (front-facing between racks)
    const st4ScreenGeo = new THREE.BoxGeometry(1.6, 2.4, 0.06);
    const st4Screen = new THREE.Mesh(st4ScreenGeo, st4MonitorMat);
    st4Screen.position.set(0, 1.6, 0.88);
    st4Group.add(st4Screen);

    // Monitor bezel frame
    const st4Bezel = new THREE.Mesh(new THREE.BoxGeometry(1.72, 2.52, 0.04), darkChassisMat);
    st4Bezel.position.set(0, 1.6, 0.86);
    st4Group.add(st4Bezel);

    // --- 13. STATION 5 (X = +11): Payment & Escrow Settlement Portal ---
    const st5Group = new THREE.Group();
    st5Group.position.set(11, 0, 0);
    machineRoot.add(st5Group);

    // Heavy Circular Dispatch Dock Base
    const dockBase = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 0.8, 16), darkChassisMat);
    dockBase.position.y = 0.4;
    dockBase.castShadow = true;
    st5Group.add(dockBase);

    // Scanning Verification Archway (Emerald status green)
    const archGeo = new THREE.TorusGeometry(1.4, 0.12, 16, 32, Math.PI);
    const verifArch = new THREE.Mesh(archGeo, glowEmeraldMat);
    verifArch.position.y = 1.2;
    st5Group.add(verifArch);

    // Cryptographic Settlement Prism (Floating Octahedron)
    const prismGeo = new THREE.OctahedronGeometry(0.65, 0);
    const verifPrism = new THREE.Mesh(prismGeo, glowEmeraldMat);
    verifPrism.position.y = 2.2;
    st5Group.add(verifPrism);

    // Pneumatic Quality Seal Stamp
    const stampPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.0, 16), chromeMat);
    stampPiston.position.set(0, 3.2, 0);
    st5Group.add(stampPiston);

    const stampHead = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.25, 16), purpleAccentMat);
    stampHead.position.set(0, 2.7, 0);
    st5Group.add(stampHead);

    // Station 5 — Escrow Receipt Display Screen (floating receipt panel)
    const st5ScreenGeo = new THREE.BoxGeometry(1.4, 1.4, 0.06);
    const st5Screen = new THREE.Mesh(st5ScreenGeo, st5ReceiptMat);
    st5Screen.position.set(0, 1.5, 1.1);
    st5Group.add(st5Screen);

    // Receipt screen bezel
    const st5Bezel = new THREE.Mesh(new THREE.BoxGeometry(1.52, 1.52, 0.04), darkChassisMat);
    st5Bezel.position.set(0, 1.5, 1.08);
    st5Group.add(st5Bezel);

    // --- 14. Animated Platform-Branded Payloads Traversing the Conveyor Pipeline ---
    const payloadCount = 6; // One per platform
    interface PayloadItem {
      mesh: THREE.Group;
      coreBox: THREE.Mesh;
      accentBox: THREE.Mesh;
      facePlane: THREE.Mesh;
      platformIndex: number;
      offset: number;
    }
    const payloads: PayloadItem[] = [];

    const createPlatformPayload = (platformIndex: number, offset: number) => {
      const group = new THREE.Group();

      // Main cargo box body
      const boxGeo = new THREE.BoxGeometry(0.9, 0.55, 0.8);
      const core = new THREE.Mesh(boxGeo, darkChassisMat);
      core.castShadow = true;
      group.add(core);

      // Top accent trim strip
      const trimGeo = new THREE.BoxGeometry(0.92, 0.08, 0.82);
      const accent = new THREE.Mesh(trimGeo, glowPurpleSolidMat);
      accent.position.y = 0.29;
      group.add(accent);

      // Front-facing platform branded label (canvas texture on a plane)
      const faceGeo = new THREE.PlaneGeometry(0.7, 0.7);
      const faceMat = packetFaceMaterials[platformIndex % packetFaceMaterials.length];
      const facePlane = new THREE.Mesh(faceGeo, faceMat);
      facePlane.position.set(0, 0.05, 0.41); // Slightly in front of the box
      group.add(facePlane);

      // Back-facing label (same texture)
      const backPlane = new THREE.Mesh(faceGeo, faceMat);
      backPlane.position.set(0, 0.05, -0.41);
      backPlane.rotation.y = Math.PI;
      group.add(backPlane);

      machineRoot.add(group);
      return { mesh: group, coreBox: core, accentBox: accent, facePlane, platformIndex, offset };
    };

    for (let i = 0; i < payloadCount; i++) {
      payloads.push(createPlatformPayload(i, (i / payloadCount) * 28));
    }

    // --- 15. Ambient Particle Sparks around Generative Core ---
    const sparkCount = 80;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkSpeeds = new Float32Array(sparkCount * 3);

    for (let s = 0; s < sparkCount; s++) {
      sparkPositions[s * 3] = (Math.random() - 0.5) * 4;
      sparkPositions[s * 3 + 1] = 1.0 + Math.random() * 2.5;
      sparkPositions[s * 3 + 2] = (Math.random() - 0.5) * 4;

      sparkSpeeds[s * 3] = (Math.random() - 0.5) * 0.02;
      sparkSpeeds[s * 3 + 1] = 0.01 + Math.random() * 0.02;
      sparkSpeeds[s * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xa855f7, // Brand purple sparks
      size: 0.1,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    st3Group.add(sparkPoints);

    // --- 16. Render & Physics Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsUpdate = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // FPS Telemetry Counter
      frameCount++;
      if (elapsed - lastFpsUpdate > 1.0) {
        setFpsMetric(Math.round((frameCount / (elapsed - lastFpsUpdate))));
        frameCount = 0;
        lastFpsUpdate = elapsed;
      }

      // Smooth Cutaway Transition Interpolation
      const cutDiff = targetCutawayFactorRef.current - cutawayFactorRef.current;
      cutawayFactorRef.current += cutDiff * 0.05;
      const cutVal = cutawayFactorRef.current;

      // Animate Outer Shell Panels (Slide open / explode & fade)
      shellPanels.forEach((panel) => {
        panel.mesh.position.lerpVectors(panel.origPos, panel.explodedPos, cutVal);
        const mat = panel.mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.transparent) {
          mat.opacity = THREE.MathUtils.lerp(1.0, 0.18, cutVal);
        }
      });

      // Smooth Camera & Target Lerp
      camera.position.lerp(targetCamPos.current, 0.045);
      controls.target.lerp(targetLookAt.current, 0.045);

      // OrbitControls Auto-Rotate
      if (autoRotate && !isHovered) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.7;
      } else {
        controls.autoRotate = false;
      }
      controls.update();

      // Continuous Mechanical Movements
      // 1. Conveyor Rollers
      rollers.forEach((r) => {
        r.rotation.y += delta * 3.5;
      });

      // 2. Internal Gears Rotation with Interlocking Speed Ratios
      internalGears.forEach((g) => {
        if (g.axis === "y") g.mesh.rotation.y += delta * g.speed;
      });

      // 3. Hydraulic Pistons Stroking
      pistons.forEach((p) => {
        const strokeY = p.baseY + Math.sin(elapsed * 2.5 + p.offset) * p.stroke;
        p.rod.position.y = strokeY;
      });

      // 4. Station 1 Turbine Blades & Scanner
      turbineRotorGroup.rotation.y += delta * 4.0;
      scannerBeam.position.z = Math.sin(elapsed * 3) * 0.9;

      // 5. Station 2 Console Screen Pulsing
      mainScreen.scale.y = 1.0 + Math.sin(elapsed * 4) * 0.02;

      // 6. Station 3 Gyroscopic Gimbal Rings Counter-Rotation & Fusion Core Pulse
      gimbalRing1.rotation.y += delta * 1.1;
      gimbalRing1.rotation.x = Math.sin(elapsed * 0.8) * 0.4;
      gimbalRing2.rotation.z -= delta * 0.9;
      gimbalRing2.rotation.y = Math.cos(elapsed * 0.6) * 0.3;
      const coreScale = 0.92 + Math.sin(elapsed * 3.2) * 0.08;
      coreSphere.scale.set(coreScale, coreScale, coreScale);

      // 7. Station 4 Cryo Fluid Bubbling
      filamentMesh.scale.x = 1.0 + Math.sin(elapsed * 6) * 0.15;
      filamentMesh.scale.z = 1.0 + Math.cos(elapsed * 6) * 0.15;

      // 8. Station 5 Verification Prism Spinning & Stamping
      verifPrism.rotation.y += delta * 1.5;
      verifPrism.rotation.x = Math.sin(elapsed * 1.2) * 0.2;
      const stampY = 2.7 + Math.max(0, Math.sin(elapsed * 2.0)) * 0.45;
      stampHead.position.y = stampY;
      stampPiston.position.y = stampY + 0.5;

      // 9. Moving Payload Packages along the entire machine pipeline
      payloads.forEach((item) => {
        const speed = 2.4;
        const totalTravel = 28;
        let curX = ((elapsed * speed + item.offset) % totalTravel) - 14;
        item.mesh.position.x = curX;
        item.mesh.position.y = 0.65;
        item.mesh.position.z = 0;

        // Dynamic State transformation based on current X position
        if (curX > 8) {
          // Output stage: green verified
          (item.accentBox.material as THREE.MeshStandardMaterial).color.setHex(0x10b981);
          (item.accentBox.material as THREE.MeshStandardMaterial).emissive.setHex(0x059669);
        } else {
          // Processing stage: purple accent (0xa855f7)
          (item.accentBox.material as THREE.MeshStandardMaterial).color.setHex(0xa855f7);
          (item.accentBox.material as THREE.MeshStandardMaterial).emissive.setHex(0xa855f7);
        }
      });

      // 10. Ambient Spark Points Floating upward
      const positions = sparkPoints.geometry.attributes.position.array as Float32Array;
      for (let s = 0; s < sparkCount; s++) {
        positions[s * 3 + 1] += sparkSpeeds[s * 3 + 1];
        if (positions[s * 3 + 1] > 3.6) {
          positions[s * 3 + 1] = 1.0;
        }
      }
      sparkPoints.geometry.attributes.position.needsUpdate = true;

      // Render WebGL
      renderer.render(scene, camera);
    };

    animate();

    // --- 17. Responsive Canvas Resize Listener ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 800;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      controls.dispose();
    };
  }, [embed, isHovered, autoRotate]);

  const currentStation = STATIONS[activeStationIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden bg-black ${className}`}
      style={{ minHeight: typeof height === "number" ? `${height}px` : height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-grab active:cursor-grabbing outline-none"
      />

      {/* Top Floating Telemetry & Mode Indicator Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/80 border border-zinc-800/80 backdrop-blur-xl pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900/90 text-xs font-mono font-medium text-purple-400 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span>SYS_PIPELINE // 3D SIMULATION</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-zinc-400">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>{fpsMetric} FPS</span>
          </div>
        </div>

        {/* Top Right Utility Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Camera Presets Selector */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-black/80 border border-zinc-800/80 backdrop-blur-xl">
            {(["ISO", "FRONT", "TOP"] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => handleSetCameraPreset(preset)}
                className="px-2.5 py-1 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Auto-Rotate Play/Pause Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="p-2.5 rounded-2xl bg-black/80 border border-zinc-800/80 text-zinc-300 hover:text-white hover:border-purple-500/40 backdrop-blur-xl transition-all cursor-pointer shadow-lg"
            title={autoRotate ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
            aria-label="Toggle Auto-Rotate"
          >
            {autoRotate ? (
              <Pause className="w-4 h-4 text-purple-400" />
            ) : (
              <Play className="w-4 h-4 text-zinc-400" />
            )}
          </button>

          {/* Reset Camera View */}
          <button
            onClick={handleResetView}
            className="p-2.5 rounded-2xl bg-black/80 border border-zinc-800/80 text-zinc-300 hover:text-white hover:border-purple-500/40 backdrop-blur-xl transition-all cursor-pointer shadow-lg"
            title="Reset Pipeline View"
            aria-label="Reset View"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* When embed is false: Render the Full Interactive Controls at Bottom */}
      {!embed && (
        <div className="absolute bottom-6 left-4 right-4 flex flex-col items-center gap-4 pointer-events-none z-20">
          {/* Station Details Card (Rendered when in 'Stations' mode) */}
          {activeMode === "Stations" && currentStation && (
            <div className="w-full max-w-2xl p-4 sm:p-5 rounded-2xl bg-black/90 border border-purple-500/40 backdrop-blur-2xl pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-3 duration-300 shadow-2xl">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <currentStation.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-purple-400 font-semibold uppercase">
                      STATION 0{currentStation.index} • {currentStation.category}
                    </span>
                    <h3 className="text-base font-extrabold text-white font-[family-name:var(--font-jakarta)]">
                      {currentStation.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium border border-purple-500/30 bg-purple-500/20 text-purple-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span>{currentStation.status}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                {currentStation.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-zinc-800/80 text-[11px] font-mono">
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Agent Core</span>
                  <span className="text-purple-300 font-semibold truncate block">
                    {currentStation.agent.split("&")[0]}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Throughput</span>
                  <span className="text-white font-semibold">{currentStation.throughput}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Latency</span>
                  <span className="text-emerald-400 font-semibold">{currentStation.latency}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Accuracy</span>
                  <span className="text-purple-400 font-semibold">{currentStation.accuracy}</span>
                </div>
              </div>
            </div>
          )}

          {/* Station Sub-Navigation Pills (when in 'Stations' mode) */}
          {activeMode === "Stations" && (
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/85 border border-zinc-800/80 backdrop-blur-xl pointer-events-auto overflow-x-auto max-w-full scrollbar-none shadow-xl">
              {STATIONS.map((station, idx) => {
                const Icon = station.icon;
                const isSelected = activeStationIndex === idx;
                return (
                  <button
                    key={station.id}
                    onClick={() => handleSelectStation(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-[#a855f7] text-white shadow-md shadow-purple-500/40 font-semibold"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>0{station.index} {station.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Primary View Modes Bar: Assembled | Cutaway | Stations */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/90 border border-zinc-800 backdrop-blur-2xl pointer-events-auto shadow-2xl">
            {/* 1. Assembled Mode */}
            <button
              onClick={() => setActiveMode("Assembled")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeMode === "Assembled"
                  ? "bg-[#a855f7] text-white shadow-lg shadow-purple-500/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Assembled</span>
            </button>

            {/* 2. Cutaway Mode */}
            <button
              onClick={() => setActiveMode("Cutaway")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeMode === "Cutaway"
                  ? "bg-[#a855f7] text-white shadow-lg shadow-purple-500/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Cutaway</span>
            </button>

            {/* 3. Stations Mode */}
            <button
              onClick={() => {
                setActiveMode("Stations");
                handleSelectStation(activeStationIndex);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeMode === "Stations"
                  ? "bg-[#a855f7] text-white shadow-lg shadow-purple-500/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Crosshair className="w-4 h-4" />
              <span>Stations</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgenticFactory3D;
