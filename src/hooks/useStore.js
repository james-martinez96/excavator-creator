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
  removeCube: () => { },

  // set cube texture
  setTexture: () => { },

  // save world
  saveWorld: () => { },
}))
