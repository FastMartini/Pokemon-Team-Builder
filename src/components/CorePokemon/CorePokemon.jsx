import React from 'react';
import PokeImg from '../image-box-select/PokeImg';
import './CorePokemon.css';
import { pokemonTypes } from '../../data/pokemonTypes';
import { typeBackgrounds } from '../../assets/typeBackgrounds';

export default function CorePokemon({ pokemon, setPokemon }) {
  const types = pokemonTypes[pokemon] || [];
  const primaryType = types[0] || 'default';
  const bgUrl = typeBackgrounds[primaryType] || typeBackgrounds.default;;

  return (
    <section
      id="core-pokemon"
      className={`corePokemon ${primaryType === 'default' ? 'default-bg' : ''}`}
    >
      {bgUrl && primaryType !== 'default' && (
        <div className="core-bg" key={primaryType} style={{ backgroundImage: `url(${bgUrl})` }} />
      )}

      {/* Optional overlay for readability (keep if your images are busy) */}
      <div className="core-bg-overlay" />

      <div className="core-content">
        <PokeImg pokemon={pokemon} />
        <h2>Choose Your Core Pokémon</h2>

        <div className="coreControls">
          <select value={pokemon} onChange={e => setPokemon(e.target.value)}>
            <option value="">-- pick one --</option>
            <option value="Sprigatito">Sprigatito</option>
            <option value="Fuecoco">Fuecoco</option>
            <option value="Quaxly">Quaxly</option>
          </select>
          <button
            className="btn"
            disabled={!pokemon}
            onClick={() => {
              alert(`You chose ${pokemon}!`);
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
