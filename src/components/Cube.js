import React from 'react';
import { useBox } from '@react-three/cannon';
import * as textures from '../images/texture-loader';

export const Cube = ({ position, type }) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    type: 'Dynamic',
  }));

  return (
    <mesh castShadow ref={ref}>
      {[Array(6)].map((_, index) => (
        <meshStandardMaterial
          attachArray='material'
          map={textures[type]}
          key={index}
        />
      ))}
      <boxGeometry attach='geometry' />
    </mesh>
  )
};
