// code to build and initialize DB goes here
const { type, allPokes } = require("./db_data_pokemon");
const {
  client,
  // other db methods
  createAllTypeEntries,
  createAllPokeEntries,
  db_createCustomer,
  db_getCustomerById,
  db_createProductReview,
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
      CREATE TABLE sales(
        transaction_id SERIAL PRIMARY KEY,
        transaction_date DATE NOT NULL,
        prod_id INTEGER REFERENCES product(prod_id)
      );

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
        quantity INTEGER NOT NULL,
        is_active BOOLEAN DEFAULT true
      );

      CREATE TABLE product_type(
        prod_id INTEGER REFERENCES product(prod_id),
        type_id INTEGER REFERENCES type(type_id),
        UNIQUE (prod_id, type_id)
      );

      CREATE TABLE customers(
        cust_id SERIAL PRIMARY KEY,
        first_name VARCHAR(25) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        cust_email VARCHAR(100) UNIQUE NOT NULL,
        cust_pwd VARCHAR(50),
        is_admin BOOLEAN DEFAULT false
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
            REFERENCES product(prod_id),
          UNIQUE (cart_id, prod_id)
        );

      CREATE TABLE guest_order(
        order_id INTEGER,
        guest_first_name VARCHAR(25) NOT NULL,
        guest_last_name VARCHAR(50) NOT NULL,
        guest_email VARCHAR(100) NOT NULL,
        ship_add1 VARCHAR(100) NOT NULL,
        ship_add2 VARCHAR(100),
        ship_city VARCHAR(100) NOT NULL,
        ship_state VARCHAR(20) NOT NULL,
        ship_zipcode VARCHAR(10) NOT NULL,
        bill_add1 VARCHAR(100) NOT NULL,
        bill_add2 VARCHAR(100),
        bill_city VARCHAR(100) NOT NULL,
        bill_state VARCHAR(20) NOT NULL,
        bill_zipcode VARCHAR(10) NOT NULL,
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

    console.log("Loading sample customers");
    // guest account
    await db_createCustomer({
      first_name: "GUEST",
      last_name: "GUEST",
      cust_email: "GUEST@teamrocket.com",
      cust_pwd: "1qaz2wsx!QAZ@WSX",
      is_admin: false,
    });
    //guest shipping and billing
    // await client.query(`
    //   INSERT INTO
    //     shipping_add(cust_id, ship_add1, ship_city, ship_state, ship_zipcode)
    //     VALUES (1,'GUEST ACCOUNT', 'GUEST ACCOUNT', 'GUEST ACCOUNT', '00000-0000');
    //   INSERT INTO
    //     billing_add(cust_id, bill_add1, bill_city, bill_state, bill_zipcode)
    //     VALUES (1,'GUEST ACCOUNT', 'GUEST ACCOUNT', 'GUEST ACCOUNT', '00000-0000');
    // `)

    await db_createCustomer({
      first_name: "Site",
      last_name: "Admin",
      cust_email: "admin@teamrocket.com",
      cust_pwd: "1234",
      is_admin: true,
    });

    await db_createCustomer({
      first_name: "Hercules",
      last_name: "Asbury",
      cust_email: "hasbury0@cisco.com",
      cust_pwd: "IUhJp2i",
      is_admin: false,
    });

    await db_createCustomer({
      first_name: "Frederico",
      last_name: "Rossant",
      cust_email: "frossant2@e-recht24.de",
      cust_pwd: "V5sqK20ov9xN",
      is_admin: false,
    });

    await db_createCustomer({
      first_name: "Biddy",
      last_name: "Arstall",
      cust_email: "barstall3@is.gd",
      cust_pwd: "kNlH81WX8",
      is_admin: false,
    });

    await db_createCustomer({
      first_name: "Elnar",
      last_name: "MacVagh",
      cust_email: "emacvagh4@accuweather.com",
      cust_pwd: "PD3cW3ShhtT",
      is_admin: false,
    });

    await db_createCustomer({
      first_name: "Josh",
      last_name: "Suppa",
      cust_email: "jsuppa@teamrocket.com",
      cust_pwd: "bulbasaur",
      is_admin: true,
    });

    console.log("Test of helper functions");
    await db_getCustomerById(2);

    console.log("Creating sample product reviews for Bulbasaur");
    await db_createProductReview({
      prod_id: 1,
      cust_id: 3,
      rating: 5,
      review_title: "I love Bulbasaur",
      review_comment: "I love this pokemon! He is the best Pokemon ever made!",
    });

    await db_createProductReview({
      prod_id: 1,
      cust_id: 4,
      rating: 3,
      review_title: "I think Bulbasaur is pretty okay",
      review_comment:
        "I do not love or hate this pokemon. He is a Pokemon that was made.",
    });

    await db_createProductReview({
      prod_id: 1,
      cust_id: 5,
      rating: 1,
      review_title: "I hate Bulbasaur",
      review_comment: "I hate this pokemon! He is the worst Pokemon ever made!",
    });

    console.log("Finished populating database!");
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
