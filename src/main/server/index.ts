import 'dotenv/config';
import * as alt from 'alt-server';

import { callableByRPC as playerRPC } from './player.js';
import { callableByRPC as itemRPC } from './item.js';
import { callableByRPC as vehicleRPC } from './vehicle.js';
import {
  initializeMongoDB,
  initializeMongoDBGame,
} from './mongodb_initialize.js';

let CAN_CONNECT = false;

alt.on('serverStarted', async () => {
  await initializeMongoDB();
  await initializeMongoDBGame();
  CAN_CONNECT = true;
});

alt.on('playerConnect', (player) => {
  if (!CAN_CONNECT)
    return player.kick(
      'Servidor não está pronto. Por favor, tente novamente mais tarde.'
    );
  player.dimension = player.id + 1;
  player.spawn(0, 0, 0, 0);
  player.model = 0x705e61f2;
});

alt.on('playerDisconnect', (player, reason) => {});

alt.onRpc('rpc', async (player, operation: string, data?: unknown) => {
  try {
    const currentOperation = {
      ...playerRPC,
      ...itemRPC,
      ...vehicleRPC,
    };
    return await currentOperation[operation](player, data);
  } catch (e) {
    if (e.name === 'DATALIFEClientError') return e;
    return new Error(
      'Erro interno no servidor. Por favor, tente novamente mais tarde.'
    );
  }
});
