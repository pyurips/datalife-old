import * as alt from 'alt-server';
import axios from 'axios';
import sendClientError from '../utils/client_error.js';

async function validateDiscordSignin(player: alt.Player, data?: any) {
  try {
    const response = await axios.get('https://discordapp.com/api/users/@me', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${data.token}`,
      },
    });
    if (!response || !response.data.id) sendClientError(1705460913);
    alt.log(response.data);
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    sendClientError(1705460706);
  }
}

export default validateDiscordSignin;
