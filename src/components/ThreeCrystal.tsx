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
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // Core Icosahedron Geometry
    const geometry = new THREE.IcosahedronGeometry(1.8, 0);
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.85, 0);

    const material = new THREE.MeshPhongMaterial({
      color: 0x0F62FE,
      transparent: true,
      opacity: 0.35,
      shininess: 120,
      flatShading: true,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0F62FE,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const core = new THREE.Mesh(geometry, material);
    const wire = new THREE.Mesh(wireframeGeometry, wireframeMaterial);

    group.add(core);
    group.add(wire);
    scene.add(group);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0F62FE, 3);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0x8B5CF6, 2);
    secondaryLight.position.set(-5, -5, -2);
    scene.add(secondaryLight);

    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animate = (t: number) => {
      animationFrameId = requestAnimationFrame(animate);

      group.rotation.y += 0.006;
      group.rotation.x += 0.003;

      // Mouse tilt reaction
      group.rotation.y += (mouse.x * 0.4 - group.rotation.y) * 0.04;
      group.rotation.x += (mouse.y * 0.4 - group.rotation.x) * 0.04;

      // Floating sine wave animation
      group.position.y = Math.sin(t * 0.0015) * 0.18;

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
      material.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-40" />
    </div>
  );
};
