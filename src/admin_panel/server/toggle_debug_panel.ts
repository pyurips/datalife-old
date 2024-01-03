import * as alt from 'alt-server';

const EVENT_NAME = 'debug_toggleMode';

alt.on(`request:${EVENT_NAME}`, (player: alt.Player, state: boolean) => {
  player.setLocalMeta('debugMode', state);
});
