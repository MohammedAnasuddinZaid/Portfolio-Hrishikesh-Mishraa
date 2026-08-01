import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCrystal: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const geometry = new THREE.IcosahedronGeometry(1.4, 2);
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.55, 1);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.18,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
      flatShading: false,
      envMapIntensity: 0.6,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const core = new THREE.Mesh(geometry, material);
    const wire = new THREE.Mesh(wireframeGeometry, wireframeMaterial);

    const glowGeometry = new THREE.IcosahedronGeometry(1.6, 0);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.04,
      wireframe: false,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.scale.set(1.3, 1.3, 1.3);

    group.add(core);
    group.add(wire);
    group.add(glow);

    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    for (let i = 0; i < particlesCount; i++) {
      const radius = 2 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = 0.01 + Math.random() * 0.03;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMat = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const ringParticlesGeo = new THREE.BufferGeometry();
    const ringCount = 120;
    const ringPositions = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const radius = 2.8 + Math.random() * 0.2;
      ringPositions[i * 3] = Math.cos(angle) * radius;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      ringPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    ringParticlesGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));

    const ringParticlesMat = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const ringParticles = new THREE.Points(ringParticlesGeo, ringParticlesMat);
    scene.add(ringParticles);
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0x402020, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xdc2626, 6);
    pointLight.position.set(4, 5, 5);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0xef4444, 3);
    secondaryLight.position.set(-4, -3, -4);
    scene.add(secondaryLight);

    const rimLight = new THREE.DirectionalLight(0xdc2626, 1.5);
    rimLight.position.set(0, -1, -3);
    scene.add(rimLight);

    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animate = (t: number) => {
      animationFrameId = requestAnimationFrame(animate);

      group.rotation.y += (mouse.x * 0.4 - group.rotation.y) * 0.025;
      group.rotation.x += (mouse.y * 0.4 - group.rotation.x) * 0.025;
      group.rotation.z += 0.003;

      group.position.y = Math.sin(t * 0.0008) * 0.25;
      group.position.x = Math.cos(t * 0.0006) * 0.15;

      glow.scale.setScalar(1.3 + Math.sin(t * 0.001) * 0.05);

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      ringParticles.rotation.y += 0.005;
      ringParticles.position.y = Math.sin(t * 0.0015) * 0.3;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    animate(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframeGeometry.dispose();
      glowGeometry.dispose();
      material.dispose();
      wireframeMaterial.dispose();
      glowMaterial.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      ringParticlesGeo.dispose();
      ringParticlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[500px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent pointer-events-none opacity-60" />
    </div>
  );
};
