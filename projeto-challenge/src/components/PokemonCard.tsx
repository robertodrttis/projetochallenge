import React, { useState, useEffect } from 'react';
import { fetchPokemonByName } from '../services/pokemonService';
import PokemonItem from "./PokemonItem";

type PokemonSprites = {
  front_default: string;
};

type PokemonAbility = {
  ability: {
    name: string;
  };
};

type PokemonDetails = {
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  name: string; 
};

const PokemonCard: React.FC<{ name: string }> = ({ name }) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('error:', error);
      }
    };

    if (name) {
      fetchPokemonDetails();
    }
  }, [name]);

  return (
    <>
      {pokemon && (
        <PokemonItem
          pokemons={[
            {
              name: pokemon.name,
              imageUrl: pokemon.sprites.front_default ?? '',
              abilities: pokemon.abilities.map(ability => ability.ability.name),
            },
          ]}
        />
      )}
      {!pokemon && <p>Carregando dados do Pokémon...</p>}
    </>
  );
};

export default PokemonCard;
