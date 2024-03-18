import React, { useState, useEffect, useRef } from 'react';
import PokemonCard from "./PokemonCard";
import '../styles/estilo.css';


const PokemonList = () => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        const pokemonNames = data.results.map((pokemon: { name: any; }) => pokemon.name);
        setPokemons(pokemonNames);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemons();

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' && focusedIndex < pokemons.length - 1) {
        event.preventDefault();
        setFocusedIndex(focusedIndex + 1);
      } else if (event.key === 'ArrowUp' && focusedIndex > 0) {
        event.preventDefault();
        setFocusedIndex(focusedIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex, pokemons.length]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
    setFocusedIndex(-1);
  };

  const filteredPokemons = pokemons.filter((pokemonName) =>
    pokemonName.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <input
        ref={searchInputRef}
        className="inputStyle mb-5 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Buscar Pokemon"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && filteredPokemons.length > 0) {
            event.preventDefault();
            setFocusedIndex(0);
          }
        }}
      />
      {filteredPokemons.map((pokemonName, index) => (
        <div
          key={pokemonName}
          onMouseEnter={() => setFocusedIndex(index)}
          style={focusedIndex === index ? { backgroundColor: 'lightgray' } : undefined}
          tabIndex={0}
        >
          <PokemonCard name={pokemonName} />
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
