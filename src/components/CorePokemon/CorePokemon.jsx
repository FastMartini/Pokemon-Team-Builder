import React, { useEffect, useMemo, useState } from 'react';
import PokeImg from '../image-box-select/PokeImg';
import './CorePokemon.css';
import { pokemonTypes } from '../../data/pokemonTypes';
import { typeBackgrounds } from '../../assets/typeBackgrounds';
import { pokedex } from '../../data/pokedex'; 
export default function CorePokemon({ pokemon, setPokemon }) {

  // 1) Build a deterministic order of names from your pokedex map
  const dexOrder = useMemo(
    () =>
      Object.entries(pokedex)
        .sort((a, b) => a[1] - b[1]) // sort by dex number
        .map(([name]) => name),
    []
  );

  // 2) Track current index (derived from current `pokemon`)
  const [idx, setIdx] = useState(() => {
    const i = dexOrder.indexOf(pokemon);
    return i >= 0 ? i : 0;
  });

  // 3) Sync idx when `pokemon` changes externally (e.g., dropdown)
  useEffect(() => {
    const i = dexOrder.indexOf(pokemon);
    if (i >= 0 && i !== idx) setIdx(i);
  }, [pokemon, dexOrder, idx]);

  // 4) Ensure we have a default selection on first load
  useEffect(() => {
    if (!pokemon && dexOrder.length) setPokemon(dexOrder[0]);
  }, [pokemon, dexOrder, setPokemon]);

  // 5) Current pokemon name + type background
  const currentName = dexOrder[idx] || '';
  const types = pokemonTypes[currentName] || [];
  const primaryType = types[0] || 'default';
  const bgUrl = typeBackgrounds[primaryType] || typeBackgrounds.default;

  // 6) Navigation handlers (wrap-around)
  const goNext = () => {
    const next = (idx + 1) % dexOrder.length;
    setIdx(next);
    setPokemon(dexOrder[next]);
  };

  const goPrev = () => {
    const prev = (idx - 1 + dexOrder.length) % dexOrder.length;
    setIdx(prev);
    setPokemon(dexOrder[prev]);
  };

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
          <button className="arrow-btn left" onClick={goPrev}>Prev</button>
          <span className="dexInfo">
            #{pokedex[currentName]} {currentName}
          </span>
          <button className="arrow-btn right" onClick={goNext}>Next</button>
        </div>

        <div className="coreControls">
         
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
