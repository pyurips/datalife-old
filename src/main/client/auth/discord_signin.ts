import * as alt from 'alt-client';
import loadPlayerIntoWorld from '../character/load_player_into_world.js';

const DISCORD_APP_ID = '1196692311728472097';

async function auth_discordSignin() {
  let token = null;
  try {
    token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
  } catch (_) {
    throw 'Erro na conexão com o Discord. Tente reiniciar o Discord ou o jogo.'
  }

  try {
    await alt.emitRpc('rpc', 'validateDiscordSignin', { token });
    await loadPlayerIntoWorld();
  } catch (e) {
    throw e;
  }
}

export default auth_discordSignin;
