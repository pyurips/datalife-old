import * as alt from 'alt-server';

const EVENT_NAME = 'auth_enterGame';

alt.on(`request:${EVENT_NAME}`, async (player: alt.Player) => {
  player.emitRaw('request:auth_enterGame');
  player.dimension = 0;
  player.spawn(-763.17, 330.59, 199.49, 0);
  player.rot = new alt.Vector3(0, 0, -3.0605);
  const userId = player.getLocalMeta('dbId');
  alt.once(
    'response:database_accountsGetOne',
    (
      data: unknown,
      status: number,
      error: { message: string; internalError: number }
    ) => {
      alt.log(data);
    }
  );
  alt.emitRaw('request:database_accountsGetOne', userId);
});
