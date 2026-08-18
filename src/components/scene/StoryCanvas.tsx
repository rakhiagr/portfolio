"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { installScrollProgress } from "@/lib/scroll-progress";

const StoryScene = dynamic(
  () => import("./StoryScene").then((m) => m.StoryScene),
  { ssr: false },
);

export function StoryCanvas() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    installScrollProgress();
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
    if (cores < 4 || memory < 4) setDpr([1, 1]);

    // Defer WebGL mount to idle so we don't block LCP/interactions.
    const win = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    let handle: number | ReturnType<typeof setTimeout>;
    if (typeof win.requestIdleCallback === "function") {
      handle = win.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    } else {
      handle = setTimeout(() => setReady(true), 300);
    }
    return () => {
      const wanyone = window as unknown as { cancelIdleCallback?: (id: number) => void };
      if (typeof wanyone.cancelIdleCallback === "function" && typeof handle === "number") {
        wanyone.cancelIdleCallback(handle);
      } else if (typeof handle !== "number") {
        clearTimeout(handle);
      }
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: "var(--ink)" }}
    >
      {ready && (
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 6], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <StoryScene />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.35}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
