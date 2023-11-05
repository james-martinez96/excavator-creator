import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_VELOCITY = 5;
const SPEED = 4;
export const Player = ({ position }) => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboard();
  // console.log('moveForward', Object.entries(useKeyboard).filter(([k, v]) => v)) // Debug

  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position,
  }));

  // set velocity
  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v;
    });
  }, [api.velocity]);

  // set position
  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  useFrame(() => {
    // console.log('frame') // Debug
    // copy position every frame
    // so the camera follows the sphere
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2]),
    );

    // Movement
    // TODO: look into Vector3 more
    // if both keys a pressed they are cancel each other out
    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
    );

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0,
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    // apply direction vector to the sphere
    api.velocity.set(direction.x, vel.current[1], direction.z);

    // jump
    if (jump && Math.abs(vel.current[1]) < 0.5) {
      api.velocity.set(vel.current[0], JUMP_VELOCITY, vel.current[2]); // velocity
    }
    // console.log(vel.current) // Debug
  });

  return <mesh ref={ref}></mesh>;
};
