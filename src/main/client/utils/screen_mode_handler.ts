import * as alt from 'alt-client';
import * as native from 'natives';
import { showCursor } from './cursor_handler.js';

export function setScreenMode(state: boolean) {
  if (state) {
    native.triggerScreenblurFadeIn(100);
  } else {
    native.triggerScreenblurFadeOut(100);
  }
  native.displayRadar(!state);
  native.displayHud(!state);
  showCursor(state);
  alt.toggleGameControls(!state);
}
