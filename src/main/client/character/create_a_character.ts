import * as alt from 'alt-client';

async function createACharacter(characterData: any) {
  await alt.emitRpc('rpc', 'createACharacter', characterData);
}

export default createACharacter;
