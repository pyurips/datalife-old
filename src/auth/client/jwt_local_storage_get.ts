import * as alt from 'alt-client';

const EVENT_NAME = 'auth_getJwtFromLocalStorage';

alt.onServer(`request:${EVENT_NAME}`, () => {
  alt.emitServerRaw(
    `response:${EVENT_NAME}`,
    alt.LocalStorage.get('accessToken')
  );
});
