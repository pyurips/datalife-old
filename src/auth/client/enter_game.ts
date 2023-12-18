import * as alt from 'alt-client';

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
  
});
