import { MongoClient } from 'mongodb';

import getEnvDb from '../../../env_db_handler.js';
import IAccounts from '../../models/accounts.js';
import sendClientError from '../../../../utils/client_error.js';

async function discordSigninOrSignup(discordId: string) {
  const URI = process.env.MONGO_DB_KEY;
  if (!URI || !(typeof URI === 'string')) return sendClientError(1705525658);
  const client = new MongoClient(URI, {
    minPoolSize: 1,
    maxPoolSize: 10,
  });
  const database = client.db(getEnvDb());
  const collection = database.collection<IAccounts>('accounts');

  try {
    const result = await client.withSession(async (session) =>
      session
        .withTransaction(async (session) => {
          const user = await collection.findOne(
            {
              discordId,
            },
            {
              session,
            }
          );

          if (!user) {
            const createdAccount = await collection.insertOne(
              {
                discordId,
                createdAt: new Date(),
                updatedAt: null,
                lastLogin: null,
                permissionLevel: 0,
                inGame: false,
                prime: null,
                bits: 0,
                supporterPackage: null,
              },
              {
                session,
              }
            );
            return createdAccount;
          }

          return user;
        })
        .finally(async () => await client.close())
    );
    if (!result) return sendClientError(1705526366);
    return result;
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    return sendClientError(1705526054);
  }
}

export default discordSigninOrSignup;
