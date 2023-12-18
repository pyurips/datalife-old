import * as alt from 'alt-client';
import * as native from 'natives';

const EVENT_NAME = 'auth_enterGame';

type IResponseData = {
  content: any | null;
  statusCode: number;
  error: {
    message: string;
    internalCode: string;
  } | null;
};

alt.onceServer(`request:${EVENT_NAME}`, () => {
  native.triggerScreenblurFadeOut(100);
  native.displayRadar(true);
  native.displayHud(true);
  alt.toggleGameControls(true);
  alt.emitRaw('request:auth_destroySigninCamera')
});
