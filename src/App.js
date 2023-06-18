import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

import { Ground } from './components/Ground'
import { Cube } from './components/Cube'
import { Player } from './components/Player'
import { FPV } from './components/FPV'
import { Cubes } from './components/Cubes'
import { TextureSelector } from './components/TextureSelector'
import { Menu } from './components/Menu'

function App () {
  return (
    <>
      <div>outside canvas</div>

      <Canvas>
        <Sky sunPosition={(100, 20, 100)} />
        <ambientLight intensity={0.25} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <FPV />
        <Physics /* gravity={[0, -30, 0]} */>
          <Player position={[0, 1, 0]} />
          <Cube position={[0, 0, -5]} texture='woodTexture' />
          <Cubes />
          <Ground position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </Physics>
      </Canvas>

      {/* this div has to be outside <Canvas /> */}
      <div className='absolute centered cursor'>+</div>
      <TextureSelector/>
      <Menu/>
    </>
  )
}

export default App
