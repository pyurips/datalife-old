import * as alt from 'alt-server';
import sendClientError from '../utils/client_error.js';
//import getOneCharacter from '../database/mongodb/operations/characters/get_one.js';

async function getCharacterData(player: alt.Player, data?: any) {
  try {
    if (!data.userId) throw sendClientError(1705554615);
    //const character = await getOneCharacter(data.userId);
    //return character;
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1705554221);
  }
}

export default getCharacterData;
