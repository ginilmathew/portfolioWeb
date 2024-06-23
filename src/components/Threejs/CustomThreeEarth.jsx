import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import code from '../../assets/images/code.jpg'; // Adjust path as necessary

const CustomThreeEarth = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const earthRef = useRef(null);
  const [animationRunning, setAnimationRunning] = useState(false);

  useEffect(() => {
    console.log('Effect running...');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio); // Improve rendering on high-DPI displays
    mountRef.current.appendChild(renderer.domElement);
    console.log('Renderer appended to mountRef');

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(code); // Ensure 'code' holds the correct path
    console.log('Texture loaded:', earthTexture);
    const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    camera.position.z = 15;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (animationRunning) {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.001;
        renderer.render(scene, camera);
      }
    };

    setAnimationRunning(true);
    animate();

    return () => {
      console.log('Cleanup...');
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      // Dispose Three.js objects to prevent memory leaks
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={ mountRef }
      style={ { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, background: '#000' } }
    >
      {/* Add UI elements here if needed */ }
    </div>
  );
};

export default CustomThreeEarth;
