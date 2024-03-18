import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import PokemonCard from "../components/PokemonCard";


fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

const mockPokemonData = {
  sprites: {
    front_default: 'http://example.com/sprite.png'
  },
  abilities: [
    { ability: { name: 'overgrow' } },
    { ability: { name: 'chlorophyll' } }
  ],
  name: 'bulbasaur'
};

describe('PokemonCard', () => {
  test('fetches pokemon details and displays them', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));
    
    render(<PokemonCard name="bulbasaur" />);
    
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur')).toHaveAttribute('src', 'http://example.com/sprite.png');
  });

  test('displays loading message while fetching pokemon details', () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));
    
    render(<PokemonCard name="bulbasaur" />);
    
    expect(screen.getByText('Carregando dados do Pokémon...')).toBeInTheDocument();
  });

  test('handles fetch error', async () => {
    fetchMock.mockReject(new Error('API is down'));
    
    render(<PokemonCard name="bulbasaur" />);
    
    await waitFor(() => expect(screen.getByText('Carregando dados do Pokémon...')).toBeInTheDocument());
  });
});
