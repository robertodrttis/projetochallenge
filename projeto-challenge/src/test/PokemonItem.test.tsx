import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonList from "../components/PokemonItem";


describe('PokemonList and PokemonItem', () => {
  const pokemons = [
    { name: 'Bulbasaur', imageUrl: 'http://example.com/bulbasaur.png', abilities: ['overgrow', 'chlorophyll'] },
    { name: 'Charmander', imageUrl: 'http://example.com/charmander.png', abilities: ['blaze', 'solar-power'] },
  ];

  test('renders pokemon list', () => {
    render(<PokemonList pokemons={pokemons} />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('shows initials when not hovered', () => {
    render(<PokemonList pokemons={pokemons} />);
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  test('shows image when hovered', () => {
    render(<PokemonList pokemons={pokemons} />);
    fireEvent.mouseEnter(screen.getByText('B'));
    expect(screen.getByAltText('Avatar de Bulbasaur')).toBeInTheDocument();
  });

  test('filters pokemons based on search', () => {
    render(<PokemonList pokemons={pokemons} />);
    fireEvent.change(screen.getByPlaceholderText('Buscar Pokemon'), {
      target: { value: 'char' },
    });
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
  });

  test('focuses search input when the specific keyboard event is triggered', () => {
    render(<PokemonList pokemons={pokemons} />);
    const searchInput = screen.getByPlaceholderText('Buscar Pokemon');
    fireEvent.keyDown(document, { key: '/', ctrlKey: true });
    expect(searchInput).toHaveFocus();
  });
});
