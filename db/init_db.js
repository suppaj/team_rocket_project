// code to build and initialize DB goes here
const { type, allPokes } = require("./db_data_pokemon");
const {
  client,
  // other db methods
  createAllTypeEntries,
  createAllPokeEntries,
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS product_type;
      DROP TABLE IF EXISTS product;
      DROP TABLE IF EXISTS type;
    `);

    console.log("Finished dropping tables!");
    console.log("");

    // build tables in correct order
    console.log("Starting to build tables!");

    await client.query(`
      CREATE TABLE type(
        type_id SERIAL PRIMARY KEY,
        name VARCHAR(255)
      );

      CREATE TABLE product(
        prod_id SERIAL PRIMARY KEY,
        dex_id INTEGER NOT NULL,
        name VARCHAR(255),
        description TEXT NOT NULL,
        height INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        price INTEGER NOT NULL
      );

      CREATE TABLE product_type(
        prod_id INTEGER REFERENCES product(product_id),
        type_id INTEGER REFERENCES type(type_id)
      );

    `);

    console.log("Finished building tables!");
    console.log("");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log("Populating initial data...");
    console.log(" ");

    console.log("Creating all type entries...");
    const allTypes = await createAllTypeEntries(type);
    console.log(" ");

    console.log("Creating all product (pokemon) entries...");
    const allProducts = await createAllPokeEntries(allPokes);
    console.log(" ");

    console.log("Finished populating database!");
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
