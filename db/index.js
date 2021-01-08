// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'kylho:Kory78@localhost:5432/teamrocket_db'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

// export
module.exports = {
  client,
  // db methods
}