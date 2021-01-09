// code to build and initialize DB goes here
const { type, allPokes } = require("./db_data_pokemon");
const {
  client,
  // other db methods
  createAllTypeEntries,
  createAllPokeEntries,
  createTypeRelation,
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS product_type;
      DROP TABLE IF EXISTS type;
      DROP TABLE IF EXISTS product_reviews;
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS cart_cust_relate;
      DROP TABLE IF EXISTS guest_order;
      DROP TABLE IF EXISTS order_detail;
      DROP TABLE IF EXISTS order_cust_relate;
      DROP TABLE IF EXISTS product;
      DROP TABLE IF EXISTS billing_add;
      DROP TABLE IF EXISTS shipping_add;
      DROP TABLE IF EXISTS customers;
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
        height SMALLINT NOT NULL,
        weight SMALLINT NOT NULL,
        price NUMERIC(5,2) NOT NULL,
        quantity INTEGER NOT NULL
      );

      CREATE TABLE product_type(
        prod_id INTEGER REFERENCES product(prod_id),
        type_id INTEGER REFERENCES type(type_id),
        UNIQUE (prod_id, type_id)
      );

      CREATE TABLE customers(
        cust_id SERIAL PRIMARY KEY,
        firt_name VARCHAR(25) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        cust_email VARCHAR(100) UNIQUE NOT NULL,
        cust_pwd VARCHAR(50),
        isAdmin BOOLEAN DEFAULT false
        );

      CREATE TABLE shipping_add(
        ship_add_id SERIAL PRIMARY KEY,
        cust_id INTEGER,
        ship_add1 VARCHAR(100) NOT NULL,
        ship_add2 VARCHAR(100),
        ship_city VARCHAR(100) NOT NULL,
        ship_state VARCHAR(20) NOT NULL,
        ship_zipcode VARCHAR(10) NOT NULL,
        CONSTRAINT fk_cust_id
          FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id)
        );

      CREATE TABLE billing_add(
        bill_add_id SERIAL PRIMARY KEY,
        cust_id INTEGER,
        bill_add1 VARCHAR(100) NOT NULL,
        bill_add2 VARCHAR(100),
        bill_city VARCHAR(100) NOT NULL,
        bill_state VARCHAR(20) NOT NULL,
        bill_zipcode VARCHAR(10) NOT NULL,
        CONSTRAINT fk_cust_id
          FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id)
        );

      CREATE TABLE order_cust_relate(
        order_id SERIAL PRIMARY KEY,
        cust_id INTEGER,
        order_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        ship_add_id INTEGER,
        bill_add_id INTEGER,
        CONSTRAINT fk_cust_id
          FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id),
        CONSTRAINT fk_ship_add_id
          FOREIGN KEY(ship_add_id)
            REFERENCES shipping_add(ship_add_id),
        CONSTRAINT fk_bill_add_id
          FOREIGN KEY(bill_add_id)
            REFERENCES billing_add(bill_add_id)
        );

       CREATE TABLE order_detail(
        order_id INTEGER,
        prod_id INTEGER,
        order_quantity SMALLINT NOT NULL,
        order_price NUMERIC(6,2) NOT NULL,
        CONSTRAINT fk_order_id
          FOREIGN KEY(order_id)
            REFERENCES order_cust_relate(order_id),
        CONSTRAINT fk_prod_id
          FOREIGN KEY(prod_id)
            REFERENCES product(prod_id)
        );

      CREATE TABLE cart_cust_relate(
        cart_id SERIAL PRIMARY KEY,
        cust_id INTEGER,
        cart_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_cust_id
          FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id)
        );

      CREATE TABLE cart_items(
        cart_id INTEGER,
        prod_id INTEGER,
        cart_quantity SMALLINT NOT NULL,
        cart_price NUMERIC(6,2) NOT NULL,
        CONSTRAINT fk_cart_id
          FOREIGN KEY(cart_id)
            REFERENCES cart_cust_relate(cart_id),
        CONSTRAINT fk_prod_id
          FOREIGN KEY(prod_id)
            REFERENCES product(prod_id)
        );

      CREATE TABLE guest_order(
        order_id INTEGER,
        guest_first_name VARCHAR(25) NOT NULL,
        guest_last_name VARCHAR(50) NOT NULL,
        guest_email VARCHAR(100) NOT NULL,
        CONSTRAINT fk_order_id
          FOREIGN KEY(order_id)
            REFERENCES order_cust_relate(order_id)
        );
        
      CREATE TABLE product_reviews(
        review_id SERIAL PRIMARY KEY,
        prod_id INTEGER,
        cust_id INTEGER,
        review_title VARCHAR(75) NOT NULL,
        review_comment TEXT NOT NULL,
        rating DECIMAL(1) NOT NULL,
        CONSTRAINT fk_prod_id
          FOREIGN KEY(prod_id)
            REFERENCES product(prod_id),
        CONSTRAINT fk_cust_id
          FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id)
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
