import axios from "axios";

const API_BASE_URL = "https://9303851354d5e8f0.mokky.dev";

export const getPizzas = async (params) => {
  const response = await axios.get(`${API_BASE_URL}/pizzas`, {
    params,
  });
  return response.data;
};

export const getOnePizza = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pizzas/${id}`);
  return response.data;
};
