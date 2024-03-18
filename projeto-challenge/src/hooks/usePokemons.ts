import { useQuery } from 'react-query';
import axios from 'axios';

type PokemonSummary = {
  name: string;
  url: string; 
};

type PokemonListResponse = {
  results: PokemonSummary[];
};

export const usePokemons = () => {
  return useQuery<PokemonListResponse>('pokemons', () => {
    return axios.get('https://pokeapi.co/api/v2/pokemon').then(res => res.data);
  });
};
