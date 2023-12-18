import * as alt from 'alt-client';
// @ts-ignore
import { loadMainInterface } from 'alt:webviews_handlers';
import {
  createCustomCamera,
  renderCustomCamera,
  pointCustomCameraAtCoord,
  destroyCustomCamera,
  setScreenMode
  // @ts-ignore
} from 'alt:utils';

alt.on('connectionComplete', async () => {
  const signinCamera = createCustomCamera(
    new alt.Vector3(-485, 1095.75, 350),
    new alt.Vector3(0, 0, 0),
    40
  );
  pointCustomCameraAtCoord(
    signinCamera,
    new alt.Vector3(402.8664, -996.4108, -98.5)
  );
  renderCustomCamera(signinCamera);
  setScreenMode(true);
  await loadMainInterface();

  alt.once('request:auth_destroySigninCamera', () => {
    destroyCustomCamera(signinCamera);
  });
});
