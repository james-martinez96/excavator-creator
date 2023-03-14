import React from 'react';
import { useBox } from '@react-three/cannon';
import * as textures from '../images/texture-loader';
import { useStore } from '../hooks/useStore';

export const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({
    position,
    type: 'Static',
  }));

  const [addCube] = useStore((state) => [state.addCube])

  const activeTexture = textures[texture + 'Texture']
  // console.log('active Texture', activeTexture, texture)

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation()
        // divide faceIndex to be in range 0-5 instead of 0-11
        const clickedFace = Math.floor(e.faceIndex / 2)
        const [x, y, z] = ref.current.position

        console.log('face', clickedFace)

        // determine witch face was clicked and add a cube next to it
        switch (clickedFace) {
          case 0:
            addCube(x + 1, y, z);
            break;
          case 1:
            addCube(x - 1, y, z);
            break;
          case 2:
            addCube(x, y + 1, z);
            break;
          case 3:
            addCube(x, y - 1, z);
            break;
          case 4:
            addCube(x, y, z + 1);
            break;
          case 5:
            addCube(x, y, z - 1);
            break;
          default:
            break
        }
      }}
      ref={ref}>
      <meshStandardMaterial attachArray='material' map={activeTexture} />
      <boxGeometry attach='geometry' />
    </mesh>
  )
};
