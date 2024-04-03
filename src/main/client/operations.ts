import CustomCamera from './camera.js';
import Auth from './auth.js';
import Webview from './webview.js';

function getOperation(type: string, operation: string) {
  if (type === 'customCamera') {
    return CustomCamera[operation];
  }
  if (type === 'auth') {
    return Auth[operation];
  }
  if (type === 'webview') {
    return Webview[operation];
  }
}

export default getOperation;
