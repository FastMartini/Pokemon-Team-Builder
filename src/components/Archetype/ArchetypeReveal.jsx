import { useState } from 'react';
import { archetypeThemes } from '../../data/archetypeThemes';
import { pokeImages } from '../../data/pokeImages';
import './ArchetypeReveal.css';

export default function ArchetypeReveal({ archetype }) {
  const [randomPick] = useState(() => Math.random());
  const theme = archetypeThemes[archetype];
  if (!theme) return null;
  const name = theme.pokemon[Math.floor(randomPick * theme.pokemon.length)];

  return (
    <div
      className="archetype-reveal"
      aria-hidden="true"
      style={{
        '--reveal-accent': theme.accent,
        '--reveal-deep': theme.deep,
        '--reveal-soft': theme.soft,
      }}
    >
      <div className="reveal-speed-lines" />
      <div className="reveal-banner reveal-banner--left">
        <img
          className="reveal-banner-sprite"
          src={pokeImages[name]}
          alt=""
          width="96"
          height="96"
          draggable={false}
          decoding="async"
        />
        <div className="reveal-banner-copy">
          <span className="reveal-banner-kicker">{theme.label}</span>
          <strong className="reveal-banner-name">{name}</strong>
        </div>
      </div>
    </div>
  );
}
