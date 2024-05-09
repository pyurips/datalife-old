import { getAccountModel } from './mongodb_initialize.js';
import { AccountData } from './types.js';

export async function getAccountByDiscordId(discordId: string) {
  return await getAccountModel().findOne({ discordId }).exec();
}

export async function getAccountById(id: string) {
  return await getAccountModel().findById(id).exec();
}

export async function updateAccountData(
  id: string,
  accountData: Partial<AccountData>
) {
  return await getAccountModel()
    .findByIdAndUpdate(id, accountData, { new: true })
    .exec();
}

export async function signinAccount(discordId: string) {
  const account = await getAccountByDiscordId(discordId);
  if (account) return account;
  return await getAccountModel().create({
    discordId,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    permissionLevel: 0,
  });
}
