import * as alt from 'alt-client';
import * as native from 'natives';
// @ts-ignore
import { loadMainInterface } from 'alt:webviews_handlers';
// @ts-ignore
import { createCustomCamera, renderCustomCamera, pointCustomCameraAtCoord } from 'alt:utils';

alt.on('connectionComplete', async () => {
  const signinCamera = createCustomCamera(new alt.Vector3(-485, 1095.75, 350), new alt.Vector3(0, 0, 0), 40);
  pointCustomCameraAtCoord(signinCamera, new alt.Vector3(402.8664, -996.4108, -98.5));
  renderCustomCamera(signinCamera);
  native.triggerScreenblurFadeIn(100);
  native.displayRadar(false);
  native.displayHud(false);
  alt.showCursor(true);
  alt.toggleGameControls(false);
  await loadMainInterface();

  alt.onceServer('auth_destroySigninCamera', () => {
    
  });
});