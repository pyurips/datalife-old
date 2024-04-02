import CustomCamera from './camera.js';
import Auth from './auth.js';

function getOperation(type: string, operation: string) {
  if (type === 'customCamera') {
    return CustomCamera[operation];
  }
  if (type === 'auth') {
    return Auth[operation];
  }
}

export default getOperation;
