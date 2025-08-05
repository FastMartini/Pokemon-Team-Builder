import React from 'react';
import './Hero.css';
import HeroBackground from './HeroBackground';

export default function Hero() {
  return (
    <div className="intro-wrapper">
      <HeroBackground />

      <div className="intro-container">
        <h1>
          Welcome to the Pokelab! Choose from a variety of Paldea's Pokémon to create a team with.
        </h1>

        <div className="card">
          <a href="#core-pokemon" className="forge-btn">
            Forge your team
          </a>
        </div>
      </div>
    </div>
  );
}
