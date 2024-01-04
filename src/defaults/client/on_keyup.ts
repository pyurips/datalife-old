import * as alt from 'alt-client';
// @ts-ignore
import { setScreenMode } from 'alt:utils';

alt.on('keyup', async (key) => {
  if (key === 113) {
    const currentScreen = alt.getMeta('currentScreen');
    if (currentScreen === 'debugHud') {
      setScreenMode(true);
      return alt.setMeta('currentScreen', 'adminPanel');
    }

    setScreenMode(false);
    return alt.setMeta('currentScreen', 'debugHud');
  }
});
