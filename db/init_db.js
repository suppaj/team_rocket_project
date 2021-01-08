// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS prod_inventory;
      DROP TABLE IF EXISTS billing_add;
      DROP TABLE IF EXISTS shipping_add;
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS cart_cust_relate;
      DROP TABLE IF EXISTS order_detail;
      DROP TABLE IF EXISTS order_cust_relate;
      DROP TABLE IF EXISTS product;
      DROP TABLE IF EXISTS customers;
    `)

    // build tables in correct order
    await client.query(`
      CREATE TABLE customers(
        cust_id SERIAL PRIMARY KEY,
        firt_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        cust_email VARCHAR(255) UNIQUE NOT NULL,
        cust_pwd VARCHAR(255)
        );
      CREATE TABLE product(
        prod_id SERIAL PRIMARY KEY
        );
      CREATE TABLE order_cust_relate(
        order_id SERIAL PRIMARY KEY,
        cust_id INTEGER,
        order_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_cust_id
          FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id)
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
      CREATE TABLE shipping_add(
        ship_add_id SERIAL PRIMARY KEY,
        cust_id INTEGER,
        ship_add1 VARCHAR(255) NOT NULL,
        ship_add2 VARCHAR(255),
        ship_city VARCHAR(255) NOT NULL,
        ship_state VARCHAR(255) NOT NULL,
        ship_zipcode VARCHAR(255) NOT NULL,
        CONSTRAINT fk_cust_id
          FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id)
        );
      CREATE TABLE billing_add(
        bill_add_id SERIAL PRIMARY KEY,
        cust_id INTEGER,
        bill_add1 VARCHAR(255) NOT NULL,
        bill_add2 VARCHAR(255),
        bill_city VARCHAR(255) NOT NULL,
        bill_state VARCHAR(255) NOT NULL,
        bill_zipcode VARCHAR(255) NOT NULL,
        CONSTRAINT fk_cust_id
          FOREIGN KEY(cust_id)
            REFERENCES customers(cust_id)
        );
      CREATE TABLE prod_inventory(
        prod_id INTEGER,
        prod_quantity INTEGER NOT NULL,
        CONSTRAINT fk_prod_id
          FOREIGN KEY(prod_id)
            REFERENCES product(prod_id)
        );
    `)

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());