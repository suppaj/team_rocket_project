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
      INSERT INTO product(dex_id, name, description, height, weight, price,quantity)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `,
      [dex_id, name, description, height, weight, price, 10]
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

async function getAllProducts() {
  try {
    const { rows: pokemon } = await client.query(`SELECT * FROM product`);

    const products = await _buildTypes(pokemon);

    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const { rows: pokemon } = await client.query(
      `SELECT * FROM product WHERE prod_id = ${id}`
    );
    const [product] = await _buildTypes(pokemon);

    console.log(product);
    return product;
  } catch (error) {
    throw error;
  }
}

async function _buildTypes(array) {
  try {
    const { rows: type_relations } = await client.query(`
      SELECT prod_id, name FROM product_type
      LEFT JOIN type on product_type.type_id = type.type_id
    `);
    let products = [...array];

    for (let product of products) {
      product.type = [];
      for (let type of type_relations) {
        if (type.prod_id === product.prod_id) {
          product.type.push(type.name);
        }
      }
    }

    return products;
  } catch (error) {
    throw error;
  }
}

async function db_getAllTypes() {
  try {
    const { rows: types } = await client.query(`
      SELECT *
      FROM type
    `);
    return types;
  } catch (error) {
    throw error;
  }
}

async function db_addCartItem(cart_id, prod_id, cart_quantity, price) {
  try {
    await client.query(
      `
      INSERT INTO cart_items(cart_id, prod_id, cart_quantity, cart_price)
      VALUES ($1, $2, $3, $4);
    `,
      [cart_id, prod_id, cart_quantity, price]
    );

    const products = await _getUserCart(cart_id);

    const cart = await _buildTypes(products);

    return cart;
  } catch (error) {
    throw error;
  }
}

async function _getUserCart(cart_id) {
  try {
    const { rows: cart } = await client.query(
      `
      SELECT * FROM product
      NATURAL JOIN cart_items
      WHERE cart_id=$1;
    `,
      [cart_id]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function db_patchCartItem(cart_id, prod_id, cart_quantity) {
  try {
    await client.query(
      `
      UPDATE cart_items
      SET cart_quantity=$1
      WHERE cart_id=${cart_id} AND prod_id=${prod_id}
    `,
      [cart_quantity]
    );

    return { message: "Success, Cart updated" };
  } catch (error) {
    throw error;
  }
}

async function db_deleteCartItem(cart_id, prod_id) {
  try {
    await client.query(`
      DELETE FROM cart_items
      WHERE cart_id=${cart_id} AND prod_id=${prod_id}
    `);
    return { message: "Success, item removed from your cart." };
  } catch (error) {
    throw error;
  }
}

async function _getUserCart(cart_id) {
  try {
    const { rows: cart } = await client.query(
      `
      SELECT * FROM product
      NATURAL JOIN cart_items
      WHERE cart_id=$1;
    `,
      [cart_id]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

// Customer Methods //

async function db_createCustomer({
  first_name,
  last_name,
  cust_email,
  cust_pwd,
  is_admin,
}) {
  try {
    const { rows } = await client.query(
      `
    
    INSERT INTO customers(
      first_name,
      last_name,
      cust_email,
      cust_pwd,
      is_admin)
      VALUES($1,$2,$3,$4,$5)
      ON CONFLICT (cust_email) DO NOTHING
      RETURNING *;
    
    `,
      [first_name, last_name, cust_email, cust_pwd, is_admin]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function db_getAllCustomers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM customers;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function db_getCustomerById(customerID) {
  try {
    const {
      rows: [customer],
    } = await client.query(`
      SELECT *
      FROM customers
      WHERE cust_id=${customerID};
    `);

    if (!customer) {
      return null;
    }

    console.log("this is my customer", customer);
    return customer;
  } catch (error) {
    throw error;
  }
}

async function db_getCustomerByEmail(cust_email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM customers
      WHERE cust_email=$1;
    `,
      [cust_email]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function db_getCustomerCart(cust_email) {
  try {
    const customer = await db_getCustomerByEmail(cust_email);

    const {
      rows: [cart],
    } = await client.query(
      `
      SELECT *
      FROM cart_cust_relate
      WHERE cust_id=$1;
    `,
      [`${customer.cust_id}`]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

// admin methods

async function db_deleteRelationProductById(prod_id, type_id) {
  try {
    await client.query(`
      DELETE
      FROM cart_items
      WHERE prod_id=${prod_id}
      RETURNING *;
    `);

    await client.query(`
      DELETE
      FROM order_detail
      WHERE prod_id=${prod_id}
      RETURNING *;
    `);

    await client.query(`
      DELETE
      FROM product_reviews
      WHERE prod_id=${prod_id}
      RETURNING *;
    `);

    await client.query(`
      DELETE
      FROM product_type
      WHERE prod_id=${prod_id} AND  type_id=${type_id}
      RETURNING *;
    `);

    await client.query(`
      DELETE
      FROM product
      WHERE prod_id=${prod_id}
      RETURNING *;

    `);
  } catch (error) {
    throw error;
  }
}

async function db_deleteProductById(prod_id) {
  try {
    await client.query(`
      DELETE
      FROM product
      WHERE prod_id=${prod_id}
      RETURNING *;
    `);
  } catch (error) {
    throw error;
  }
}

async function db_updateProduct(prod_id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      UPDATE product
      SET ${setString}
      WHERE prod_id=${prod_id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function db_getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM customers;
    `);
    return rows;
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
  getAllProducts,
  getProductById,
  db_getAllTypes,
  db_addCartItem,
  db_patchCartItem,
  db_deleteCartItem,
  db_createCustomer,
  db_getAllCustomers,
  db_getCustomerById,
  db_getCustomerByEmail,
  db_getCustomerCart,
  db_deleteProductById,
  db_updateProduct,
  db_deleteRelationProductById,
};
