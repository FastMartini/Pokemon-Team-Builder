import React from 'react';

export default function HeroBackground() {
  const pokeballs = [
    {
      src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
      weight: 0.6,
    },
    {
      src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
      weight: 0.25,
    },
    {
      src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
      weight: 0.15,
    },
  ];

  const getRandomBall = () => {
    const rand = Math.random();
    let sum = 0;
    for (const ball of pokeballs) {
      sum += ball.weight;
      if (rand <= sum) return ball.src;
    }
    return pokeballs[0].src; // fallback to Poké Ball
  };

  return (
    <div className="pokeball-container">
      {Array.from({ length: 30 }).map((_, i) => (
        <img
          key={i}
          src={getRandomBall()}
          alt="pokeball"
          className="pokeball"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
            width: `${40 + Math.random() * 20}px`, // 40px to 60px
          }}
        />
      ))}
    </div>
  );
}
