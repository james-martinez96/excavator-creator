import React, { useEffect, useMemo } from "react";
import { usePlane } from "@react-three/cannon";
import { grassTexture } from "../images/texture-loader";
import { RepeatWrapping } from "three";
import { useStore } from "../hooks/useStore";

export const Ground = ({ position, rotation }) => {
  const [ref] = usePlane(() => ({
    rotation,
    position,
    type: "Static",
  }));

  const [addCube] = useStore((state) => [state.addCube]);

  const groundTexture = useMemo(() => {
    const tex = grassTexture.clone(); // clone avoids shared mutable state
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    tex.repeat.set(100, 100);
    console.log("ground")
    return tex;
  }, []);

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        // Math.ceil is inaccurate when placing cubes
        const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
        addCube(x, y, z);
        console.log("Clicked Ground: ", e.point);
      }}
      ref={ref}
    >
      <planeGeometry attach={"geometry"} args={[100, 100]} />
      <meshStandardMaterial attach={"material"} map={groundTexture} />
    </mesh>
  );
};
