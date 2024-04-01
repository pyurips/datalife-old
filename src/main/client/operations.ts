import Camera from './camera.js';
import Character from './character.js';

function getOperation(type: string, operation: string) {
  if (type === 'camera') {
    const camera = new Camera();
    return camera[operation].bind(camera);
  }
  if (type === 'character') {
    const character = new Character();
    return character[operation].bind(character);
  }
}

export default getOperation;
