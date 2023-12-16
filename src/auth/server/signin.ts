import * as alt from 'alt-server';

alt.onClient('request:testando', (player: alt.Player, data: unknown) => {
  //console.log(data);

  player.emitRaw('emitToWebView', 'response:testando', { data: "Os dados do servidor" });
});