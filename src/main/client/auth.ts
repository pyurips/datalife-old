import * as alt from 'alt-client';
import { deleteSigninCamera } from './camera.js';
import { setPage } from './webview.js';

const DISCORD_APP_ID = '1196692311728472097';

export async function getDiscordToken() {
  try {
    const token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
    return { token };
  } catch (_) {
    throw 'Erro na conexão com o Discord. Tente reiniciar o Discord ou o jogo.';
  }
}

export async function auth_signinTest() {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(null);
    }, 3000)
  );
  setPage('mainHud');
  deleteSigninCamera();
  await alt.emitRpc('rpc', 'player_loadIntoWorld');
}

export const callableByRPC = {
  auth_signinTest,
};
