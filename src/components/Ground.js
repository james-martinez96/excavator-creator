import React from 'react';
import { usePlane } from '@react-three/cannon';
import { groundTexture } from '../images/texture-loader';
import { RepeatWrapping } from 'three';

export const Ground = ({ position, rotation }) => {
  const [ref] = usePlane(() => ({
    rotation,
    position,
  }))

  // wrap texture
  groundTexture.wrapS = RepeatWrapping
  groundTexture.wrapT = RepeatWrapping
  groundTexture.repeat.set(100, 100)

  return (
    <mesh ref={ref}>
      <planeGeometry attach={'geometry'} args={[100, 100]} />
      <meshStandardMaterial attach={'material'} map={groundTexture} />
    </mesh>
  )
}
