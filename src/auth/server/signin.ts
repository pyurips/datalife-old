import * as alt from 'alt-server';
import axios from 'axios';

const EVENT_NAME = 'auth_signin';

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
  async (player: alt.Player, data: { email: string; password: string }) => {
    try {
      const response = await axios.post(DEFAULT_URL + '/accounts/signin', {
        email: data.email,
        password: data.password,
      });

      const responseData: IResponseData = {
        statusCode: response.status,
        content: null,
        error: null,
      };
      player.emitRaw('emitToWebView', `response:${EVENT_NAME}`, responseData);
      if (response.status === 200) {
        player.setLocalMeta('dbId', response.data);
        //alt.emitRaw('request:auth_jwtCreator', player, response.data);
        alt.emitRaw('request:auth_enterGame', player);
      }
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
