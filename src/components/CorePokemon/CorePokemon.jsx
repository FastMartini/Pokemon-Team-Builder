import React from 'react';
import PokeImg from '../image-box-select/PokeImg';
import './CorePokemon.css';
import { pokemonTypes } from '../../data/pokemonTypes';
import { typeBackgrounds } from '../../assets/typeBackgrounds'; 

export default function CorePokemon({ pokemon, setPokemon }) {
  // Get the Pokémon's type(s) from the mapping, or empty array if not found
  const types = pokemonTypes[pokemon] || [];

  // Grab the primary type (first in the array) or default if none
  const primaryType = types[0] || 'default';

  // Find the correct background image for the type, or fallback to default
  const bgUrl = typeBackgrounds[primaryType] || typeBackgrounds.default;

  return (
    <section
      id="core-pokemon"
      className={`corePokemon ${primaryType === 'default' ? 'default-bg' : ''}`}
      // Adds a special `default-bg` class only if no type is selected
    >
      {/* Render the background image div only when we have a valid type */}
      {bgUrl && primaryType !== 'default' && (
        <div 
          className="core-bg" 
          key={primaryType} 
          style={{ backgroundImage: `url(${bgUrl})` }} 
        />
      )}

      {/* Semi-transparent overlay for readability over busy backgrounds */}
      <div className="core-bg-overlay" />

      {/* Foreground container (content sits above the bg + overlay) */}
      <div className="core-content">
        {/* Displays the Pokémon sprite image */}
        <PokeImg pokemon={pokemon} />
        
        <h2>Choose Your Core Pokémon</h2>

        <div className="dexNav">
          <button className="arrow-btn left">Prev</button>
          <button className="arrow-btn right">Next</button>
        </div>

        <div className="coreControls">
          {/* Dropdown for picking a Pokémon */}
          <select value={pokemon} onChange={e => setPokemon(e.target.value)}>
            <option value="">-- pick one --</option>
            <option value="Sprigatito">Sprigatito</option>
            <option value="Fuecoco">Fuecoco</option>
            <option value="Quaxly">Quaxly</option>
          </select>

          {/* Button confirms the selection */}
          <button
            className="btn"
            disabled={!pokemon} // Disabled if no Pokémon is selected
            onClick={() => {
              alert(`You chose ${pokemon}!`);
              // Scrolls smoothly to the Archetype section
              document.getElementById('Archetype')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Select
          </button>
        </div>
      </div>
    </section>
  );
}
