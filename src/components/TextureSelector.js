import React from 'react';
import { useEffect, useState } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';
import { useStore } from '../hooks/useStore';
import { dirtImg, grassImg, glassImg, logImg, woodImg} from '../images/image-loader.js';

const images = {
  // order matters when selecting textures
  // because each texture is assigned a digit
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
}
console.log('Loaded images: ', images)

// selecting textures using keyboard
export const TextureSelector = () => {
  const [visible, setVisible] = useState(false)
  const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture])
  const {
    dirt,
    grass,
    glass,
    wood,
    log,
  } = useKeyboard()

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    }

    const selectedTexture = Object.entries(textures).find(([k, v]) => v)
    if(selectedTexture){
      console.log('selected texture: ', selectedTexture[0])
      setTexture(selectedTexture[0])
    }
  }, [dirt, grass, glass, wood, log])

  useEffect(() => {
    // ui visibility timout set to two seconds
    const visibilityTimeout = setTimeout(() => {
      setVisible(false)
    }, 2000)
    setVisible(true)
    return () => {
      clearTimeout(visibilityTimeout)
    }
  }, [activeTexture])

  // return a div that returns a img
  return visible && (
    <div className='absolute centered texture-selector'>
      {Object.entries(images).map(([k,src]) => {
        return (
          <img
            key={k}
            src={src}
            alt={k}
            className={`${k === activeTexture ? 'active' : ''}`}
          />
        )
      })}
    </div>
  )
}
