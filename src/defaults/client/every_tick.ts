import * as alt from 'alt-client';

alt.everyTick(() => {
  alt.emitRaw('request:debug_getGeneralInfos');
});
