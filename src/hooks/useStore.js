import { create } from 'zustand';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  cubes: getLocalStorage('world') || [{ pos: [0, 0, 0], type: 'wood' }],

  // add new cube to cubes array
  addCube: (x, y, z, type) =>
    set((state) => ({
      cubes: [...state.cubes, { pos: [x, y, z], type }],
    })),

  // remove cube
  removeCube: (x, y, z) => set((state) => 
    // if any coords do not match keep if else filter it out
    state.cubes.filter(cube => cube.x !== x || cube.y !== y || cube.z !== z
    )
  ),

  // set texture
  // wood is the default
  texture: 'wood',
  setTexture: (texture) => set((state) => ({ texture })),

  // save cube
  saveWorld: () => set((state => {
    setLocalStorage('world', state.cubes)
  })),
}))
