import * as alt from 'alt-client';

const DISCORD_APP_ID = '1196692311728472097';

class Auth {
  static async getDiscordToken() {
    try {
      const token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
      return { token };
    } catch (_) {
      throw 'Erro na conexão com o Discord. Tente reiniciar o Discord ou o jogo.';
    }
  }
}

export default Auth;
