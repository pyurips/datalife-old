import * as alt from 'alt-client';

const EVENT_NAME = 'auth_sendJwtToLocalStorage';

alt.onServer(`request:${EVENT_NAME}`, (accessToken: string) => {
  alt.LocalStorage.set('accessToken', accessToken);
  alt.LocalStorage.save();
  alt.log(accessToken);
});
