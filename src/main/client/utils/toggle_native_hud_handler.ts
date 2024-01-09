import * as alt from 'alt-client';
import * as native from 'natives';
import { showCursor } from './cursor_handler.js';

function toggleNativeHudHandler(
  displayState: boolean,
  cursorState: boolean,
  controlsState: boolean
) {
  native.displayRadar(displayState);
  native.displayHud(displayState);
  showCursor(cursorState);
  alt.toggleGameControls(controlsState);
}

export default toggleNativeHudHandler;
