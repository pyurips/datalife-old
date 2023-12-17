import * as alt from 'alt-server';
import axios from 'axios';

const EVENT_NAME = 'auth_signinTwoFa';

type IResponseData = {
  content: any | null;
  statusCode: number;
  error: {
    message: string;
    internalCode: string;
  } | null;
};

const DEFAULT_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.dataliferp.com'
    : 'http://localhost:3500';

alt.onClient(
  `request:${EVENT_NAME}`,
  async (player: alt.Player, data: { email: string; password: string, verificationCode: string }) => {
    try {
      const response = await axios.post(DEFAULT_URL + '/accounts/signintwofa', {
        email: data.email,
        password: data.password,
        verificationCode: data.verificationCode
      });

      const responseData: IResponseData = {
        statusCode: response.status,
        content: null,
        error: null,
      };
      player.emitRaw('emitToWebView', `response:${EVENT_NAME}`, responseData);
    } catch (e) {
      const responseData: IResponseData = {
        statusCode: e.response.status,
        content: null,
        error: {
          message: e.response.data.message,
          internalCode: e.response.data.internalCode,
        },
      };
      player.emitRaw('emitToWebView', `response:${EVENT_NAME}`, responseData);
    }
  }
);
