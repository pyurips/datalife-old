import 'dotenv/config';
import * as alt from 'alt-server';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const EVENT_NAME = 'auth_jwtCreator';
const JWT_ACCESS_KEY = process.env.JWT_KEY;

type IResponseData = {
  content: any | null;
  statusCode: number;
  error: {
    message: string;
    internalCode: string;
  } | null;
};

alt.on(`request:${EVENT_NAME}`, (player: alt.Player, accessToken: string) => {
  player.emitRaw(
    'request:auth_sendJwtToLocalStorage',
    sign({ accessToken }, JWT_ACCESS_KEY)
  );
});
