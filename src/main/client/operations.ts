import CustomCamera from './camera.js';
import Auth from './auth.js';
import Utils from './utils.js';
import Vehicle from './vehicle.js';

function getOperation(type: string, operation: string) {
  if (type === 'customCamera') {
    return CustomCamera[operation];
  }
  if (type === 'auth') {
    return Auth[operation];
  }
  if (type === 'utils') {
    return Utils[operation];
  }
  if (type === 'vehicle') {
    return Vehicle[operation];
  }
}

export default getOperation;
