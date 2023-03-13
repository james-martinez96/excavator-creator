import React from 'react';
import { useBox } from '@react-three/cannon';
import * as textures from '../images/texture-loader';

export const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({
    position,
    type: 'Static',
  }));

  const activeTexture = textures[texture + 'Texture']
  // console.log('active Texture', activeTexture, texture)

  return (
    <mesh ref={ref}>
      <meshStandardMaterial attachArray='material' map={activeTexture} />
      <boxGeometry attach='geometry' />
    </mesh>
  )
};
