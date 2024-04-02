import * as alt from 'alt-client';
import CustomCamera from './camera.js';
import Utils from './utils.js';
import Webview from './webview.js';

class Default {
  static onConnectionComplete() {
    alt.on('connectionComplete', async () => {
      CustomCamera.createSigninCamera();
      Utils.setPageMode(true);
      await Webview.loadWebView(0);
    });
  }

  static onEveryTick() {}

  static onKeyUp() {}
}

export default Default;
