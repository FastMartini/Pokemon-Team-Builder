// src/data/natures.js

export const natures = {
    // Stall / Defensive-friendly
    Bold:    { up: "defense", down: "attack" },
    Calm:    { up: "spDef",   down: "attack" },
    Careful: { up: "spDef",   down: "spAtk" },
    Impish:  { up: "defense", down: "spAtk" },
    Relaxed: { up: "defense", down: "speed" },
    Sassy:   { up: "spDef",   down: "speed" },
  
    // Semi-Stall
    Gentle:  { up: "spDef",   down: "defense" },
    Lax:     { up: "defense", down: "spDef" },
    Quiet:   { up: "spAtk",   down: "speed" },
  
    // Balanced (neutral natures)
    Bashful: { up: null, down: null },
    Docile:  { up: null, down: null },
    Hardy:   { up: null, down: null },
    Quirky:  { up: null, down: null },
    Serious: { up: null, down: null },
  
    // Bulky Offense
    Adamant: { up: "attack",  down: "spAtk" },
    Brave:   { up: "attack",  down: "speed" },
    Lonely:  { up: "attack",  down: "defense" },
    Naughty: { up: "attack",  down: "spDef" },
    Rash:    { up: "spAtk",   down: "spDef" },
  
    // Offense
    Hasty:   { up: "speed",   down: "defense" },
    Naive:   { up: "speed",   down: "spDef" },
    Modest:  { up: "spAtk",   down: "attack" },
    Mild:   { up: "spAtk",   down: "defense" }, 
    // Hyper Offense
    Jolly:   { up: "speed",   down: "spAtk" },
    Timid:   { up: "speed",   down: "attack" },
  };