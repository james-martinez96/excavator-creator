import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { useKeyboard } from '../hooks/useKeyboard';

const JUMP_VELOCITY = 5

export const Player = ({ position }) => {

  // Debug
  const actions = useKeyboard()
  console.log('actions', Object.entries(actions).filter(([k, v]) => v))

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
    console.log('frame') // Debug
    // copy position every frame
    // so the camera follows the sphere
    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

    // jump
    if (actions.jump && Math.abs(vel.current[1]) < 0.5) {
      api.velocity.set(vel.current[0], JUMP_VELOCITY, vel.current[2]) // velocity
    }
    console.log(vel.current)
  })

  return (
    <mesh ref={ref}></mesh>
  )
}
