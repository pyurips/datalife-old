import * as alt from 'alt-client';

alt.on('keyup', (key) => {
  if (key === 113) {
    const accountData = alt.getLocalMeta('accountData') as any;
    if (accountData.permissionLevel === 0) return;
    if (alt.getMeta('currentScreen') === 'adminPanel')
      return alt.setMeta('currentScreen', 'mainHud');
    return alt.setMeta('currentScreen', 'adminPanel');
  }

  if (key === 66) {
    if (!alt.getMeta('canOpenScreens')) return;
    if (alt.getMeta('currentScreen') === 'characterMenu')
      return alt.setMeta('currentScreen', 'mainHud');
    return alt.setMeta('currentScreen', 'characterMenu');
  }

  if (key === 75) {
    alt.emitRpc('rpc', 'toggleVehicleEngine');
  }

  if (key === 76) {
    alt.emitRpc('rpc', 'toggleVehicleLock');
  }
});
