import * as alt from 'alt-client';
import IAccount from '../../shared/IAccount';

export async function account_getOne(data: any) {
  const accountData = alt.getLocalMeta('accountData') as IAccount;
  alt.log(accountData);
  return accountData;
}
