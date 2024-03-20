import postegreClient from '..';

async function accounts_signin(discord_id: string) {
  const client = postegreClient();
  await client.connect();
  try {
    const res = await client.query(
      `INSERT INTO accounts (discord_id)
      VALUES ($1)
      ON CONFLICT (discord_id) DO NOTHING
      RETURNING *;
      select * from accounts WHERE discord_id = $1;`,
      [discord_id]
    );
    console.log('Resultado abaixo: ');
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

export default accounts_signin;
