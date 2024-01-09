import * as alt from 'alt-server';
import characters_getOne from '../database/mongodb/operations/characters/get_one';
import setResponseData from './response_data_handler';

async function enterGame(player: alt.Player) {
  const dbId = player.getLocalMeta('dbId');
  if (typeof dbId !== 'string')
    return setResponseData({
      data: null,
      status: 401,
      error: {
        internalCode: 1704815546,
      },
    });
  const hasCharacter = await characters_getOne(dbId);
  if (hasCharacter.status === 400) return 'Mandar o cara para tela de criação';
  if (hasCharacter.status === 200)
    return 'Mandar para entrar no jogo normalmente';
  return setResponseData({
    data: null,
    status: 500,
    error: {
      internalCode: 1704815762,
    },
  });
}

export default enterGame;
