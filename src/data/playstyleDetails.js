import { PLAYSTYLES } from './PlaystylesData.js';

export const ARCHETYPE_LABELS = {
  stall: 'Stall', SemiStall: 'Semi-Stall', Balanced: 'Balance',
  BulkyOffense: 'Bulky Offense', Offense: 'Offense', HyperOffense: 'Hyper Offense',
};

export const playstyleDetails = {
  'Full Stall': {
    description: 'Win a long game by repeatedly healing, absorbing attacks, and wearing the opponent down with hazards and status. Cover both physical and special attackers; avoid giving opposing setup sweepers unlimited free turns.',
    plan: ['physicalWall', 'specialWall', 'hazards', 'removal', 'cleric'],
  },
  'PP Stall': {
    description: 'Exhaust the opponent’s limited move uses (PP), often using Pressure alongside healing and careful switching. This needs patience and defensive answers; the Pressure ability alone does not make a Pokémon an effective wall.',
    plan: ['pressure', 'physicalWall', 'specialWall', 'removal', 'hazards'],
  },
  'Hybrid Stall': {
    description: 'Use a defensive backbone to absorb pressure, then finish with an attacker that boosts its stats. Preserve that attacker until the defensive members have weakened its checks.',
    plan: ['physicalWall', 'specialWall', 'hazards', 'removal', 'setup'],
  },
  'Hazard Stall': {
    description: 'Accumulate damage when opponents switch into entry hazards. Combine durable defenders with hazard support and a Ghost-type that can block Rapid Spin. Ghost typing does not block Defog, so hazards still need active protection.',
    plan: ['hazards', 'spikes', 'spinblock', 'removal', 'specialWall'],
  },
  'Classic Balance': {
    description: 'Mix defensive switch-ins with offensive pressure. Walls handle incoming attacks, a pivot helps bring teammates in, and a faster attacker finishes weakened opponents.',
    plan: ['physicalWall', 'specialWall', 'hazards', 'pivot', 'speed'],
  },
  'Bulky Balance': {
    description: 'Trade some immediate speed for sturdier teammates and repeated switch-ins. Use healing and hazard removal to stay healthy while a setup attacker creates a winning position.',
    plan: ['physicalWall', 'specialWall', 'removal', 'hazards', 'setup'],
  },
  'Offensive Balance': {
    description: 'Keep enough defensive support to switch safely, but emphasize damage and momentum. Use pivots to bring in a wallbreaker, then let a fast attacker clean up.',
    plan: ['hazards', 'pivot', 'breaker', 'removal', 'speed'],
  },
  'Tanky Setup': {
    description: 'Create an opportunity for a sturdy attacker to boost with a move such as Dragon Dance or Calm Mind. Its teammates should absorb dangerous hits and help it enter safely; bulk does not remove the need for good matchups.',
    plan: ['hazards', 'physicalWall', 'pivot', 'setup', 'speed'],
  },
  'Slow Breakers + Fast Cleaners': {
    description: 'Use slower, powerful attackers to damage defensive teams early, then finish with a faster teammate. A slow breaker needs help entering safely because high damage alone does not guarantee it survives a hit.',
    plan: ['hazards', 'removal', 'slowBreaker', 'breaker', 'speed'],
  },
  'Standard Offense': {
    description: 'Maintain pressure with strong attacks, pivots, and setup opportunities. Mix physical and special damage so one kind of wall cannot stop the entire team.',
    plan: ['hazards', 'pivot', 'breaker', 'setup', 'speed'],
  },
  'Hazard Pressure Offense': {
    description: 'Set hazards early and keep forcing switches with threatening attackers. A Ghost-type can discourage Rapid Spin, while strong attacks punish attempts to remove hazards or recover.',
    plan: ['hazards', 'spikes', 'spinblock', 'breaker', 'speed'],
  },
  'Screens HO': {
    description: 'Use Reflect and Light Screen to reduce damage for a few turns, then bring in attackers that boost their stats. Spend those protected turns gaining momentum instead of repeatedly switching without progress.',
    plan: ['screens', 'physicalSetup', 'specialSetup', 'breaker', 'speed'],
  },
  'Suicide Lead HO': {
    description: 'An expendable opening Pokémon sets hazards and uses tools such as Taunt to disrupt the opponent. It may be sacrificed to give a sweeper a safe entry, but sacrificing it is not mandatory when keeping it is better.',
    plan: ['lead', 'physicalSetup', 'specialSetup', 'breaker', 'speed'],
  },
  'Sticky Web HO': {
    description: 'Place Sticky Web to lower the Speed of grounded opponents when they switch in, helping powerful attackers move first. Flying-types and other ungrounded opponents avoid it, so keep a naturally fast teammate too.',
    plan: ['web', 'physicalSetup', 'specialSetup', 'breaker', 'speed'],
  },
  'Weather HO': {
    description: 'Build around a specific weather setter and teammates that benefit from its weather. Choose Rain, Sun, Sand, or Snow below: their abilities, damage effects, and support needs are different.',
    plan: null,
  },
  Rain: {
    description: 'Rain strengthens Water attacks and weakens Fire attacks. Pair a rain setter with a Swift Swim attacker, then add teammates that handle Electric- and Grass-type pressure and opposing weather.',
    plan: ['rainSetter', 'rainAbuser', 'breaker', 'pivot', 'hazards'], weather: 'rain',
  },
  Sun: {
    description: 'Sun strengthens Fire attacks and weakens Water attacks. Support a Chlorophyll or Solar Power attacker with a sun setter, and watch for Rock hazards and opposing weather.',
    plan: ['sunSetter', 'sunAbuser', 'breaker', 'removal', 'hazards'], weather: 'sun',
  },
  Sand: {
    description: 'Sand supports abilities such as Sand Rush and Sand Force, and improves Rock-types’ special bulk. Most Pokémon outside the Rock, Ground, and Steel types take chip damage unless an ability prevents it.',
    plan: ['sandSetter', 'sandAbuser', 'hazards', 'breaker', 'speed'], weather: 'sand',
  },
  Snow: {
    description: 'Under modern mechanics, snow improves Ice-types’ physical bulk without hail’s chip damage. This roster has no automatic Snow Warning setter, so the generator uses manual Snowscape or Chilly Reception support.',
    plan: ['snowSetter', 'snowAbuser', 'removal', 'breaker', 'hazards'], weather: 'snow',
  },
};

export function getPlaystyleOptions(archetype) {
  const label = ARCHETYPE_LABELS[archetype] || archetype;
  return (PLAYSTYLES[label]?.groups || []).flatMap(group => group.items.flatMap(item => {
    const makeOption = (entry, suffix) => ({
      value: `${group.title} — ${suffix}`,
      label: `${group.title} — ${suffix}`,
      natures: entry.natures || [],
      ...playstyleDetails[entry.name],
    });
    return [makeOption(item, item.name), ...(item.subitems || []).map(child =>
      makeOption(child, `${item.name}: ${child.name}`))];
  }));
}
