import * as alt from 'alt-server';
import sendClientError from '../utils/client_error.js';
//import createOneCharacter from '../database/mongodb/operations/characters/create_one.js';

async function createACharacter(player: alt.Player, data?: any) {
  const accountData = player.getMeta('accountData') as any;
  //const characterCreated = await createOneCharacter(accountData._id, data);
  //alt.log(characterCreated);
}

export default createACharacter;
