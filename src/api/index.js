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

export async function getAllTypes() {
  try {
    const { data } = await axios.get("/api/products/types");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(product_id) {
  try {
    const { data } = await axios.get(`/api/products/${product_id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addCartItem(cart_id, prod_id, cart_quantity, price) {
  try {
    const { data } = await axios.post(`/api/cart/${cart_id}/${prod_id}`, {
      cart_quantity,
      price,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginCustomer(cust_email, cust_pwd) {
  try {
    const { data } = await axios.post(`/api/customers/login`, {
      cust_email,
      cust_pwd,
    });
    console.log("login response", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function patchCartItem(cart_id, cart_quantity, prod_id) {
  try {
    const { data } = await axios.patch(`/api/cart/${cart_id}/${prod_id}`, {
      cart_quantity,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCartItem(cart_id, prod_id) {
  try {
    const { data } = await axios.delete(`/api/cart/${cart_id}/${prod_id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

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

    console.log("register response", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCheckoutSession(sessionArr) {
  try {
    const { data } = await axios.post(
      "/api/checkout/create-checkout-session",
      sessionArr
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postPaymentIntent(cart) {
  try {
    const { data } = await axios.post(
      "/api/checkout/create-payment-intent",
      cart
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function recordGuestOrder(cart, formInfo) {
  try {
    const { data } = await axios.post("/api/checkout/guestorder", {
      cart,
      formInfo,
    });
  } catch (error) {
    throw error;
  }
}

export async function getAllCustomers() {
  try {
    const { data } = await axios.get(`/api/admin/view_customers`);
    console.log("these are customers", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCustomerByEmail(cust_email) {
  try {
    const { data } = await axios.get(`api/admin/customers_email`, {
      cust_email,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getOrderHistoryByCustomerId(customerId) {
  try {
    const { data } = await axios.get(`api/admin/customers_history`, {
      customerId,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
