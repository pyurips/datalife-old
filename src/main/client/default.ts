import * as alt from 'alt-client';
import CustomCamera from './camera.js';
import Utils from './utils.js';
import Webview from './webview.js';
import Character from './character.js';

class Default {
  static onConnectionComplete() {
    alt.on('connectionComplete', async () => {
      CustomCamera.createSigninCamera();
      Utils.setPageMode(true);
      await Webview.loadWebView(0);
    });
  }

  static onEveryTick() {
    alt.everyTick(() => {
      Character.defaultCharacterBehaviors();
    });
  }
}

export default Default;
