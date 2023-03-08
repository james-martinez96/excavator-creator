import React from 'react';
import { useBox } from '@react-three/cannon';
import * as textures from '../textures';

export const Cube = ({ position, type, ...props }) => {
  const [ref] = useBox(() => ({
    position,
    type: 'Static',
    ...props
  }));

  return <mesh castShadow ref={ref}>
    {[Array(6)].map((_,index) => (
    <meshStandardMaterial
      attachArray='material'
      map={textures[type]}
      key={index}
    />
    ))}
    <boxGeometry attach='geometry'/>
  </mesh>;
};
