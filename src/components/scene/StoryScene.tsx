"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { scrollProgress, beat, smoothstep, mix } from "@/lib/scroll-progress";

const SIGNAL = new THREE.Color("#e8a038");
const PAPER = new THREE.Color("#f5f1e8");

// Beats in overall page-scroll progress (0..1). The scene is deliberately quiet
// after Beat 1 — content sections cover the canvas from there until the footer.
const B0 = { start: 0.0, end: 0.1 }; // Idle hero
const B1 = { start: 0.1, end: 0.2 }; // Cinema 1: packet flies to center

function DistantNodes({ count = 240 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.pow(Math.random(), 0.55) * 14;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r * 0.55;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      const c = Math.random() < 0.06 ? SIGNAL : PAPER;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 0.5 + Math.random() * 1.6;
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    if (scrollProgress.reducedMotion) return;
    ref.current.rotation.z += dt * 0.014;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OrbitRing({ opacityRef }: { opacityRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Object3D>(null!);
  const materialRef = useRef<THREE.LineBasicMaterial>(null!);

  const line = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segs = 128;
    for (let i = 0; i <= segs; i++) {
      const t = (i / segs) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(t) * 3.2, Math.sin(t) * 1.8, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: PAPER,
      transparent: true,
      opacity: 0.05,
      depthWrite: false,
    });
    materialRef.current = material;
    return new THREE.Line(geometry, material);
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    if (!scrollProgress.reducedMotion) {
      ref.current.rotation.z += dt * 0.02;
    }
    materialRef.current.opacity = opacityRef.current * 0.07;
  });

  return <primitive ref={ref} object={line} />;
}

function Packet({
  packetPos,
  packetIntensity,
}: {
  packetPos: React.MutableRefObject<THREE.Vector3>;
  packetIntensity: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state, dt) => {
    if (!meshRef.current || !glowRef.current) return;
    meshRef.current.position.lerp(packetPos.current, Math.min(1, dt * 2.5));
    glowRef.current.position.copy(meshRef.current.position);

    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.6) * 0.06;
    meshRef.current.scale.setScalar(pulse);
    glowRef.current.scale.setScalar(pulse * 2.1);

    materialRef.current.emissiveIntensity = 2.4 * packetIntensity.current;
    glowMaterialRef.current.opacity = 0.12 * packetIntensity.current;
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial ref={glowMaterialRef} color={SIGNAL} transparent opacity={0.12} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.14, 48, 48]} />
        <meshStandardMaterial
          ref={materialRef}
          color={SIGNAL}
          emissive={SIGNAL}
          emissiveIntensity={2.4}
          roughness={0.15}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

export function StoryScene() {
  const { camera, viewport, pointer } = useThree();

  const orbitOpacity = useRef(1);
  const packetIntensity = useRef(1);
  const packetPos = useRef(new THREE.Vector3(2, 1.4, 0));
  const pointerActive = useRef(false);

  useFrame(() => {
    const p = scrollProgress.overall;
    const reduced = scrollProgress.reducedMotion;

    const b0 = beat(p, B0.start, B0.end);
    const b1 = beat(p, B1.start, B1.end);

    // Packet anchor for wide vs narrow viewports
    const wide = viewport.width > viewport.height;
    const anchorX = wide ? viewport.width * 0.28 : 0;
    const anchorY = wide ? viewport.height * 0.14 : viewport.height * 0.22;

    // Beat 0: pointer follow when user moves cursor, otherwise idle drift near anchor
    if (b0 < 1 && (Math.abs(pointer.x) > 0.02 || Math.abs(pointer.y) > 0.02)) {
      pointerActive.current = true;
    }
    if (p > B1.start) pointerActive.current = false;

    if (p < B1.start && pointerActive.current) {
      packetPos.current.set(
        (pointer.x * viewport.width) / 2.2,
        (pointer.y * viewport.height) / 2.2,
        0,
      );
    } else if (p < B1.start) {
      // Idle drift around anchor
      const t = performance.now() * 0.0004;
      packetPos.current.set(
        anchorX + Math.sin(t) * 0.25,
        anchorY + Math.cos(t * 0.9) * 0.18,
        0,
      );
    } else if (p < B1.end) {
      // Beat 1: fly from anchor toward center
      packetPos.current.set(
        mix(anchorX, 0, smoothstep(b1)),
        mix(anchorY, 0, smoothstep(b1)),
        0,
      );
    } else {
      // After Beat 1: packet slowly returns toward its anchor as we scroll further.
      // This is invisible under opaque content sections but keeps the scene coherent
      // if the reader scrolls back to top.
      const returnT = smoothstep(beat(p, B1.end, 0.4));
      packetPos.current.set(
        mix(0, anchorX, returnT),
        mix(0, anchorY, returnT),
        0,
      );
    }

    // Camera stays put — no dramatic pull-back anymore
    camera.position.z = mix(camera.position.z, 6, 0.08);

    // Orbit ring fades out as packet moves toward center
    orbitOpacity.current = 1 - smoothstep(b1);

    // Packet stays bright — dims slightly when centered, back to full when returning
    packetIntensity.current = 1;

    // Reduced motion: freeze at Beat 0
    if (reduced) {
      packetPos.current.set(anchorX, anchorY, 0);
      orbitOpacity.current = 1;
      packetIntensity.current = 1;
    }
  });

  return (
    <>
      <color attach="background" args={["#0a0d14"]} />
      <ambientLight intensity={0.5} />
      <DistantNodes />
      <OrbitRing opacityRef={orbitOpacity} />
      <Packet packetPos={packetPos} packetIntensity={packetIntensity} />
    </>
  );
}
