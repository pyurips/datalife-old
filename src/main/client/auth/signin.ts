import * as alt from 'alt-client';
import loadPlayerIntoWorld from '../character/load_player_into_world.js';
import loadCreator from '../character/load_character_creator.js';

const DISCORD_APP_ID = '1196692311728472097';

async function auth_signin() {
  let token = null;
  try {
    token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
  } catch (_) {
    throw 'Erro na conexão com o Discord. Tente reiniciar o Discord ou o jogo.';
  }

  await alt.emitRpc('rpc', 'auth_signin', { token });
  await loadPlayerIntoWorld();
  // const availableCharacter = await alt.emitRpc('rpc', 'getCharacterData', {
  //   userId: accountData._id,
  // });
  // if (availableCharacter) {
  //   await loadPlayerIntoWorld();
  //   alt.log(accountData);
  //   return alt.setMeta('canOpenScreens', true);
  // }
  // return loadCreator();
}

export default auth_signin;
