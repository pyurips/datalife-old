import * as alt from 'alt-server';

const EVENT_NAME = 'auth_enterGame';

type IResponseData = {
  content: any | null;
  statusCode: number;
  error: {
    message: string;
    internalCode: string;
  } | null;
};

alt.on(`request:${EVENT_NAME}`, (player: alt.Player) => {
  player.emitRaw('request:auth_enterGame');
  player.model = 0x90769A8F;
  new alt.Vehicle(0x82E47E85, player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
  player.dimension = 0;
});
