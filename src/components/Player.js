import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';

export const Player = ({ position }) => {
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position,
  }))

  // set velocity
  const vel = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => vel.current = v)
  }, [api.velocity])

  // set position
  const pos = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe((p) => pos.current = p)
  }, [api.position])

  useFrame(() => {
    console.log('frame')
    // copy position every frame
    // so the camera follows the sphere
    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))
    api.velocity.set(0, 0, 0) // velocity
  })

  return (
    <mesh ref={ref}></mesh>
  )
}
