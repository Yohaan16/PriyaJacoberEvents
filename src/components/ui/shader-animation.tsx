"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: Record<string, { type: string; value: number | THREE.Vector2 }>;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Modified shader for soft pink/gold tones
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.08;
        float lineWidth = 0.0015;

        // Gold channel (warm)
        float gold = 0.0;
        // Pink channel
        float pink = 0.0;
        // Warm white channel
        float warm = 0.0;

        for(int i = 0; i < 5; i++){
          float fi = float(i);
          gold += lineWidth * fi * fi / abs(fract(t + fi * 0.012) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          pink += lineWidth * fi * fi / abs(fract(t - 0.005 + fi * 0.012) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          warm += lineWidth * fi * fi / abs(fract(t + 0.005 + fi * 0.012) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
        }

        // Map to gold/pink palette
        float r = gold * 0.79 + pink * 0.96 + warm * 0.1;
        float g = gold * 0.66 + pink * 0.78 + warm * 0.05;
        float b = gold * 0.30 + pink * 0.82 + warm * 0.02;

        // Subtle vignette
        float vignette = 1.0 - length(uv) * 0.3;
        
        gl_FragColor = vec4(r * vignette, g * vignette, b * vignette, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms: Record<string, { type: string; value: number | THREE.Vector2 }> = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      (uniforms.resolution.value as THREE.Vector2).x = renderer.domElement.width;
      (uniforms.resolution.value as THREE.Vector2).y = renderer.domElement.height;
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      (uniforms.time.value as number) = (uniforms.time.value as number) + 0.05;
      renderer.render(scene, camera);
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    };

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: "#1a1a1a",
        overflow: "hidden",
      }}
    />
  );
}
