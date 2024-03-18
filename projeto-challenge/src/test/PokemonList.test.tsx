import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
import PokemonList from "../components/PokemonList";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders without crashing', () => {
  render(<PokemonList />);
});

test('loads and displays pokemons', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    results: [{ name: 'bulbasaur' }, { name: 'pikachu' }]
  }));

  render(<PokemonList />);

  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  expect(screen.getByText('pikachu')).toBeInTheDocument();
});

test('searches for a pokemon', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    results: [{ name: 'bulbasaur' }, { name: 'pikachu' }]
  }));

  render(<PokemonList />);

  const input = screen.getByPlaceholderText('Buscar Pokemon');
  fireEvent.change(input, { target: { value: 'pika' } });

  await waitFor(() => {
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });
});

test('handles keyboard events', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({
    results: [{ name: 'bulbasaur' }, { name: 'pikachu' }]
  }));

  render(<PokemonList />);

  const input = screen.getByPlaceholderText('Buscar Pokemon');
  fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
  

  await waitFor(() => {
    expect(input).toHaveFocus();
  });
});
