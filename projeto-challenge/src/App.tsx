import React from 'react';
import { QueryClientProvider } from 'react-query';
import PokemonList from './components/PokemonList';
import './App.css';
import queryClient from "./queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>Pokémon List:</h1>
          <PokemonList />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;