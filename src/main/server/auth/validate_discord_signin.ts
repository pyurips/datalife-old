import * as alt from 'alt-server';
import axios from 'axios';
import sendClientError from '../utils/client_error.js';
import discordSigninOrSignup from '../database/mongodb/operations/accounts/signin.js';

async function validateDiscordSignin(player: alt.Player, data?: any) {
  try {
    const response = await axios.get('https://discordapp.com/api/users/@me', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${data.token}`,
      },
    });
    if (!response || !response.data.id) return sendClientError(1705460913);
    const accountData = (await discordSigninOrSignup(response.data.id)) as any;
    if (accountData.acknowledged) {
      const newAccountData = (await discordSigninOrSignup(
        response.data.id
      )) as any;
      return player.setLocalMeta('accountData', newAccountData);
    }
    player.setLocalMeta('accountData', accountData);
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    return sendClientError(1705460706);
  }
}

export default validateDiscordSignin;
