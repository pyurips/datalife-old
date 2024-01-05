import { MongoClient, ObjectId } from 'mongodb';

import { selectDB, gameCollectionsList } from '../../../../utils/dbEnvHandler';

import IAccounts from '../../models/accounts';

async function accounts_getOne (userId: string) {
  const URI = process.env.MONGO_DB_KEY;
  if (!URI || !(typeof URI === 'string')) throw new ClientError({ code: 6 });
  const client = new MongoClient(URI, {
    minPoolSize: 1,
    maxPoolSize: 10,
  });
  const database = client.db(selectDB('game'));
  const collection = database.collection<IAccounts>(
    gameCollectionsList.accounts
  );

  try {
    const user = await collection.findOne(
      {
        _id: new ObjectId(userId),
      },
      {
        projection: {
          _id: 0,
          email: 1,
          twoFA: 1,
          permissionLevel: 1,
          inGame: 1,
          prime: 1,
          bits: 1,
          supporterPackages: 1,
        },
      }
    );
    if (!user) throw new ClientError({ code: 7 });
    return user;
  } catch (_) {
    throw new ClientError({ code: 8 });
  } finally {
    await client.close();
  }
}

export default accounts_getOne;