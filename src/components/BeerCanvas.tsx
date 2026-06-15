import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';

function PlaceholderBeer() {
  const ref = useRef<any>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.6;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#F59E0B" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export default function BeerCanvas() {
  return (
    <Canvas style={{ height: 220 }}>
      <ambientLight intensity={1.2} />
      <spotLight position={[5, 5, 5]} intensity={2} />
      <PlaceholderBeer />
    </Canvas>
  );
}
