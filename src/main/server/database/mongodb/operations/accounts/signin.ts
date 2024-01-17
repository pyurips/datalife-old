import { MongoClient } from 'mongodb';

import getEnvDb from '../../../env_db_handler.js';
import IAccounts from '../../models/accounts';
import sendClientError from '../../../../utils/client_error';

export default async function (discordId: string) {
  const URI = process.env.MONGO_DB_KEY;
  if (!URI || !(typeof URI === 'string')) sendClientError(1705525658);
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
            return createdAccount.insertedId.toString();
          }

          return user._id.toString();
        })
        .finally(async () => await client.close())
    );
    if (!result) return sendClientError(1705526366);
    return result;
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    return sendClientError(1705526054);
  }

  // try {
  //   const user = await collection.findOne({
  //     discordId,
  //   });
  //   if (!user) {
  //     return ''
  //   }
  //   return user._id.toString();
  // } catch (e) {
  //   if (e.name === 'DATALIFEClientError') throw e;
  //   sendClientError(1705526054);
  // } finally {
  //   await client.close();
  // }
}
