import 'dotenv/config';
import * as alt from 'alt-server';

import {
  callableByRPC as playerRPC,
  player_emitCharacterDataToMainWebView,
} from './player.js';
import { callableByRPC as itemRPC, item_clearDrop } from './item.js';
import { callableByRPC as vehicleRPC } from './vehicle.js';
import { callableByRPC as interactionRPC } from './interaction.js';
import {
  initializeMongoDB,
  initializeMongoDBGame,
} from './mongodb_initialize.js';

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

alt.on('playerDeath', (victim, killer, weaponHash) => {
  victim.spawn(-14.295, 24.695, 71.656);
});

alt.onRpc('rpc', async (player, operation: string, data?: unknown) => {
  try {
    const currentOperation = {
      ...playerRPC,
      ...itemRPC,
      ...vehicleRPC,
      ...interactionRPC,
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
    player_emitCharacterDataToMainWebView(entity, key);
  }
});

setInterval(() => {
  //player_updateNeedsForAll();
  item_clearDrop();
}, ONE_SECOND);
