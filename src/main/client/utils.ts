import * as alt from 'alt-client';
import * as native from 'natives';

class Utils {
  static cursorCount = 0;

  static showCursor(state: boolean) {
    if (state) {
      Utils.cursorCount += 1;
      try {
        alt.showCursor(true);
      } catch (_) {}
    } else {
      for (let i = 0; i < Utils.cursorCount; i++) {
        try {
          alt.showCursor(false);
        } catch (_) {}
      }
      Utils.cursorCount = 0;
    }
  }

  static setPageMode(state: boolean) {
    if (state) {
      native.triggerScreenblurFadeIn(100);
    } else {
      native.triggerScreenblurFadeOut(100);
    }
    Utils.toggleNativeHud(!state);
    Utils.showCursor(state);
    alt.toggleGameControls(!state);
  }

  static toggleNativeHud(state: boolean) {
    native.displayRadar(state);
    native.displayHud(state);
  }
}

export default Utils;