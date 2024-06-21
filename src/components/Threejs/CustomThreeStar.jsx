/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const CustomThreeStar = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create stars using TypedArrays for better performance
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3); // Array for star positions (x, y, z)

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = THREE.MathUtils.randFloatSpread(2000);
      positions[i + 1] = THREE.MathUtils.randFloatSpread(2000);
      positions[i + 2] = THREE.MathUtils.randFloatSpread(2000);
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Position camera
    camera.position.z = 100;

    // Assign refs for cleanup
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Resize handling
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop with reduced render frequency
    const animate = () => {
      requestAnimationFrame(animate);
      if (!document.hidden) { // Only render if tab is active
        starField.rotation.y += 0.0005; // Slightly slower rotation for less frequent updates
        renderer.render(scene, camera);
      }
    };
    animate();

    // Clean up
    return () => {
      window?.removeEventListener('resize', handleResize);
      mountRef?.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ mountRef } style={ {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden', width: '100%',
    height: '100%',
  } } />;
};

export default CustomThreeStar;
