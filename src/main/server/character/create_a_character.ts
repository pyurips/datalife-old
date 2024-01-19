import * as alt from 'alt-server';
import sendClientError from '../utils/client_error.js';

async function createACharacter(player: alt.Player, data?: any) {
  const regexName =
    /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]+( [A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]+)*$/;
  if (data.name) return sendClientError(1705686372);
  if (data.name.length > 25) return sendClientError(1705686372);
  if (!regexName.test(data.name)) return sendClientError(1705686557);
}

export default createACharacter;
