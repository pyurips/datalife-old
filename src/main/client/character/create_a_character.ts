import * as alt from 'alt-client';

async function createACharacter(characterData: any) {
  await alt.emitRpc('rpc', 'createACharacter', characterData);
  //alt.removeIpl('apa_v_mp_h_01_b');
}

export default createACharacter;
