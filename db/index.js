// Connect to DB
const { Client } = require("pg");
const DB_NAME = "untitled_team_rocket_project";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

// import data from db_data_pokemon
const { type, allPokes } = require("./db_data_pokemon.js");

// database methods

async function createAllTypeEntries(collection) {
  console.log("Type collection:", collection);
  for (const index in collection) {
    const entry = await createTypeEntry(collection[index]);
  }
}

async function createTypeEntry({ name }) {
  console.log(`Adding ${name} to the database...`);
  try {
    const {
      rows: [entry],
    } = await client.query(
      `
      INSERT INTO type(name)
      VALUES ($1)
      RETURNING *
    `,
      [name]
    );
    console.log("Entry complete:", entry);
    console.log(" ");
    return entry;
  } catch (error) {
    throw error;
  }
}

async function createAllPokeEntries(collection) {
  console.log("Pokemon collection:", collection);
  for (const index in collection) {
    const entry = await createPokeEntry(collection[index]);
  }
}

async function createPokeEntry({
  dex_id,
  name,
  type,
  description,
  height,
  weight,
  price,
}) {
  console.log(`Adding ${name} to the database...`);
  try {
    const {
      rows: [entry],
    } = await client.query(
      `
      INSERT INTO product(dex_id, name, description, height, weight, price)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
    `,
      [dex_id, name, description, height, weight, price]
    );
    console.log("Entry complete:", entry);
    console.log(" ");
    return entry;
  } catch (error) {
    throw error;
  }
}

// async function createAllTypeRelations(collection, name) {
//   for (const item in collection) {
//     const entry = await createTypeRelation(item, name);
//   }
// }

// export
module.exports = {
  client,
  // db methods
  createAllTypeEntries,
  createAllPokeEntries,
};
