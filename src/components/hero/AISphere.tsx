"use client";

import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export function AISphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} scale={1}>
        <MeshDistortMaterial
          color="#915EFF"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#915EFF"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Sphere args={[2.1, 32, 32]} scale={1}>
        <meshBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.06}
          wireframe
        />
      </Sphere>
    </Float>
  );
}
