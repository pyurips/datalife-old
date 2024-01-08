import * as alt from 'alt-server';
import characters_getOne from '../../database/mongodb/operations/characters/get_one.js';

const EVENT_NAME = 'auth_enterGame';

alt.on(`request:${EVENT_NAME}`, async (player: alt.Player) => {
  const userId = player.getLocalMeta('dbId');
  if (typeof userId !== 'string')
    return player.kick(
      'Não conseguimos identificar seu database ID. Por favor, entre em contato com nossa equipe.'
    );
  const response = await characters_getOne(userId);
  if (response.status === 400) return player.emitRaw("request:character_loadIntoCreator");
});
