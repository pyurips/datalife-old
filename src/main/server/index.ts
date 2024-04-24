import 'dotenv/config';
import * as alt from 'alt-server';

import {
  callableByRPC as playerRPC,
  player_getCharacterData,
  player_updateNeedsForAll,
} from './player.js';
import { callableByRPC as itemRPC, item_clearDrop } from './item.js';
import { callableByRPC as vehicleRPC } from './vehicle.js';
import {
  initializeMongoDB,
  initializeMongoDBGame,
} from './mongodb_initialize.js';
import { emitToMainWebViewUnique } from './utils.js';

let CAN_CONNECT = false;
const ONE_SECOND = 1000;

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
    if (process.env.NODE_ENV === 'development') alt.logError(e);
    return new Error(
      'Erro interno no servidor. Por favor, tente novamente mais tarde.'
    );
  }
});

alt.on('streamSyncedMetaChange', (entity, key, value, oldValue) => {
  if (entity instanceof alt.Player) {
    if (key === 'character') {
      const characterData = player_getCharacterData(entity);
      return emitToMainWebViewUnique(
        entity,
        'server_getCharacterData',
        characterData
      );
    }
  }
});

setInterval(() => {
  //player_updateNeedsForAll();
  item_clearDrop();
}, ONE_SECOND);
