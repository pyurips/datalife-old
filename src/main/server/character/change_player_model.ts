import * as alt from 'alt-server';

alt.onClient('request:character_changePlayerModel', (player, model: number) => {
  player.model = model;
});
