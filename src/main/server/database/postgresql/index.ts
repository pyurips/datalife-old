import pkg from 'pg';
const { Client } = pkg;

function postegreClient() {
  return new Client({
    connectionString: process.env.POSTGRE_CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

export default postegreClient;
