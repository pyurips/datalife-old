import 'dotenv/config';
import * as alt from 'alt-server';

import { callableByRPC as playerRPC } from './player.js';
import { callableByRPC as itemRPC } from './item.js';

alt.on('playerConnect', (player) => {
  player.dimension = player.id + 1;
  player.spawn(0, 0, 0, 0);
  player.model = 0x705e61f2;
});

alt.onRpc(
  'rpc',
  async (player, operation: string, data?: unknown) => {
    try {
      const currentOperation = {
        ...playerRPC,
        ...itemRPC,
      };
      return await currentOperation[operation](player, data);
    } catch (e) {
      if (e.name === 'DATALIFEClientError') return e;
      return new Error('Erro interno no servidor. Por favor, tente novamente mais tarde.');
    }
  }
);
