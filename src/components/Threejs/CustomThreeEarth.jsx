/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import cat from '../../assets/medium.webp';

const CustomThreeEarth = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const earthRef = useRef(null);
  const [animationRunning, setAnimationRunning] = useState(false);

  useEffect(() => {
    // Initialize once
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create Earth (only once)
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(cat); // Adjust path to your texture
    const earthGeometry = new THREE.SphereGeometry(5, 32, 32); // Radius, widthSegments, heightSegments
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    // Position camera
    camera.position.z = 15;

    // Add ambient light (only once)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(ambientLight);

    // Add directional light (only once)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

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

    // Animation loop (only runs when animationRunning is true)
    const animate = () => {
      if (animationRunning) {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.001;
        renderer.render(scene, camera);
      }
    };

    // Start animation on mount
    setAnimationRunning(true);
    animate();

    // Clean up
    return () => {
      window?.removeEventListener('resize', handleResize);
      mountRef?.current?.removeChild(renderer.domElement);
      setAnimationRunning(false); // Stop animation on unmount
    };
  }, []);

  // Control animation with a button or other UI element
  const toggleAnimation = () => {
    setAnimationRunning(!animationRunning);
  };

  return (
    <div
      ref={ mountRef }
      style={ { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 } }
    >
      {/* Add a button or other UI element here to call toggleAnimation() */ }
    </div>
  );
};

export default CustomThreeEarth;
