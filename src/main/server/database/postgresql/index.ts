import { Client } from 'pg';

function postegreClient() {
  return new Client({
    connectionString: process.env.POSTGRE_CONNECTION_STRING,
  });
}

export default postegreClient;
