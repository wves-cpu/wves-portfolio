'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, colors, count } = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      // Mix of violet and blue accents
      const isViolet = Math.random() > 0.5;
      if (isViolet) {
        colors[i3] = 0.573;     // R - violet
        colors[i3 + 1] = 0.459; // G
        colors[i3 + 2] = 1.0;   // B
      } else {
        colors[i3] = 0.302;     // R - blue
        colors[i3 + 1] = 0.553; // G
        colors[i3 + 2] = 1.0;   // B
      }
    }

    return { positions, colors, count };
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    // Smooth mouse follow
    mouseRef.current.x += (pointer.x * 0.3 - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (pointer.y * 0.3 - mouseRef.current.y) * 0.02;

    meshRef.current.rotation.y = time * 0.03 + mouseRef.current.x * 0.5;
    meshRef.current.rotation.x = time * 0.02 + mouseRef.current.y * 0.3;

    // Subtle breathing scale
    const scale = 1 + Math.sin(time * 0.5) * 0.02;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    mouseRef.current.x += (pointer.x * 0.2 - mouseRef.current.x) * 0.015;
    mouseRef.current.y += (pointer.y * 0.2 - mouseRef.current.y) * 0.015;

    meshRef.current.rotation.x = time * 0.08 + mouseRef.current.y * 0.5;
    meshRef.current.rotation.y = time * 0.05 + mouseRef.current.x * 0.5;
    meshRef.current.rotation.z = time * 0.03;

    meshRef.current.position.y = Math.sin(time * 0.4) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial
        color="#1a1a2e"
        metalness={0.9}
        roughness={0.3}
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(146,117,255,0.06) 0%, rgba(8,9,11,0) 70%)'
      }} />
    );
  }

  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#9275FF" />
        <pointLight position={[-5, -3, 3]} intensity={0.2} color="#4D8DFF" />
        <ParticleField />
        <FloatingMesh />
      </Canvas>
    </div>
  );
}
