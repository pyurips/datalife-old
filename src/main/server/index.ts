import 'dotenv/config';
import * as alt from 'alt-server';
import { item_clearDrop } from './item.js';
import {
  initializeMongoDB,
  initializeMongoDBGame,
} from './mongodb_initialize.js';

import 'auth.js';
import 'interaction.js';
import 'item.js';
import 'player.js';
import 'vehicle.js';
import 'world.js';

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

setInterval(() => {
  //player_updateNeedsForAll();
  item_clearDrop();
}, ONE_SECOND);
