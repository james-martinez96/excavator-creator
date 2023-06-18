import { create } from 'zustand'
import { nanoid } from 'nanoid'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

/** for storing and removing cubes from the world */
export const useStore = create((set) => ({

  // this is the default selected texture
  texture: 'dirt',

  // load world or start new world
  cubes: getLocalStorage('cubes') || [],

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
        return X !== x || Y !== y || Z !== z
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
  saveWorld: () => {
    set((prev) => {
      setLocalStorage('cubes', prev.cubes)
      console.log('Saved', prev.cubes)
      return prev
    })
  },

  // reset world
  resetWorld: () => {
    set(() => ({
      cubes: []
    }))
  }
}))
