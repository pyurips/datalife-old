import * as alt from 'alt-server';
import { verify } from 'jsonwebtoken';

const EVENT_NAME = 'auth_jwtVerify';

type IResponseData = {
  content: any | null;
  statusCode: number;
  error: {
    message: string;
    internalCode: string;
  } | null;
};
