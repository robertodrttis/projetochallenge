import React, { useState } from 'react';
import '../styles/estilo.css';

interface PokemonItemProps {
  name: string;
  imageUrl: string;
  abilities: string[];
}

const colors = ['bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-yellow-500'];

const getInitials = (name: string) => {
  const nameParts = name.split(/[\s-]+/);
  const initials = nameParts.slice(0, 2).map(part => part.charAt(0)).join('').toUpperCase();
  return initials;
};

const PokemonItem: React.FC<PokemonItemProps> = ({ name, imageUrl, abilities }) => {
  const [isHovered, setIsHovered] = useState(false);
  const initials = getInitials(name);
  const colorIndex = name.length % colors.length;
  const backgroundColor = `avatar-circle ${colors[colorIndex]}`;

  return (
    <div className="liststyle" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={backgroundColor}>
        {isHovered && imageUrl ? (
          <img src={imageUrl} alt={`Avatar de ${name}`} />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div>
        <div className="pokemon-name">{name}</div>
        <div>
          {abilities.map((ability, index) => (
            <span key={index} className="ability">
              {ability}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const PokemonList = ({ pokemons }: { pokemons: PokemonItemProps[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFocusOnSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      const searchInput = document.querySelector('input[placeholder="Buscar Pokemon"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  return (
    <div onKeyDown={handleFocusOnSearch}>
      {pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm)).map((pokemon) => (
        <PokemonItem key={pokemon.name} {...pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
