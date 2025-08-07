// src/components/FinalTeam/FinalTeam.jsx
import React, { useState } from 'react';
import './FinalTeam.css';
import { pokeImages } from '../image-box-select/pokeImages';
import PokeStats from '../Team-card/PokeStats';   // ← use your actual stats file

export default function FinalTeam({ lockedArc, corePokemon }) {
  // track flipped state for each of the 6 boxes
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
        <div className="header">{lockedArc || 'Archetype'}</div>
        <div className="header">{corePokemon || 'Core Pokémon'}</div>
        <div className="header">team</div>
      </div>

      <div className="final-team-grid-wrapper">
        <div className="final-team-grid">
          {Array.from({ length: 6 }).map((_, i) => {
            // decide which Pokémon is in this slot
            const name = i === 0 ? corePokemon : null;
            const stats = name ? PokeStats[name] : null;

            return (
              <div
                key={i}
                className={`team-box${flipped[i] ? ' flipped' : ''}`}
                onClick={() => toggleFlip(i)}
              >
                <div className="flip-inner">

                  {/* FRONT: your existing image logic */}
                  <div className="flip-front">
                    {name && pokeImages[name] && (
                      <img
                        src={pokeImages[name]}
                        alt={name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    )}
                  </div>

                  {/* BACK: stats from PokeStats */}
                  <div className="flip-back">
                    <h4>{name ? `${name} Stats` : 'No Pokémon'}</h4>
                    <ul>
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
