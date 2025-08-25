import React, { useState } from 'react';
import './FinalTeam.css';
import { pokeImages } from "../../data/pokeImages"; 
import PokeStats, { getAdjustedStatsForArchetype, ARCHETYPE_TO_NATURE } from '../../data/PokeStats';
import { natures } from '../../data/natures';
import { applyNature } from '../../data/natureUtils';

export default function FinalTeam({ lockedArc, corePokemon, selectedNature }) {
  const [flipped, setFlipped] = useState(Array(6).fill(false));
  const toggleFlip = (i) =>
    setFlipped(f => {
      const c = [...f];
      c[i] = !c[i];
      return c;
    });

  return (
    <section id="FinalTeam" className="final-team-container">
      <div className="header-row">
        <div className="header">Your</div>
        <div className="header">{corePokemon || "Corepokemon"}</div>
        <div className="header">Team</div>
      </div>

      <div className="final-team-grid-wrapper">
        <div className="final-team-grid">
          {Array.from({ length: 6 }).map((_, i) => {
            const name = i === 0 ? corePokemon : null;
            const selectedArch = lockedArc || 'Balanced';
            const natureName = selectedNature || ARCHETYPE_TO_NATURE?.[lockedArc] || 'Hardy';
            const base = name ? PokeStats[name] : null;
            const stats = name ? applyNature(base, natureName) : null;

            return (
              <div
                key={i}
                className={`team-box${flipped[i] ? ' flipped' : ''}`}
                onClick={() => toggleFlip(i)}
              >
                <div className="flip-inner">
                  <div className="flip-front">
                    {name && pokeImages[name] ? (
                      <img
                        src={pokeImages[name]}
                        alt={name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <span className='empty-msg'>No Pokemon</span>
                    )}
                  </div>

                  <div className="flip-back">
                    <h4>{name ? `${name} Stats` : 'No Pokémon'}</h4>

                    <ul>
                      {name && (
                      <li>Nature: {natureName}</li>
                    )}
                      {stats
                        ? Object.entries(stats).map(([stat, val]) => (
                            <li key={stat}>
                              {stat.charAt(0).toUpperCase() + stat.slice(1)}: {val}
                            </li>
                          ))
                        : <li>No stats available</li>}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
