import * as alt from 'alt-client';
import { deleteSigninCamera } from './camera.js';
import { setMainPage } from './webview.js';
import { setCanInteract } from './interation.js';

const DISCORD_APP_ID = '1196692311728472097';

export async function auth_signin() {
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
    }, 1_000)
  );
  setMainPage('mainHud');
  deleteSigninCamera();
  await alt.emitRpc('rpc', 'player_loadIntoWorld');
  setCanInteract(true);
}

export const callableByRPC = {
  auth_signin,
  auth_signinTest,
};
