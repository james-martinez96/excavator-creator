import React from 'react';
import { useStore } from '../hooks/useStore';
import { Cube } from './Cube2'

// this runs everytime we jump after we reset the world
// ???
export const Cubes = () => {
  const [cubes] = useStore((state) => [
    state.cubes
  ])

  console.log('Cubes:', cubes)

  return cubes.map(({ key, position, texture }) => {
    return (
      <Cube key={key} position={position} texture={texture} />
    )
  })
}
