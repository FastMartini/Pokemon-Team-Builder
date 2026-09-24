import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTeam, calculateStats, damageMultiplier, canFillRole, candidateNames, ROLE_LABELS } from '../src/data/teamBuilder.js';
import { pokemonCatalog, typeChart } from '../src/data/pokemonCatalog.js';
import { pokedex } from '../src/data/pokedex.js';
import { pokeImages } from '../src/data/pokeImages.js';
import { natures } from '../src/data/natures.js';
import { getPlaystyleOptions, ARCHETYPE_LABELS } from '../src/data/playstyleDetails.js';

const options = Object.keys(ARCHETYPE_LABELS).flatMap(archetype => getPlaystyleOptions(archetype).map(option => ({ archetype, ...option })));
const inputFor = option => ({ corePokemon: 'Charizard', archetype: option.archetype, playstyle: option.value });

test('every stored Pokémon has complete modern stats, types, and a sprite', () => {
  assert.equal(Object.keys(pokemonCatalog).length, 386);
  for (const [name, id] of Object.entries(pokedex)) {
    const p = pokemonCatalog[name];
    assert.equal(p.id, id);
    assert.ok(pokeImages[name]);
    assert.equal(Object.keys(p.stats).length, 6);
    assert.ok(Object.values(p.stats).every(value => Number.isInteger(value) && value > 0));
    assert.ok(p.types.every(type => typeChart[type]));
  }
});

test('all 19 options explain the strategy; 18 have five support roles', () => {
  assert.equal(options.length, 19);
  assert.equal(options.filter(option => option.plan).length, 18);
  for (const option of options) {
    assert.ok(option.description.length > 50, option.value);
    assert.ok(option.natures.every(nature => natures[nature]));
    if (option.plan) {
      assert.equal(option.plan.length, 5);
      assert.ok(option.plan.every(role => ROLE_LABELS[role]));
    }
  }
});

test('level 50 stats apply nature after calculation and keep Shedinja at 1 HP', () => {
  const base = pokemonCatalog.Charizard.stats;
  const neutral = calculateStats(base);
  const adamant = calculateStats(base, 'Adamant');
  assert.deepEqual(neutral, { hp: 153, attack: 104, defense: 98, spAtk: 129, spDef: 105, speed: 120 });
  assert.equal(adamant.hp, 153);
  assert.equal(adamant.attack, 114);
  assert.equal(adamant.spAtk, 116);
  assert.equal(calculateStats(base, 'Timid').speed, 132);
  assert.equal(calculateStats(pokemonCatalog.Shedinja.stats).hp, 1);
  assert.equal(base.attack, 84);
});

test('dual typings and supported ability immunities are respected', () => {
  assert.equal(damageMultiplier('rock', pokemonCatalog.Charizard), 4);
  assert.equal(damageMultiplier('ground', pokemonCatalog.Charizard), 0);
  assert.equal(damageMultiplier('dragon', pokemonCatalog.Mawile), 0);
  assert.equal(damageMultiplier('ground', pokemonCatalog.Weezing, 'Levitate'), 0);
  assert.equal(damageMultiplier('ground', pokemonCatalog.Weezing), 2);
  assert.equal(damageMultiplier('water', pokemonCatalog.Vaporeon, 'Water Absorb'), 0);
  assert.equal(damageMultiplier('fire', pokemonCatalog.Snorlax, 'Thick Fat'), 0.5);
});

test('identical choices are deterministic; the selected nature belongs to the core', () => {
  const input = { ...inputFor(options.find(option => option.value.includes('Classic Balance'))), selectedNature: 'Timid' };
  const first = buildTeam(input);
  assert.deepEqual(buildTeam(input), first);
  assert.equal(first.team[0].name, 'Charizard');
  assert.equal(first.team[0].nature, 'Timid');
  assert.equal(first.team[0].stats.speed, 132);
  assert.ok(first.team.slice(1).some(member => member.nature !== 'Timid'));
});

test('all 386 cores and 18 buildable styles produce six distinct role-qualified members', () => {
  for (const corePokemon of Object.keys(pokedex)) {
    for (const option of options.filter(option => option.plan)) {
      const result = buildTeam({ ...inputFor(option), corePokemon });
      const context = `${corePokemon} / ${option.value}`;
      assert.equal(result.error, null, context);
      assert.equal(result.team.length, 6, context);
      assert.equal(new Set(result.team.map(member => member.name)).size, 6, context);
      assert.equal(result.team[0].name, corePokemon, context);
      result.team.slice(1).forEach((member, index) => {
        const p = pokemonCatalog[member.name];
        assert.equal(member.role, option.plan[index], context);
        assert.ok(canFillRole(p, member.role), context);
        assert.ok(candidateNames.includes(member.name), context);
        assert.ok(!p.legendary, context);
        assert.ok(p.abilities.includes(member.ability), context);
        assert.ok(Number.isFinite(member.score), context);
        assert.ok(Object.values(member.stats).every(Number.isFinite), context);
        if (member.role === 'specialSetup') assert.ok(!['Adamant', 'Jolly', 'Impish', 'Careful'].includes(member.nature), context);
      });
    }
  }
});

test('special strategies have their defining support, not just matching stat totals', () => {
  const find = text => buildTeam(inputFor(options.find(option => option.value.includes(text)))).team;
  assert.ok(find('Sticky Web HO').find(member => member.role === 'web').keyMoves.includes('Sticky Web'));
  assert.deepEqual(find('Screens HO').find(member => member.role === 'screens').keyMoves, ['Reflect', 'Light Screen']);
  assert.equal(find('PP Stall').find(member => member.role === 'pressure').ability, 'Pressure');
  for (const [weather, ability] of [['Rain', 'Drizzle'], ['Sun', 'Drought'], ['Sand', 'Sand Stream']]) {
    assert.equal(find(`Weather HO: ${weather}`)[1].ability, ability);
  }
  assert.ok(find('Weather HO: Snow')[1].keyMoves.some(move => ['Snowscape', 'Chilly Reception'].includes(move)));
});

test('invalid inputs and unspecified weather return an actionable empty result', () => {
  assert.ok(buildTeam({ corePokemon: 'Missing' }).error);
  const parent = options.find(option => option.value.endsWith('Weather HO'));
  assert.match(buildTeam(inputFor(parent)).error, /Rain, Sun, Sand, or Snow/);
  assert.ok(buildTeam({ ...inputFor(options[0]), selectedNature: 'Missing' }).error);
});
