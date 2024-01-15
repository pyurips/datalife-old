// import * as alt from 'alt-server';
// import characters_getOne from '../database/mongodb/operations/characters/get_one.js';
// import setResponseData from './response_data_handler.js';
// import { emitter } from './cevents.js';

// async function enterGame(player: alt.Player) {
//   const dbId = player.getLocalMeta('dbId');
//   if (typeof dbId !== 'string')
//     return setResponseData({
//       data: null,
//       status: 401,
//       error: {
//         internalCode: 1704815546,
//       },
//     });
//   const hasCharacter = await characters_getOne(dbId);
//   if (hasCharacter.status === 400) return emitter(player, 'request', 'client', 'character_loadCreator', null);
//   if (hasCharacter.status === 200)
//     return 'Mandar para entrar no jogo normalmente';
//   return setResponseData({
//     data: null,
//     status: 500,
//     error: {
//       internalCode: 1704815762,
//     },
//   });
// }

// export default enterGame;
