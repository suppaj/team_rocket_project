// Connect to DB
const { Client } = require("pg");
const DB_URL = process.env.DATABASE_URL;
const client = new Client(DB_URL);

// database methods
console.log('db_url', process.env.DATABASE_URL);
// export
module.exports = {
  client,
  // db methods
};
