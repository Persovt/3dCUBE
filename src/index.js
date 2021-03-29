import React, { createRef, useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

const ref = createRef();
const Main = () => {
  
  useEffect(() => {
    
    const scene = new THREE.Scene();
  
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
  
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);
    console.log(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshToonMaterial();
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube, light);
  
    camera.position.z = 5;
  
    const animate = function (event) {
      console.log(event);
  
      cube.rotation.x = event.clientY * 0.01;
      cube.rotation.y = -(event.clientX * 0.01);
  
      renderer.render(scene, camera);
    };
  
    requestAnimationFrame(animate);
    window.onmousemove = animate;
  }, []);
  return (
    <div className="" ref={ref}></div>
  )
}

ReactDOM.render(
  <React.StrictMode>
  <Main/>
  
  </React.StrictMode>,
  document.getElementById("root")
);
