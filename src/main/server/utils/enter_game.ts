import { requester } from './cevents.js';
import * as alt from 'alt-server';

async function enterGame(player: alt.Player) {
  const data = await requester(player, 'client', 'testing', {
    message: 'Olá, meu bem',
  });
  alt.log(data);
}

export default enterGame;
