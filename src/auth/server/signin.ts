import * as alt from 'alt-server';

const EVENT_NAME = 'testando';

alt.onClient(`request:${EVENT_NAME}`, (player: alt.Player, data: unknown) => {
  console.log(data);

  player.emitRaw('emitToWebView', `response:${EVENT_NAME}`, {
    content: 'Os dados do servidor',
  });
});
