import { pokemonCatalog } from "./pokemonCatalog.js";
import { applyNature } from "./natureUtils.js";

export const ARCHETYPE_TO_NATURE = {
  "stall": "Bold",
  "SemiStall": "Calm",
  "Balanced": "Hardy",
  "BulkyOffense": "Adamant",
  "Offense": "Naive",
  "HyperOffense": "Timid"
};

export function getAdjustedStatsForArchetype(baseStats, archetype) {
  const nature = ARCHETYPE_TO_NATURE[archetype] || "Hardy";
  return applyNature(baseStats, nature);
}

export default Object.fromEntries(
  Object.entries(pokemonCatalog).map(([name, pokemon]) => [name, pokemon.stats])
);
