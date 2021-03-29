import React, { createRef, useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ref = createRef();

const Main = () => {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    ref.current.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    let loader = new GLTFLoader();
    let obj = null;
    loader.load("3d/scene.gltf", function (gltf) {
      obj = gltf;
      scene.add(obj.scene);
    });

    camera.position.z = 20;

    let bool = false;
    const animate = function (event) {
      requestAnimationFrame(animate);

      if (obj) {
        obj.scene.rotation.y += 0.01;

        if (camera.position.y > 19) bool = true;
        if (camera.position.y < 0) bool = false;
        if (bool) camera.position.y -= 0.05;
        else camera.position.y += 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();
  }, []);
  return <div className="" ref={ref}></div>;
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
