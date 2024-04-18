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
  async (player, type: string, operation: string, data?: unknown) => {
    try {
      let currentOperation = null;
      if (type === 'player') {
        currentOperation = playerRPC[operation];
      }
      if (type === 'item') {
        currentOperation = itemRPC[operation];
      }
      if (!currentOperation) throw new Error();
      return await currentOperation(player, data);
    } catch (e) {
      return e;
    }
  }
);
