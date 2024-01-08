import * as alt from 'alt-server';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

const EVENT_NAME = 'auth_jwtVerify';
const JWT_ACCESS_KEY = process.env.JWT_KEY;

alt.on(`request:${EVENT_NAME}`, (player: alt.Player, accessToken: string) => {
  alt.onceClient(
    'response:auth_getJwtFromLocalStorage',
    (player: alt.Player, accessToken: string) => {
      const { accessKey }: any = verify(accessToken, JWT_ACCESS_KEY);
    }
  );
  alt.emitClientRaw(player, 'request:auth_getJwtFromLocalStorage');
});
