/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
const CustomThreeGeometry = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(18, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a simple cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "#f5f5f5" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Position camera
    camera.position.z = 5;

    // Assign refs for cleanup
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Resize handling
    const handleResize = () => {
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {

      window.removeEventListener('resize', handleResize);
      mountRef?.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ mountRef } style={ { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 } } />;
}

export default CustomThreeGeometry