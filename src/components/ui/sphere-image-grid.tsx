"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface ImageData {
  id: string;
  src?: string;
  alt: string;
  title?: string;
  description?: string;
  bgColor?: string;
  shortName?: string;
  link?: string;
}

export interface SphereImageGridProps {
  images: ImageData[];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  baseImageScale?: number;
  containerSize?: number;
  sphereRadius?: number;
  onNodeClick?: (image: ImageData) => void;
}

export default function SphereImageGrid({
  images,
  autoRotate = true,
  autoRotateSpeed = 0.4,
  baseImageScale = 0.16,
  containerSize = 450,
  sphereRadius = 200,
  onNodeClick,
}: SphereImageGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || images.length === 0) return;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
    // Position camera so the sphere fits nicely
    camera.position.z = sphereRadius * 2.8;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(containerSize, containerSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Prevent zoom from interfering with page scroll
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;

    // SPHERE GROUP
    const group = new THREE.Group();
    scene.add(group);

    // Create a shared geometry for planes (so they can be scaled)
    // baseImageScale is a multiplier against the radius
    const itemSize = sphereRadius * baseImageScale;
    const geometry = new THREE.PlaneGeometry(itemSize, itemSize);

    // FIBONACCI SPHERE DISTRIBUTION
    const n = images.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    // Store meshes to make them look at the camera and detect clicks
    const meshes: THREE.Mesh[] = [];
    const meshUserDataMap = new Map<string, ImageData>();

    // Helper to generate fallback canvas texture
    const generateFallbackTexture = (img: ImageData): THREE.Texture => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = img.bgColor || "#333333";
        ctx.beginPath();
        ctx.arc(64, 64, 60, 0, Math.PI * 2);
        ctx.fill();

        const text = img.shortName || img.title?.substring(0, 2) || img.alt.substring(0, 2);
        ctx.fillStyle = "#ffffff";
        let fontSize = 44;
        ctx.font = `bold ${fontSize}px sans-serif`;
        while (ctx.measureText(text).width > 100 && fontSize > 10) {
          fontSize -= 2;
          ctx.font = `bold ${fontSize}px sans-serif`;
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 64, 64 + (fontSize * 0.1));
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      return texture;
    };

    images.forEach((img, i) => {
      const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y

      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const safeSrc = img.src || "";
      const mesh = new THREE.Mesh(
        geometry, 
        new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide, depthWrite: false })
      );
      
      // Position on the sphere surface
      mesh.position.set(x * sphereRadius, y * sphereRadius, z * sphereRadius);
      mesh.uuid = img.id; // Map UUID back to data
      meshUserDataMap.set(mesh.uuid, img);
      
      group.add(mesh);
      meshes.push(mesh);

      if (safeSrc.startsWith("http")) {
        // Try fetching external logo
        textureLoader.load(
          safeSrc,
          (texture) => {
            // Replicate 'object-contain' on a white circle using Canvas API
            const canvas = document.createElement("canvas");
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext("2d");
            
            if (ctx && texture.image) {
              // Draw white circular background
              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(64, 64, 60, 0, Math.PI * 2);
              ctx.fill();

              // Draw image centered and scaled (simulating object-contain with p-2.5 padding)
              const imgEl = texture.image;
              const padding = 24; 
              const size = 128 - padding * 2;
              const aspect = imgEl.width / imgEl.height;
              
              let drawW = size;
              let drawH = size;
              
              if (aspect > 1) {
                drawH = size / aspect;
              } else {
                drawW = size * aspect;
              }
              
              const drawX = 64 - drawW / 2;
              const drawY = 64 - drawH / 2;
              
              ctx.drawImage(imgEl, drawX, drawY, drawW, drawH);
            }
            
            const finalTexture = new THREE.CanvasTexture(canvas);
            finalTexture.minFilter = THREE.LinearFilter;
            finalTexture.magFilter = THREE.LinearFilter;
            finalTexture.generateMipmaps = false;

            (mesh.material as THREE.MeshBasicMaterial).map = finalTexture;
            (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
          },
          undefined,
          (err) => {
            // Fallback if logo fetch fails (e.g., 404 or CORS)
            const fallbackTexture = generateFallbackTexture(img);
            (mesh.material as THREE.MeshBasicMaterial).map = fallbackTexture;
            (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
          }
        );
      } else {
        // Fallback immediately if no valid external URL
        const fallbackTexture = generateFallbackTexture(img);
        (mesh.material as THREE.MeshBasicMaterial).map = fallbackTexture;
        (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
    });

    // INTERACTION (Raycaster)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const handlePointerDown = (event: PointerEvent) => {
      pointerDownPos = { x: event.clientX, y: event.clientY };
    };

    const handlePointerUp = (event: PointerEvent) => {
      // Calculate distance moved
      const dx = event.clientX - pointerDownPos.x;
      const dy = event.clientY - pointerDownPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If user dragged more than 5 pixels, it's a drag rotation, not a click
      if (distance > 5) return;

      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0 && onNodeClick) {
        // Find the closest intersected object's data
        const hitMesh = intersects[0].object as THREE.Mesh;
        const imgData = meshUserDataMap.get(hitMesh.uuid);
        if (imgData) {
          onNodeClick(imgData);
        }
      }
    };

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener("pointerdown", handlePointerDown);
    canvasEl.addEventListener("pointerup", handlePointerUp);
    canvasEl.style.cursor = "pointer";

    // ANIMATION LOOP
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();

      // Make all badges bill-board (always face the camera)
      meshes.forEach((mesh) => {
        mesh.quaternion.copy(camera.quaternion);
      });

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLING
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Keep it square
        renderer.setSize(width, width);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      }
    };
    
    // Call resize once to match initial DOM size
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvasEl.removeEventListener("pointerdown", handlePointerDown);
      canvasEl.removeEventListener("pointerup", handlePointerUp);
      renderer.dispose();
      controls.dispose();
      geometry.dispose();
    };
  }, [images, autoRotate, autoRotateSpeed, baseImageScale, containerSize, sphereRadius, onNodeClick]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} style={{ outline: "none" }} />
    </div>
  );
}
