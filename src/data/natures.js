// src/data/natures.js

export const natures = {
    // Stall / Defensive-friendly
    Bold:    { up: "defense", down: "attack" },
    Calm:    { up: "spdef",   down: "attack" },
    Careful: { up: "spdef",   down: "spatk" },
    Impish:  { up: "defense", down: "spatk" },
    Relaxed: { up: "defense", down: "speed" },
    Sassy:   { up: "spdef",   down: "speed" },
  
    // Semi-Stall
    Gentle:  { up: "spdef",   down: "defense" },
    Lax:     { up: "defense", down: "spdef" },
    Quiet:   { up: "spatk",   down: "speed" },
  
    // Balanced (neutral natures)
    Bashful: { up: null, down: null },
    Docile:  { up: null, down: null },
    Hardy:   { up: null, down: null },
    Quirky:  { up: null, down: null },
    Serious: { up: null, down: null },
  
    // Bulky Offense
    Adamant: { up: "attack",  down: "spatk" },
    Brave:   { up: "attack",  down: "speed" },
    Lonely:  { up: "attack",  down: "defense" },
    Naughty: { up: "attack",  down: "spdef" },
    Rash:    { up: "spatk",   down: "spdef" },
  
    // Offense
    Hasty:   { up: "speed",   down: "defense" },
    Naive:   { up: "speed",   down: "spdef" },
    Modest:  { up: "spatk",   down: "attack" },
    Mild:   { up: "spatk",   down: "defense" }, 
    // Hyper Offense
    Jolly:   { up: "speed",   down: "spatk" },
    Timid:   { up: "speed",   down: "attack" },
  };