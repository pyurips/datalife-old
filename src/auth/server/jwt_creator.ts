import * as alt from 'alt-server';
import { sign } from 'jsonwebtoken';

const EVENT_NAME = 'auth_jwtCreator';

type IResponseData = {
  content: any | null;
  statusCode: number;
  error: {
    message: string;
    internalCode: string;
  } | null;
};

alt.on(`request:${EVENT_NAME}`, (token: string) => {
  alt.log(token);
});