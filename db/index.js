// Connect to DB
require("dotenv").config();
const { Client } = require("pg");
const DB_URL = process.env.DATABASE_URL;
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

    await createAllTypeRelations(type, entry.prod_id, name);

    console.log("Entry complete:", entry);
    console.log(" ");
    return entry;
  } catch (error) {
    throw error;
  }
}
async function createAllTypeRelations(type_collection, prod_id, prod_name) {
  console.log(`Creating type relations for ${prod_name}`);
  for (const type_id of type_collection) {
    const entry = await createTypeRelation(type_id, prod_id);
  }
}

async function createTypeRelation(type_id, prod_id) {
  try {
    const {
      rows: [entry],
    } = await client.query(
      `
      INSERT INTO product_type(prod_id, type_id)
      VALUES ($1,$2)
      RETURNING *
    `,
      [prod_id, type_id]
    );
    console.log("Type relationship entry complete:", entry);
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  // db methods
  createAllTypeEntries,
  createAllPokeEntries,
};
