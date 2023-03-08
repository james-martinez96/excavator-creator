import React from 'react';
import { usePlane } from '@react-three/cannon';
import { groundTexture } from '../images/texture-loader';
import { NearestFilter, RepeatWrapping } from 'three';

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 4, 0, 0], position: [0,0,0]
  }))

  // wrap texture
  groundTexture.magFilter = NearestFilter
  groundTexture.wrapS = RepeatWrapping
  groundTexture.wrapT = RepeatWrapping
  groundTexture.repeat.set(100,100)

  return (
    <mesh ref={ref}>
      <planeGeometry attach={'geometry'} args={[100,100]}/>
      <meshStandardMaterial attach={'material'} map={groundTexture}/>
    </mesh>
  )
}
