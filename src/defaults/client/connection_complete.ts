import * as alt from 'alt-client';
import * as native from 'natives';
// @ts-ignore
import { loadMainInterface } from 'alt:webviews_handlers';

alt.on('connectionComplete', async () => {
  native.triggerScreenblurFadeIn(100);
  native.displayRadar(false);
  native.displayHud(false);
  alt.showCursor(true);
  alt.toggleGameControls(false);
  await loadMainInterface();
});