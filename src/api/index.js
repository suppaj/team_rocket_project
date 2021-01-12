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
