import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// Import komponen material Three.js
import { MeshStandardMaterial, Color, MathUtils } from "three";

export function Planet({ pointer, ...props }) {
  const shapeContainer = useRef(null);
  const shperesContainer = useRef(null);
  const ringContainer = useRef(null);
  const { nodes, materials } = useGLTF("/models/Planet.glb");

  const planetMaterial = new MeshStandardMaterial({
    color: new Color("#0B1530"),
  });
  const ringMaterial = new MeshStandardMaterial({
    color: new Color("#D3D6DC"),
  });
  const satelliteMaterial = new MeshStandardMaterial({
    color: new Color("#7C8FB0"),
  });

  useGSAP(() => {
    const tl = gsap.timeline();

    // Animasi muncul dari bawah
    tl.from(shapeContainer.current.position, {
      y: 5,
      duration: 0.9,
      ease: "circ.out",
    });

    // Animasi rotasi shperesContainer (planet utama & satelit)
    tl.from(
      shperesContainer.current.rotation,
      {
        x: 0,
        y: Math.PI,
        z: -Math.PI,
        duration: 2.2,
        ease: "power1.inOut",
      },
      "-=25%"
    );

    // Animasi rotasi ringContainer
    tl.from(
      ringContainer.current.rotation,
      {
        x: 0.8,
        y: 0,
        z: 0,
        duration: 2.2,
        ease: "power1.inOut",
      },
      "<"
    );

    // Animasi Loop (Tambahan): Rotasi shperesContainer terus menerus setelah intro
    gsap.to(shperesContainer.current.rotation, {
      y: Math.PI * 2, // Rotasi 360 derajat di sumbu Y
      duration: 30, // Durasi rotasi (lebih lambat)
      ease: "none", // Rotasi konstan
      repeat: -1, // Ulangi tak terbatas
      delay: tl.duration(), // Mulai setelah timeline intro selesai
    });

    // Animasi Loop (Tambahan): Rotasi ringContainer terus menerus setelah intro
    gsap.to(ringContainer.current.rotation, {
      y: Math.PI * 2, // Rotasi 360 derajat di sumbu Y
      duration: 20, // Durasi rotasi
      ease: "none", // Rotasi konstan
      repeat: -1, // Ulangi tak terbatas
      delay: tl.duration(), // Mulai setelah timeline intro selesai
    });
  }, []);

  /**
   * Rotasi mengikuti kursor.
   *
   * Diterapkan di grup terluar (shapeContainer) supaya tidak bentrok dengan
   * GSAP: timeline di atas hanya menyentuh position grup ini, sedangkan rotasi
   * idle planet & cincin berjalan di grup anak. Jadi keduanya bisa jalan
   * bersamaan — planet tetap berputar sendiri sambil ikut arah kursor.
   */
  useFrame((state, delta) => {
    if (!shapeContainer.current) return;

    const dt = Math.min(delta, 0.05); // jaga-jaga setelah pindah tab
    const cursor = pointer?.current;
    const active = cursor?.active ?? false;

    const targetY = active ? cursor.x * 0.6 : 0;
    const targetX = active ? -cursor.y * 0.35 : 0;

    shapeContainer.current.rotation.y = MathUtils.damp(
      shapeContainer.current.rotation.y,
      targetY,
      4,
      dt
    );
    shapeContainer.current.rotation.x = MathUtils.damp(
      shapeContainer.current.rotation.x,
      targetX,
      4,
      dt
    );
  });

  return (
    <group ref={shapeContainer} {...props} dispose={null}>
      <group ref={shperesContainer}>
        {/* Planet Utama (Sphere) */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={planetMaterial} // <--- Menggunakan material kustom untuk Planet
          rotation={[0, 0, 0.741]}
        />
        {/* Satelit (Sphere2) */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere2.geometry}
          material={satelliteMaterial} // <--- Menggunakan material kustom untuk Satelit
          position={[0.647, 1.03, -0.724]}
          rotation={[0, 0, 0.741]}
          scale={0.223}
        />
      </group>
      {/* Cincin (Ring) */}
      <mesh
        ref={ringContainer}
        castShadow
        receiveShadow
        geometry={nodes.Ring.geometry}
        material={ringMaterial} // <--- Menggunakan material kustom untuk Cincin
        rotation={[-0.124, 0.123, -0.778]}
        scale={1.6}
      />
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");
