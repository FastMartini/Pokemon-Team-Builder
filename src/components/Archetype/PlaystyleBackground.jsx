import { useState } from 'react';
import { pokeImages } from '../../data/pokeImages';
import './PlaystyleBackground.css';

const spriteSources = Object.values(pokeImages);
const spriteCount = 30;
const spriteRows = 6;

function randomSpriteSource() {
  return spriteSources[Math.floor(Math.random() * spriteSources.length)];
}

function createSprite(id) {
  const duration = 12 + Math.random() * 10;

  return {
    id,
    src: randomSpriteSource(),
    style: {
      '--sprite-size': `${64 + Math.random() * 40}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${-Math.random() * duration}s`,
      animationDirection: Math.random() < 0.5 ? 'normal' : 'reverse',
      '--sprite-drift': `${Math.random() * 120 - 60}px`,
      '--sprite-spin-duration': `${4 + Math.random() * 6}s`,
      '--sprite-spin-delay': `${-Math.random() * 10}s`,
      '--sprite-spin-direction': Math.random() < 0.5 ? 'normal' : 'reverse',
    },
  };
}

export default function PlaystyleBackground() {
  const [sprites, setSprites] = useState(() =>
    Array.from({ length: spriteCount }, (_, id) => createSprite(id))
  );

  const changeSprite = (id) => {
    const src = randomSpriteSource();
    setSprites(current => current.map(sprite =>
      sprite.id === id ? { ...sprite, src } : sprite
    ));
  };

  return (
    <div className="playstyle-background" aria-hidden="true">
      {sprites.map(sprite => (
        <span
          key={sprite.id}
          className="playstyle-sprite-track"
          style={{
            ...sprite.style,
            // Every group of six fills the section, including the 18 mobile sprites.
            top: `${((sprite.id % spriteRows) + 0.5) * 100 / spriteRows}%`,
            left: 0,
            width: '100%',
          }}
          onAnimationIteration={(event) => {
            // The image's spin also bubbles here; change Pokémon only after crossing.
            if (event.target === event.currentTarget) changeSprite(sprite.id);
          }}
        >
          <img src={sprite.src} alt="" draggable={false} decoding="async" />
        </span>
      ))}
    </div>
  );
}
