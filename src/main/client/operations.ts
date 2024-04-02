import Character from './character.js';
import CustomCamera from './camera.js';

function getOperation(type: string, operation: string) {
  if (type === 'character') {
    const character = new Character();
    return character[operation].bind(character);
  }
  if (type === 'customCamera') {
    const customCamera = new CustomCamera();
    return customCamera[operation].bind(customCamera);
  }
}

export default getOperation;
