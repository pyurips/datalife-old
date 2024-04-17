import * as alt from 'alt-client';
import CustomCamera from './camera.js';
import Utils from './utils.js';
import Webview from './webview.js';
import Character from './character.js';
import Interation from './interation.js';

class Default {
  static onConnectionComplete() {
    alt.on('connectionComplete', async () => {
      CustomCamera.createSigninCamera();
      Utils.setPageMode(true);
      await Webview.loadWebView(0);
      Webview.toggleFocus(0, true);
    });
  }

  static onEveryTick() {
    alt.everyTick(() => {
      //Character.defaultCharacterBehaviors();
      Interation.vehicleInteration();
    });
  }
}

export default Default;
