"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Float, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  PerspectiveCamera, 
  Environment,
  PresentationControls
} from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

function FloatingShapes() {
  const shapes = useMemo(() => {
    return new Array(15).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ],
      color: Math.random() > 0.5 ? "#8b0000" : "#d4af37",
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.5 + 0.5
    }));
  }, []);

  return (
    <>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={shape.speed}
          rotationIntensity={2}
          floatIntensity={2}
          position={shape.position as any}
        >
          <mesh scale={shape.scale as any}>
            {i % 3 === 0 ? (
              <octahedronGeometry />
            ) : i % 3 === 1 ? (
              <torusGeometry args={[1, 0.4, 16, 32]} />
            ) : (
              <boxGeometry />
            )}
            <MeshWobbleMaterial
              color={shape.color}
              factor={0.4}
              speed={2}
              transparent
              opacity={0.3}
              wireframe={i % 2 === 0}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Particles({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

function InteractiveLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      lightRef.current.position.set(x, y, 5);
    }
  });

  return <pointLight ref={lightRef} intensity={50} color="#8b0000" distance={20} />;
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 5, 25]} />
      
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={100} color="#d4af37" />
      <InteractiveLight />

      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <FloatingShapes />
        
        {/* Vanguard Central Element */}
        <Float speed={3} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[0, -4, -2]}>
            <icosahedronGeometry args={[1, 15]} />
            <MeshDistortMaterial
              color="#c5a059"
              speed={4}
              distort={0.3}
              radius={1}
              metalness={1}
              roughness={0}
            />
          </mesh>
        </Float>

        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[5, 64, 64]} />
            <MeshDistortMaterial
              color="#111"
              speed={2}
              distort={0.4}
              radius={1}
            />
          </mesh>
        </Float>
      </PresentationControls>

      <Particles />
      <Environment preset="night" />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <Scene />
      </Canvas>
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
    </div>
  );
}
