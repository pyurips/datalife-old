import postegreClient from '..';

async function accounts_get_one(id: string) {
  const client = postegreClient();
  await client.connect();
  try {
    const res = await client.query('SELECT * from accounts where id = $1', [
      id,
    ]);
    console.log("Resultado abaixo: ");
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

export default accounts_get_one;
