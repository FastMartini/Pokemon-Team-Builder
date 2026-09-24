import { pokemonCatalog, typeChart, moveNames } from './pokemonCatalog.js';
import { getPlaystyleOptions } from './playstyleDetails.js';
import { moveGroups } from './teamCapabilities.js';
import { natures } from './natures.js';

export const STAT_LABELS = { hp: 'HP', attack: 'Attack', defense: 'Defense', spAtk: 'Sp. Atk', spDef: 'Sp. Def', speed: 'Speed' };
export const ROLE_LABELS = {
  core: 'Chosen core', physicalWall: 'Physical wall', specialWall: 'Special wall',
  hazards: 'Hazard setter', spikes: 'Hazard stacker', removal: 'Hazard removal',
  cleric: 'Team healing', pressure: 'PP pressure', pivot: 'Pivot', spinblock: 'Rapid Spin blocker',
  setup: 'Setup attacker', physicalSetup: 'Physical setup', specialSetup: 'Special setup',
  breaker: 'Wallbreaker', slowBreaker: 'Slow wallbreaker', speed: 'Fast cleaner',
  screens: 'Screen support', lead: 'Opening hazard lead', web: 'Sticky Web support',
  rainSetter: 'Rain setter', rainAbuser: 'Rain attacker', sunSetter: 'Sun setter', sunAbuser: 'Sun attacker',
  sandSetter: 'Sand setter', sandAbuser: 'Sand attacker', snowSetter: 'Snow setter', snowAbuser: 'Snow beneficiary',
};
export const ARCHETYPE_WEIGHTS = {
  // Physical bulk, special bulk, attack strength, speed. These are design weights.
  stall: [0.4, 0.4, 0.15, 0.05], SemiStall: [0.3, 0.3, 0.3, 0.1],
  Balanced: [0.25, 0.25, 0.3, 0.2], BulkyOffense: [0.25, 0.2, 0.4, 0.15],
  Offense: [0.1, 0.1, 0.5, 0.3], HyperOffense: [0.05, 0.05, 0.5, 0.4],
};
export const SCORE_WEIGHTS = { role: 35, coverage: 25, archetype: 20, offense: 10, weather: 10, sharedWeakness: -15, duplicateTypes: -10 };
const automaticWeather = { rain: 'Drizzle', sun: 'Drought', sand: 'Sand Stream', snow: 'Snow Warning' };
const weatherAbilities = { rain: ['Swift Swim'], sun: ['Chlorophyll', 'Solar Power'], sand: ['Sand Rush', 'Sand Force'], snow: ['Slush Rush', 'Ice Body', 'Snow Cloak'] };
const unusualSpecies = new Set(['Slaking', 'Shedinja', 'Ditto', 'Unown', 'Wobbuffet', 'Smeargle']);
const defensiveRoles = new Set(['physicalWall', 'specialWall', 'cleric', 'pressure', 'removal', 'hazards', 'spikes', 'pivot', 'spinblock', 'screens']);
const attackTypes = Object.keys(typeChart);
const clamp = value => Math.max(0, Math.min(1, value));
const hasMove = (pokemon, group) => moveGroups[group].some(move => pokemon.moves.includes(move));
const powerAbility = ability => ['Huge Power', 'Pure Power'].includes(ability);

// Modern level-50 illustration: 31 IVs and 0 EVs. Nature applies after the stat calculation.
export function calculateStats(base, nature = 'Hardy') {
  const modifier = natures[nature] || natures.Hardy;
  return Object.fromEntries(Object.entries(base).map(([key, value]) => {
    if (key === 'hp') return [key, value === 1 ? 1 : Math.floor((2 * value + 31) / 2) + 60];
    const factor = modifier.up === key ? 1.1 : modifier.down === key ? 0.9 : 1;
    return [key, Math.floor((Math.floor((2 * value + 31) / 2) + 5) * factor)];
  }));
}

function chooseAbility(pokemon, role, weather) {
  const abilities = pokemon.abilities;
  if (role.endsWith('Setter') && abilities.includes(automaticWeather[weather])) return automaticWeather[weather];
  if (role === 'pressure' && abilities.includes('Pressure')) return 'Pressure';
  const usefulWeather = (weatherAbilities[weather] || []).find(ability => abilities.includes(ability));
  if (usefulWeather) return usefulWeather;
  const preferences = ['Huge Power', 'Pure Power', 'Regenerator', 'Intimidate', 'Levitate', 'Water Absorb', 'Volt Absorb', 'Lightning Rod', 'Flash Fire', 'Thick Fat', 'Natural Cure'];
  const allowed = abilities.filter(ability => !Object.values(automaticWeather).includes(ability) || ability === automaticWeather[weather]);
  return preferences.find(ability => allowed.includes(ability)) || allowed[0] || abilities[0];
}

function chooseNature(pokemon, role, archetype, ability) {
  const physical = role === 'physicalSetup' || (role !== 'specialSetup' && pokemon.stats.attack * (powerAbility(ability) ? 2 : 1) >= pokemon.stats.spAtk);
  if (role === 'physicalWall') return physical ? 'Impish' : 'Bold';
  if (role === 'specialWall') return physical ? 'Careful' : 'Calm';
  if (['stall', 'SemiStall'].includes(archetype) && (role === 'core' || defensiveRoles.has(role))) {
    return pokemon.stats.defense >= pokemon.stats.spDef ? (physical ? 'Impish' : 'Bold') : (physical ? 'Careful' : 'Calm');
  }
  if (role === 'speed' || role === 'lead' || role === 'screens' || (pokemon.stats.speed >= 90 && role !== 'slowBreaker')) return physical ? 'Jolly' : 'Timid';
  return physical ? 'Adamant' : 'Modest';
}

export function damageMultiplier(attack, pokemon, ability = '') {
  let multiplier = pokemon.types.reduce((result, defense) => result * (typeChart[attack]?.[defense] ?? 1), 1);
  const immunity = {
    Levitate: 'ground', 'Water Absorb': 'water', 'Storm Drain': 'water', 'Dry Skin': 'water',
    'Volt Absorb': 'electric', 'Lightning Rod': 'electric', 'Motor Drive': 'electric',
    'Flash Fire': 'fire', 'Sap Sipper': 'grass',
  };
  if (immunity[ability] === attack) multiplier = 0;
  if (ability === 'Thick Fat' && ['fire', 'ice'].includes(attack)) multiplier *= 0.5;
  if (ability === 'Dry Skin' && attack === 'fire') multiplier *= 1.25;
  return multiplier;
}

function metrics(member) {
  const s = member.stats;
  return {
    physical: clamp(Math.sqrt(s.hp * s.defense) / 180),
    special: clamp(Math.sqrt(s.hp * s.spDef) / 180),
    attack: clamp(Math.max(s.attack * (powerAbility(member.ability) ? 2 : 1), s.spAtk) / 180),
    speed: clamp(s.speed / 200),
  };
}

export function canFillRole(pokemon, role) {
  const s = pokemon.stats;
  const strength = Math.max(s.attack * (pokemon.abilities.some(powerAbility) ? 2 : 1), s.spAtk);
  if (role === 'physicalWall') return hasMove(pokemon, 'recovery') && s.hp * s.defense >= 5500;
  if (role === 'specialWall') return hasMove(pokemon, 'recovery') && s.hp * s.spDef >= 5500;
  if (role === 'pressure') return pokemon.abilities.includes('Pressure') && hasMove(pokemon, 'recovery');
  if (role === 'spinblock') return pokemon.types.includes('ghost');
  if (role === 'screens') return moveGroups.screens.every(move => pokemon.moves.includes(move));
  if (role === 'lead') return hasMove(pokemon, 'hazards') && (pokemon.moves.includes('taunt') || s.speed >= 90);
  if (role === 'physicalSetup') return hasMove(pokemon, role) && s.attack * (pokemon.abilities.some(powerAbility) ? 2 : 1) >= Math.max(85, s.spAtk * 0.9);
  if (role === 'specialSetup') return hasMove(pokemon, role) && s.spAtk >= Math.max(85, s.attack * 0.9);
  if (role === 'setup') return canFillRole(pokemon, 'physicalSetup') || canFillRole(pokemon, 'specialSetup');
  if (role === 'breaker') return strength >= 110;
  if (role === 'slowBreaker') return strength >= 110 && s.speed <= 80;
  if (role === 'speed') return s.speed >= 100 && strength >= 80;
  if (role.endsWith('Setter')) {
    const weather = role.replace('Setter', '');
    return pokemon.abilities.includes(automaticWeather[weather]) || hasMove(pokemon, weather);
  }
  if (role.endsWith('Abuser')) {
    const weather = role.replace('Abuser', '');
    return weather === 'snow' ? pokemon.types.includes('ice') : weatherAbilities[weather].some(ability => pokemon.abilities.includes(ability));
  }
  return moveGroups[role] ? hasMove(pokemon, role) : false;
}

function roleFit(member, archetype) {
  const { physical, special, attack, speed } = metrics(member);
  const bulk = (physical + special) / 2;
  const directRecovery = pokemonCatalog[member.name].moves.some(move => moveGroups.recovery.includes(move) && !['rest', 'wish'].includes(move));
  const recoveryFactor = directRecovery ? 1 : 0.7;
  if (member.role === 'physicalWall') return physical * recoveryFactor;
  if (member.role === 'specialWall') return special * recoveryFactor;
  if (member.role.endsWith('Setter')) return member.ability === automaticWeather[member.weather] ? 1 : 0.5 + 0.3 * bulk;
  if (member.role.endsWith('Abuser')) return 0.7 * attack + 0.3 * speed;
  if (member.role === 'speed') return 0.65 * speed + 0.35 * attack;
  if (member.role === 'lead' || member.role === 'screens') return 0.65 * speed + 0.35 * bulk;
  if (member.role === 'specialSetup') return 0.6 * clamp(member.stats.spAtk / 180) + 0.4 * bulk;
  if (member.role === 'physicalSetup') return 0.6 * clamp(member.stats.attack * (powerAbility(member.ability) ? 2 : 1) / 180) + 0.4 * bulk;
  if (member.role === 'setup') return 0.6 * attack + 0.4 * bulk;
  if (member.role === 'breaker' || member.role === 'slowBreaker') return 0.8 * attack + 0.2 * bulk;
  return ['Offense', 'HyperOffense', 'BulkyOffense'].includes(archetype) ? 0.3 * bulk + 0.45 * attack + 0.25 * speed : 0.75 * bulk + 0.25 * attack;
}

function evidenceMoves(pokemon, role) {
  let groups = [];
  if (['physicalWall', 'specialWall', 'pressure'].includes(role)) groups = ['recovery'];
  else if (role === 'screens') return moveGroups.screens;
  else if (role === 'lead') groups = ['hazards', 'lead'];
  else if (role === 'setup') groups = [canFillRole(pokemon, 'physicalSetup') ? 'physicalSetup' : 'specialSetup'];
  else if (role.endsWith('Setter')) groups = [role.replace('Setter', '')];
  else if (moveGroups[role]) groups = [role];
  return [...new Set(groups.flatMap(group => moveGroups[group].filter(move => pokemon.moves.includes(move))))].slice(0, 3);
}

function makeMember(name, role, archetype, weather, selectedNature) {
  const pokemon = pokemonCatalog[name];
  const ability = chooseAbility(pokemon, role, weather);
  const nature = selectedNature || chooseNature(pokemon, role, archetype, ability);
  const keyMoves = role.endsWith('Setter') && ability === automaticWeather[weather] ? [] : evidenceMoves(pokemon, role);
  return { name, role, roleLabel: ROLE_LABELS[role], weather, nature, ability, types: pokemon.types,
    stats: calculateStats(pokemon.stats, nature), keyMoves: keyMoves.map(id => moveNames[id]) };
}

export function scoreCandidate(candidate, team, archetype, weather) {
  const m = metrics(candidate);
  const weights = ARCHETYPE_WEIGHTS[archetype];
  const archetypeFit = [m.physical, m.special, m.attack, m.speed].reduce((sum, value, index) => sum + value * weights[index], 0);
  const weaknesses = attackTypes.map(type => {
    const hits = team.map(member => damageMultiplier(type, member, member.ability));
    return { type, need: hits.reduce((sum, hit) => sum + Math.max(0, hit - 1), 0) / (1 + hits.filter(hit => hit < 1).length), count: hits.filter(hit => hit > 1).length };
  });
  const needTotal = weaknesses.reduce((sum, threat) => sum + threat.need, 0);
  const covered = weaknesses.filter(({ type }) => damageMultiplier(type, candidate, candidate.ability) < 1);
  const coverage = needTotal ? covered.reduce((sum, threat) => sum + threat.need * (1 - damageMultiplier(threat.type, candidate, candidate.ability)), 0) / needTotal : 0;
  const candidateWeaknesses = weaknesses.filter(({ type }) => damageMultiplier(type, candidate, candidate.ability) > 1);
  const sharedWeakness = candidateWeaknesses.filter(threat => threat.count >= 2).length / Math.max(1, candidateWeaknesses.length);
  const teamTypes = new Set(team.flatMap(member => member.types));
  const newTargets = attackTypes.filter(defense => candidate.types.some(attack => typeChart[attack][defense] > 1) && ![...teamTypes].some(attack => typeChart[attack][defense] > 1)).length / 18;
  const isPhysical = member => member.role === 'physicalSetup' || (member.role !== 'specialSetup' && member.stats.attack * (powerAbility(member.ability) ? 2 : 1) >= member.stats.spAtk);
  const physicalCount = team.filter(isPhysical).length;
  const specialCount = team.length - physicalCount;
  const complementsDamage = physicalCount === specialCount ? 0.5 : Number(isPhysical(candidate) ? physicalCount < specialCount : specialCount < physicalCount);
  const offense = 0.6 * newTargets + 0.4 * complementsDamage;
  const duplicateTypes = candidate.types.filter(type => teamTypes.has(type)).length / candidate.types.length;
  let weatherFit = 0;
  if (weather) {
    if (candidate.ability === automaticWeather[weather] || weatherAbilities[weather].includes(candidate.ability)) weatherFit = 1;
    else if (weather === 'rain' && candidate.types.includes('water')) weatherFit = 0.7;
    else if (weather === 'sun' && candidate.types.includes('fire')) weatherFit = 0.7;
    else if (weather === 'sand' && candidate.types.some(type => ['rock', 'ground', 'steel'].includes(type))) weatherFit = 0.7;
    else if (weather === 'snow' && candidate.types.includes('ice')) weatherFit = 0.7;
    if ((weather === 'rain' && candidate.types.includes('fire')) || (weather === 'sun' && candidate.types.includes('water'))) weatherFit = -0.5;
  }
  const breakdown = { role: roleFit(candidate, archetype), coverage, archetype: archetypeFit, offense, weather: weatherFit, sharedWeakness, duplicateTypes };
  const score = Object.entries(breakdown).reduce((sum, [key, value]) => sum + value * SCORE_WEIGHTS[key], 0);
  return { score, breakdown, covers: covered.filter(threat => threat.need > 0).map(threat => threat.type) };
}

export const candidateNames = Object.keys(pokemonCatalog).filter(name => {
  const p = pokemonCatalog[name];
  return p.terminalInRoster && !p.legendary && !unusualSpecies.has(name) && Object.values(p.stats).reduce((sum, value) => sum + value, 0) >= 400;
});

export function buildTeam({ corePokemon, archetype, playstyle, selectedNature = '' }) {
  const option = getPlaystyleOptions(archetype).find(item => item.value === playstyle);
  if (!pokemonCatalog[corePokemon] || !ARCHETYPE_WEIGHTS[archetype] || !option) return { team: [], warnings: [], error: 'Choose a core Pokémon, archetype, and playstyle first.' };
  if (!option.plan) return { team: [], warnings: [], error: 'Choose Rain, Sun, Sand, or Snow to build a weather team.' };
  if (selectedNature && !natures[selectedNature]) return { team: [], warnings: [], error: 'Choose a valid nature.' };
  const weather = option.weather;
  const core = makeMember(corePokemon, 'core', archetype, weather, selectedNature);
  core.reason = 'Your chosen core is always kept. Its selected nature affects its displayed stats; the other members are chosen to support it.';
  const team = [core];
  const warnings = [];
  for (const role of option.plan) {
    let names = candidateNames.filter(name => !team.some(member => member.name === name) && canFillRole(pokemonCatalog[name], role));
    if (role.endsWith('Setter')) {
      const automatic = names.filter(name => pokemonCatalog[name].abilities.includes(automaticWeather[weather]));
      if (automatic.length) names = automatic;
    }
    if (role === 'removal') {
      const spinners = names.filter(name => pokemonCatalog[name].moves.includes('rapidspin'));
      if (spinners.length) names = spinners;
    }
    if (!names.length) {
      warnings.push(`Could not fill ${ROLE_LABELS[role]} with an eligible unused Pokémon.`);
      continue;
    }
    const ranked = names.map(name => {
      const member = makeMember(name, role, archetype, weather);
      return { ...member, ...scoreCandidate(member, team, archetype, weather) };
    }).sort((a, b) => b.score - a.score || pokemonCatalog[a.name].id - pokemonCatalog[b.name].id);
    const choice = ranked[0];
    const evidence = choice.keyMoves.length ? `Move options: ${choice.keyMoves.join(', ')}.` : `Suggested ability: ${choice.ability}.`;
    choice.reason = `${choice.roleLabel}. ${evidence}${choice.covers.length ? ` Adds a resistance or immunity to ${choice.covers.join(', ')} pressure on the team so far.` : ''}`;
    team.push(choice);
  }
  const exposed = attackTypes.filter(type => team.filter(member => damageMultiplier(type, member, member.ability) > 1).length >= 3);
  if (exposed.length) warnings.push(`Three or more members share a weakness to: ${exposed.join(', ')}. These matchups need care.`);
  if (!candidateNames.includes(corePokemon)) warnings.push('Your core is retained even though it falls outside the automatic teammate pool; its strengths may need extra support.');
  if (unusualSpecies.has(corePokemon)) warnings.push('This core has unusual battle mechanics that the score does not fully model.');
  if (weather === 'snow') warnings.push('Snow requires a manual weather move with this roster. Modern snow rules are used, not older hail rules.');
  if ((weather === 'rain' && core.types.includes('fire')) || (weather === 'sun' && core.types.includes('water'))) warnings.push('This weather weakens one of your core Pokémon’s same-type attacking options. The core is preserved, but this is a strategy tradeoff.');
  if (damageMultiplier('rock', core, core.ability) >= 4 && !team.some(member => member.role === 'removal')) warnings.push('Your core is very weak to Rock and this playstyle has no dedicated hazard-removal slot. Account for entry hazards when choosing its moves and item.');
  if (weather && Object.values(automaticWeather).includes(core.ability) && core.ability !== automaticWeather[weather]) warnings.push('Your core’s ability changes the weather away from this strategy.');
  return { team, warnings, error: null, playstyle: option, archetype };
}
