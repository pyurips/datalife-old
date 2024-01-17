import * as alt from 'alt-server';
import axios from 'axios';
import ClientError from '../utils/client_error.js';

async function validateDiscordSignin(player: alt.Player, data?: any) {
  try {
    const response = await axios.get('https://discordapp.com/api/users/@me', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${data.token}`,
      },
    });
    if (!response || !response.data.id)
      throw new ClientError({
        message:
          'Não conseguimos autenticar sua conta com o Discord no momento. Por favor, tente novamente mais tarde.',
        internalCode: 1705460913,
      });
    alt.log(response.data);
  } catch (e) {
    if (e.internalCode) throw new ClientError({ internalCode: e.internalCode });
    throw new ClientError({ internalCode: 1705460706 });
  }
}

export default validateDiscordSignin;
