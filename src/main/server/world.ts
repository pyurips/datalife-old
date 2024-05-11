import * as alt from 'alt-server';
import { checkPlayer } from './middlewares.js';
import { player_getCharacterData } from './player.js';
import { sendClientError } from './utils.js';

alt.onRpc(
  'world_teleportToCoords',
  (player, data: { x: number; y: number; z: number; playerId?: string }) => {
    checkPlayer(player, 2);
    let targetPlayer = player;
    if (data?.playerId)
      targetPlayer = alt.Player.all.find(
        (p) => player_getCharacterData(p)._id === data.playerId
      );
    if (!targetPlayer) throw sendClientError(0, false, "Player doesn't exist");
    targetPlayer.pos = new alt.Vector3(data.x, data.y, data.z);
  }
);

alt.onRpc(
  'world_teleportPlayerToOther',
  (player, data: { firstId: string; secondId: string }) => {
    checkPlayer(player, 2);
    const firstPlayer = alt.Player.all.find(
      (p) => player_getCharacterData(p)._id === data.firstId
    );
    const secondPlayer = alt.Player.all.find(
      (p) => player_getCharacterData(p)._id === data.secondId
    );
    if (!firstPlayer || !secondPlayer)
      throw sendClientError(0, false, 'One of the players does not exist');
    firstPlayer.pos = secondPlayer.pos;
  }
);
