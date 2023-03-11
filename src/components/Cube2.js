import React from 'react';
import { useBox } from '@react-three/cannon';
import * as textures from '../images/texture-loader';

export const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    type: 'Dynamic',
  }));

  const activeTexture = textures[texture + 'Texture']
  console.log('activeTexture', activeTexture)

  return (
    <mesh ref={ref}>
      <meshStandardMaterial attachArray='material' map={activeTexture} />
      <boxGeometry attach='geometry' />
    </mesh>
  )
};
