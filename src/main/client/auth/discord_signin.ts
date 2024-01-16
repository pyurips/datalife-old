import * as alt from 'alt-client';

const DISCORD_APP_ID = '1196692311728472097';

async function auth_discordSignin() {
  const token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
  alt.log(token);
}

export default auth_discordSignin;