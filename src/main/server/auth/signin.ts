import * as alt from 'alt-server';
import axios from 'axios';
import sendClientError from '../utils/client_error.js';
import accounts_signin from '../database/postgresql/accounts/signin.js';

async function auth_signin(player: alt.Player, data?: any) {
  try {
    const response = await axios.get('https://discordapp.com/api/users/@me', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${data.token}`,
      },
    });
    if (!response || !response.data.id) throw sendClientError(1705460913);
    const accountData = await accounts_signin(response.data.id);
    alt.log(accountData);
    // if (accountData) {
    //   player.setMeta('accountData', accountData);
    //   return accountData;
    // }
    // await discordSignup(response.data.id);
    // const newAccountData = await getOneAccount(response.data.id);
    // player.setMeta('accountData', newAccountData);
    return;
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1705460706);
  }
}

export default auth_signin;
