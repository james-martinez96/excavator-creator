import dirtImg from './dirt.jpg'
import grassImg from './grass.jpg'
import glassImg from './glass.png'
import logImg from './log.jpg'
import woodImg from './wood.png'
import { NearestFilter, TextureLoader } from 'three'

const dirtTexture = new TextureLoader().load(dirtImg)
const grassTexture = new TextureLoader().load(grassImg)
const glassTexture = new TextureLoader().load(glassImg)
const woodTexture = new TextureLoader().load(woodImg)
const logTexture = new TextureLoader().load(logImg)
const groundTexture = new TextureLoader().load(grassImg)

// useing nearest filter for textures
dirtTexture.magFilter = NearestFilter
grassTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
groundTexture.magFilter = NearestFilter

export {
  dirtTexture,
  grassTexture,
  glassTexture,
  woodTexture,
  logTexture,
  groundTexture
}
