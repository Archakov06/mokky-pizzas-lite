import axios from 'axios';

// Укажите свой PROJECT_ID
// Массив пицц хранится тут https://gist.github.com/Archakov06/9b37cd4ee27458bf9e2d337ab0d41dd8
const API_BASE_URL = 'https://PROJECT_ID.mokky.ru';

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
