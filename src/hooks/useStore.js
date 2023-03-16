import { create } from 'zustand';
import { nanoid } from 'nanoid'

export const useStore = create((set) => ({

  texture: 'dirt',

  cubes: [
    // // these are for testing
    // {
    //   key: nanoid(),
    //   position: [0, 1, -5],
    //   texture: 'dirt',
    // },
    // {
    //   key: nanoid(),
    //   position: [0, 2, -5],
    //   texture: 'glass',
    // }
  ],

  // add cube to world
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          position: [x, y, z],
          texture: prev.texture
        }
      ]
    }))
  },

  // remove cube from world
  // keep cubes that are not equal to x,y,z being passed in
  removeCube: (x, y, z) => {
    console.log('removed cube at: ', x, y, z)
    set((prev) => ({
      cubes: prev.cubes.filter(cube => {
        const [X, Y, Z] = cube.position
        return X != x || Y != y || Z != z
      })
    }))
  },

  // set cube texture
  // based on the incoming texture
  setTexture: (texture) => {
    set(() => ({
      texture
    }))
  },

  // save world
  saveWorld: () => { },
}))
