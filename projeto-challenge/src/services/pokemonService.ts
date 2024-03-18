import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async () => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=100`);
  return response.data;
};

export const fetchPokemonByName = async (name: string) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};
