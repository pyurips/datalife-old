import * as alt from 'alt-client';

const DISCORD_APP_ID = '1196692311728472097';

async function auth_discordSignin() {
  try {
    const token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
    await alt.emitRpc('rpc', 'validateDiscordSignin', { token });
  } catch (e) {
    if (e.internalCode) throw e;
    throw new Error(
      'Erro na conexão com o Discord. Tente reiniciar o Discord ou o jogo.'
    );
  }
}

export default auth_discordSignin;
