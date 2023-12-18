import * as alt from 'alt-client';
// @ts-ignore
import { setScreenMode } from 'alt:utils';

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
  setScreenMode(false);
  alt.emitRaw('emitToWebView', 'response:webview_setScreen', null);
  alt.emitRaw('request:auth_destroySigninCamera');
});
