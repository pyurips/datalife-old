import * as alt from 'alt-client';

export async function account_getOne(data: any) {
  const accountData = alt.getLocalMeta('accountData');
  return accountData;
}
