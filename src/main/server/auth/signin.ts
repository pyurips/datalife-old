import * as alt from 'alt-server';
import axios from 'axios';
import enterGame from '../utils/enter_game.js';
import { emitter } from '../utils/cevents.js';

const EVENT_NAME = 'auth_signin';

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
      if (response.status === 200) {
        player.setLocalMeta('dbId', response.data);
        const enteredGameResponse = await enterGame(player);
        emitter(player, 'response', 'mainInterface', 'auth_signin', { data: null, status: 200, error: null });
      }
    } catch (e) {
      player.emitRaw('emitToWebView', `response:${EVENT_NAME}`, {
        data: null,
        status: e.response.status,
        error: {
          message: e.response.data.message,
          internalCode: e.response.data.internalCode,
        },
      });
    }
  }
);