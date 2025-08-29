import { natures } from "./natures.js"

export function applyNature(baseStats, natureName) {
    const nature = natures[natureName];
    if (!nature) return {...baseStats};
    const modifiedStats = { ...baseStats };
  
    if (nature.up) {
      modifiedStats[nature.up] = Math.floor(modifiedStats[nature.up] * 1.1);
    }
    if (nature.down) {
      modifiedStats[nature.down] = Math.floor(modifiedStats[nature.down] * 0.9);
    }
  
    return modifiedStats;
  }