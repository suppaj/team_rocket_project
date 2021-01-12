import axios from "axios";

export async function getSomething() {
  try {
    const { data } = await axios.get("/api");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addCartItem(cart_id, prod_id, cart_quantity, price, ) {
  try {
    const { data } = await axios.post(`/api/cart/${cart_id}/${prod_id}`, {cart_quantity, price})
    return data

export async function loginCustomer(cust_email, cust_pwd) {
  try {
    const { data } = await axios.post(`/api/customers/login`, {
      cust_email,
      cust_pwd,
    });
    console.log("Visuals for login tests", data);
    return data;

  } catch (error) {
    throw error;
  }
}

export async function patchCartItem(cart_id, cart_quantity, prod_id) {
  try {
    const { data } = await axios.patch(`/api/cart/${cart_id}/${prod_id}`, {cart_quantity})
    return data
  } catch (error) {
    throw error;
  }
}

export async function deleteCartItem(cart_id, prod_id) {
  try {
    const { data } = await axios.delete(`/api/cart/${cart_id}/${prod_id}`)
    return data
  } catch(error){throw error;}}
    
export async function registerCustomer(
  first_name,
  last_name,
  cust_email,
  cust_pwd,
  isAdmin
) {
  try {
    const { data } = await axios.post(`/api/customers/register`, {
      first_name,
      last_name,
      cust_email,
      cust_pwd,
      isAdmin,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
