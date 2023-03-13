import React from 'react';
import { usePlane } from '@react-three/cannon';
import { groundTexture } from '../images/texture-loader';
import { RepeatWrapping } from 'three';
import { useStore } from '../hooks/useStore';

export const Ground = ({ position, rotation }) => {
  const [ref] = usePlane(() => ({
    rotation,
    position,
  }))

  const [addCube] = useStore((state) => [state.addCube])

  // wrap texture
  groundTexture.wrapS = RepeatWrapping
  groundTexture.wrapT = RepeatWrapping
  groundTexture.repeat.set(100, 100)

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation()
        // Math.ceil is inacurate when placing cubes
        const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val))
        addCube(x, y, z)
        console.log(e.point)
      }}
      ref={ref}
    >
      <planeGeometry attach={'geometry'} args={[100, 100]} />
      <meshStandardMaterial attach={'material'} map={groundTexture} />
    </mesh>
  )
}
