"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

interface Logo3DProps {
  className?: string;
  size?: number;
}

/**
 * Logo3D — Modelo 3D de alta fidelidad para Mr. Chango
 *
 * Características:
 *  - Geometría multicapa con relieve físico y grosor 3D real (capa frontal, capas de bisel y profundidad).
 *  - La silueta del chango (mono) es idéntica al original (recorte perfecto sin aberraciones).
 *  - Interacción táctil y ratón suave: rotación 360° por arrastre con inercia, SIN que se vuelva loco al pasar el mouse por encima.
 *  - Sin textos invasivos de "modelo 3d interactivo".
 *  - Fondo 100% transparente.
 */
export default function Logo3D({ className = "", size = 380 }: Logo3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const mount = mountRef.current;
    if (!mount) return;

    // ── 1. RENDERER ──────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglAvailable(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(size, size, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.maxWidth = "100%";
    renderer.domElement.style.display = "block";
    renderer.setClearColor(0x000000, 0); // Transparente
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    // ── 2. ESCENA Y CÁMARA ───────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 9.8);

    // ── 3. ILUMINACIÓN MULTI-ANGULAR ESCÉNICA ────────────────────
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    // Luz principal dorada (#DAB44A)
    const keyLight = new THREE.DirectionalLight(0xffdf88, 2.5);
    keyLight.position.set(3, 4, 6);
    scene.add(keyLight);

    // Luz lateral naranja (#C96832)
    const rimLightOrange = new THREE.DirectionalLight(0xc96832, 2.0);
    rimLightOrange.position.set(-4.5, -2, 4);
    scene.add(rimLightOrange);

    // Luz trasera verde (#27AE60)
    const backLightGreen = new THREE.DirectionalLight(0x27ae60, 1.8);
    backLightGreen.position.set(0, 4, -4);
    scene.add(backLightGreen);

    // Luz puntual central para brillo especular
    const pointLight = new THREE.PointLight(0xfff0d0, 1.2, 12, 1.8);
    pointLight.position.set(0, 0.5, 4.5);
    scene.add(pointLight);

    // ── 4. GRUPO RAÍZ 3D ─────────────────────────────────────────
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ── 5. CARGA DE TEXTURAS PBR MASTER ──────────────────────────
    const textureLoader = new THREE.TextureLoader();

    const logoTexture = textureLoader.load("/optimized/logo_cutout_clean.png", () => {
      logoTexture.colorSpace = THREE.SRGBColorSpace;
      logoTexture.generateMipmaps = true;
      logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    });

    const normalMap = textureLoader.load("/optimized/logo_cutout_normal.png", () => {
      normalMap.generateMipmaps = true;
      normalMap.minFilter = THREE.LinearMipmapLinearFilter;
    });

    // ── 6. CONSTRUCCIÓN DE GEOMETRÍA VOLUMÉTRICA MULTICAPA 3D ────
    // Dimensiones de la imagen: 630 x 463
    const aspect = 630 / 463;
    const meshHeight = 3.75;
    const meshWidth = meshHeight * aspect;

    const planeGeo = new THREE.PlaneGeometry(meshWidth, meshHeight, 32, 32);

    // Material de cara frontal (Textura PBR exacta, recorte perfecto sin marco)
    const frontMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.65, 0.65),
      transparent: true,
      alphaTest: 0.08,
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    // Capa frontal principal
    const frontMesh = new THREE.Mesh(planeGeo, frontMat);
    frontMesh.position.set(0, 0, 0.18);
    rootGroup.add(frontMesh);

    // Capas intermedias volumétricas que generan el grosor y relieve 3D físico
    const numLayers = 14;
    const totalDepth = 0.36;
    const stepDepth = totalDepth / numLayers;

    for (let i = 1; i <= numLayers; i++) {
      const depthZ = 0.18 - i * stepDepth;
      const progress = i / numLayers;

      // Color degradado hacia madera oscura y bronce en la parte profunda
      const layerMat = new THREE.MeshStandardMaterial({
        map: logoTexture,
        transparent: true,
        alphaTest: 0.12,
        roughness: 0.4 + progress * 0.3,
        metalness: 0.3 + (1 - progress) * 0.4,
        color: new THREE.Color().lerpColors(
          new THREE.Color(0xdab44a),
          new THREE.Color(0x1a1208),
          progress * 0.85
        ),
        side: THREE.DoubleSide,
      });

      const layerMesh = new THREE.Mesh(planeGeo, layerMat);
      layerMesh.position.set(0, 0, depthZ);
      // Ligera escala hacia atrás para dar efecto de bisel biselado cónico
      const layerScale = 1 - progress * 0.015;
      layerMesh.scale.set(layerScale, layerScale, 1);
      rootGroup.add(layerMesh);
    }

    // ── 7. PARTÍCULAS ORGÁNICAS ──────────────────────────────────
    const particleCount = 35;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const cGold = new THREE.Color(0xdab44a);
    const cGreen = new THREE.Color(0x27ae60);
    const cOrange = new THREE.Color(0xc96832);
    const palette = [cGold, cGreen, cOrange];

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 7.5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 0.4;

      const col = palette[i % 3];
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── 8. FÍSICA E INTERACCIÓN SUAVE (ARRUGADO SIN LOCURA DE MOUSE) ──
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    let mouseVelocityX = 0;
    let mouseVelocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        mouseVelocityX = deltaX * 0.007;
        mouseVelocityY = deltaY * 0.007;

        targetRotY += mouseVelocityX;
        targetRotX += mouseVelocityY;
      }
      // NOTA: Se eliminó el parallax agresivo en reposo que hacía que el logo se volviera loco al pasar el mouse
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;

        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domEl = renderer.domElement;
    domEl.style.cursor = "grab";
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domEl.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // ── 9. LOOP DE ANIMACIÓN ──────────────────────────────────────
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isDragging) {
        targetRotY += mouseVelocityX;
        targetRotX += mouseVelocityY;
        mouseVelocityX *= 0.92;
        mouseVelocityY *= 0.92;

        // Oscilación natural sutil en reposo
        if (Math.abs(mouseVelocityX) < 0.0001 && Math.abs(mouseVelocityY) < 0.0001) {
          const idleTime = now * 0.001;
          const idleOscillationY = Math.sin(idleTime * 0.7) * 0.28;
          const idleOscillationX = Math.cos(idleTime * 0.5) * 0.08;

          targetRotY = THREE.MathUtils.lerp(targetRotY, idleOscillationY, 0.02);
          targetRotX = THREE.MathUtils.lerp(targetRotX, idleOscillationX, 0.02);
        }
      }

      // Límites de inclinación vertical
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));

      // Suavizado (damping)
      currentRotX = THREE.MathUtils.lerp(currentRotX, targetRotX, delta * 6);
      currentRotY = THREE.MathUtils.lerp(currentRotY, targetRotY, delta * 6);

      rootGroup.rotation.x = currentRotX;
      rootGroup.rotation.y = currentRotY;

      // Flotación suave
      rootGroup.position.y = Math.sin(now * 0.0012) * 0.06;

      particles.rotation.y += delta * 0.04;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // ── 10. RESIZE ────────────────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || size;
      renderer.setSize(w, w);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // ── 11. CLEANUP ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domEl.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      rootGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      planeGeo.dispose();
      pGeo.dispose();
      pMat.dispose();
      logoTexture.dispose();
      normalMap.dispose();
      renderer.dispose();

      if (mount.contains(domEl)) {
        mount.removeChild(domEl);
      }
    };
  }, [mounted, size]);

  if (!mounted || !webglAvailable) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center select-none ${className}`}
        style={{ width: `min(${size}px, calc(100vw - 2rem))`, height: `min(${size}px, calc(100vw - 2rem))`, maxWidth: "100%", aspectRatio: "1" }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/logonegro.jpeg"
            alt="Mr. Chango Reggae Mexicano"
            fill
            sizes="(max-width: 768px) 280px, 380px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <div
        ref={mountRef}
        style={{ width: `min(${size}px, calc(100vw - 2rem))`, height: `min(${size}px, calc(100vw - 2rem))`, maxWidth: "100%", aspectRatio: "1" }}
        className={`relative transition-transform duration-200 ${
          isInteracting ? "cursor-grabbing scale-[1.02]" : "cursor-grab"
        }`}
        role="img"
        aria-label="Modelo 3D volumétrico oficial de Mr. Chango Reggae Mexicano"
        title="Arrastra con el ratón o desliza con el dedo para rotar el logo en 3D"
      />
    </div>
  );
}
