"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AISphere } from "./AISphere";

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-[1] opacity-60 md:opacity-80">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#915EFF" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00FFFF" />
          <AISphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
