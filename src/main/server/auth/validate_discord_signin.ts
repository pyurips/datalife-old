import * as alt from 'alt-server';
import axios from 'axios';
import sendClientError from '../utils/client_error.js';
import discordSignup from '../database/mongodb/operations/accounts/signup.js';
import getOneAccount from '../database/mongodb/operations/accounts/get_one.js';

async function validateDiscordSignin(player: alt.Player, data?: any) {
  try {
    const response = await axios.get('https://discordapp.com/api/users/@me', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${data.token}`,
      },
    });
    if (!response || !response.data.id) throw sendClientError(1705460913);
    const accountData = await getOneAccount(response.data.id);
    if (accountData) {
      player.setMeta('accountData', accountData);
      return accountData;
    }
    await discordSignup(response.data.id);
    const newAccountData = await getOneAccount(response.data.id);
    player.setMeta('accountData', newAccountData);
    return newAccountData;
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1705460706);
  }
}

export default validateDiscordSignin;
