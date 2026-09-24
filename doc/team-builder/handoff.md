# Handoff: playstyle explanations and casual-singles team builder

## Requested outcome

Add information for every playstyle, generate a sensible team from the selected
core/archetype/playstyle/nature, explain the formula, and document both this update
and the preceding work. The user explicitly chose **casual singles using the
Pokémon already in this project**. Previous work is recorded in
[../previous-work/handoff.md](../previous-work/handoff.md).

## Before and after

Before this update there was no team-generation algorithm. FinalTeam showed the
chosen core and five empty slots; its selected archetype variable was unused.
Only 150 of the 386 stored Pokémon had base-stat records, and the UI applied
nature multipliers directly to base stats.

Now:

- All 19 dropdown options have descriptions, including the general Weather HO
  explanation and its Rain/Sun/Sand/Snow variants. There are 18 buildable styles.
- A visible information panel explains the selected strategy and its five support
  roles. Generic Weather HO asks for a specific weather before building.
- “Build my team” takes the user to the generated result. Results are computed
  locally whenever the selected inputs change, so the button reveals the current
  result rather than starting a network request.
- The core stays first; five distinct teammates fill the playstyle’s five roles.
- Cards show species, typing, assigned role, nature, suggested ability, relevant
  support-move options, and a selection reason. Keyboard-accessible flip buttons
  show calculated level-50 stats. Expandable score breakdowns expose each factor.
- The team view explains the formula and reports weaknesses and core/strategy
  tradeoffs. A user-selected nature belongs to the core; teammates get their own.
- Changing the playstyle clears the previous nature choice. Switching archetypes
  still clears incompatible selections, while Back preserves the current choices.

## Scope and assumptions

This is a **deterministic roster recommendation heuristic**, not a competitive
solver or a complete four-move/item/EV team export. It uses modern stats, types,
abilities, and type effectiveness for the original 386 stored species, with
historical move access across games. It does not claim a named generation, tier,
or game-version legality. Individual move availability does not establish that
all suggested moves, abilities, and transfers can coexist in one game.

The on-screen stats use level 50, 31 IVs in every stat, and 0 EVs. They are
illustrations before ability, item, weather, or battle-stage modifiers. Users
still need to choose final moves, items, and training for the game they play.

No battle simulation, matchup usage data, damage rolls, priority interactions,
accuracy model, or proof of optimality is involved. The score is not a win rate.
The archetype reveal’s random Pokémon remains decorative and is unrelated to the
deterministic generated team.

## Data and provenance

`src/data/pokemonCatalog.js` is a checked-in snapshot covering all 386 local
Pokédex names. It includes modern base stats/types, possible abilities, a filtered
list of relevant support moves, evolution information, and legendary tags.
`PokeStats.js` now exposes all 386 base-stat records from this snapshot.

Sources:

- [Pokémon Showdown species data](https://play.pokemonshowdown.com/data/pokedex.json)
- [Pokémon Showdown learnsets](https://play.pokemonshowdown.com/data/learnsets.json)
- [Pokémon Showdown moves](https://play.pokemonshowdown.com/data/moves.json)
- [Pokémon Showdown type chart](https://github.com/smogon/pokemon-showdown/blob/master/data/typechart.ts)

The generated `catalogMetadata` records the exact fetch timestamp, URLs, scope,
and SHA-256 hashes of source responses. The upstream license is retained as
`pokemon-showdown-LICENSE.txt` and `public/licenses/pokemon-showdown.txt` (also copied
into production builds by Vite). Refresh with `npm run data:refresh` when desired;
normal use needs no API call. Sprites still use the project’s existing remote URLs.

The refresh script merges known moves from a species and its pre-evolutions,
then retains only the 44 moves listed in `teamCapabilities.js`. It does not infer
special move copying through Sketch. Sources span generations; the snapshot is
not a legality checker. Snapshot types were checked against all 386 existing
`pokemonTypes.js` entries and matched.

## Selection process

1. Validate the core, archetype, playstyle, and optional nature. Invalid inputs
   return a clear instruction instead of guessing another strategy.
2. Preserve the chosen core, even if it would be excluded from automatic selection.
3. Get five support roles from the playstyle. For example:
   - Full Stall: physical wall, special wall, hazards, removal, healing support.
   - Classic Balance: physical wall, special wall, hazards, pivot, fast cleaner.
   - Screens HO: screens, physical setup, special setup, breaker, fast cleaner.
   - Rain: rain setter, rain attacker, breaker, pivot, hazards.
4. For each role, filter unused candidates by actual capability before scoring.
   Screens requires both Reflect and Light Screen; Web requires Sticky Web;
   Pressure requires the ability and recovery access; weather attackers require
   the corresponding ability, except Snow beneficiaries use Ice typing.
5. Prefer an automatic weather setter where one remains available. Prefer Rapid
   Spin for removal where possible because Defog also clears your own hazards.
6. Score all qualifying candidates against the current partial team. Choose the
   highest score, breaking exact ties by Pokédex number. Repeat for all five slots.
7. Report remaining shared weaknesses and problematic core/strategy combinations.

This is greedy selection in a fixed role order, not a search over all possible
six-member combinations. Earlier choices affect later ones.

### Automatic candidate pool

There are 172 eligible automatic teammates in this snapshot. Candidates must:

- Belong to the existing roster and have no further evolution **within that roster**.
  For example, a later-generation evolution does not exclude its earlier species.
- Have at least 400 total base stats.
- Have no legendary/mythical tag.
- Not be Slaking, Shedinja, Ditto, Unown, Wobbuffet, or Smeargle, whose unusual
  mechanics require extra modeling. Some already fail the stat threshold.

These are product choices for this casual builder, not official battle rules.
They never remove a user-selected core. An out-of-pool core receives a note.

### Hard role checks

- Physical/special walls require recovery access and base HP × relevant defense
  of at least 5,500. Rest and Wish are recognized but scored less favorably than
  direct recovery for these wall roles.
- A breaker needs an attacking base-stat proxy of at least 110; a slow breaker
  additionally has base Speed at most 80.
- A fast cleaner needs base Speed at least 100 and attacking strength at least 80.
- Setup requires the relevant boosting move and an attacking stat at least 85,
  also at least 90% of the other attacking stat. Huge/Pure Power are accounted for
  in the physical proxy. Physical and special setup slots get matching natures.
- An opening lead needs hazard access and either Taunt or base Speed at least 90.
- Other utility roles require a move from the corresponding capability group;
  Rapid Spin blocking requires Ghost typing. This does not imply blocking Defog.

## Exact score

`Score = 35R + 25D + 20A + 10O + 10W - 15X - 10T`

These weights are hand-tuned for this project, not a published Pokémon formula.
All factors are in [0, 1], except W can be -0.5 for a weather/type conflict.

| Factor | Meaning |
| --- | --- |
| R | Suitability for the assigned role, after hard capability checks |
| D | Resistance/immunity coverage for the partial team’s existing weaknesses |
| A | Stat profile’s match to the chosen archetype |
| O | New same-type attacking coverage and physical/special variety |
| W | Fit with the selected weather, or zero for a non-weather style |
| X | Fraction of candidate weaknesses already shared by at least two team members |
| T | Fraction of candidate types already present on the team |

### Normalized stat features

Let `clamp(x)` limit a value to [0,1], using the calculated level-50 stats:

- P = clamp(sqrt(HP × Defense) / 180)
- Q = clamp(sqrt(HP × Sp. Def) / 180)
- B = (P + Q) / 2
- H = clamp(max(effective Attack, Sp. Atk) / 180)
- S = clamp(Speed / 200)

Effective Attack doubles for Huge Power/Pure Power in the ranking features. The
bulk products are rough durability proxies, not actual damage calculations. The
180/200 reference constants are design choices.

Archetype fit A is a weighted sum of P, Q, H, S:

| Archetype | P | Q | H | S |
| --- | ---: | ---: | ---: | ---: |
| Stall | .40 | .40 | .15 | .05 |
| Semi-Stall | .30 | .30 | .30 | .10 |
| Balance | .25 | .25 | .30 | .20 |
| Bulky Offense | .25 | .20 | .40 | .15 |
| Offense | .10 | .10 | .50 | .30 |
| Hyper Offense | .05 | .05 | .50 | .40 |

Role fit R:

- Physical/special wall: P or Q, multiplied by 1 for direct recovery, otherwise .7.
- Automatic weather setter: 1; manual setter: .5 + .3B.
- Weather attacker/beneficiary: .7H + .3S.
- Fast cleaner: .65S + .35H.
- Screens/opening lead: .65S + .35B.
- Physical/special setup: .6 × normalized relevant attacking stat + .4B.
- Generic setup: .6H + .4B.
- Breaker/slow breaker: .8H + .2B.
- Other roles: .3B + .45H + .25S for offensive archetypes; .75B + .25H otherwise.

### Coverage and repetition

For each of the 18 attacking types, compute the damage multiplier against each
current team member. Dual types multiply; immunities remain zero. Supported
ability immunities are Levitate, Water Absorb, Storm Drain, Dry Skin, Volt Absorb,
Lightning Rod, Motor Drive, Flash Fire, and Sap Sipper. Thick Fat halves Fire/Ice
multipliers; Dry Skin also increases the Fire multiplier by 1.25.

`need(type) = sum(max(0, multiplier - 1)) / (1 + number of current resistances/immunities)`

D is the sum of `need × (1 - candidate multiplier)` for types the candidate
resists/is immune to, divided by total need. It is zero if there is no need.
Thus an immunity receives more credit than a resistance. This remains a type
coverage approximation, not proof that a Pokémon can switch into every attack.

X counts candidate weak types for which two current members are already weak,
divided by the number of candidate weak types. T counts candidate types already
on the team, divided by its one or two types.

O = .6 × (new super-effective single-type STAB targets / 18) + .4 × damage-category complement.
The complement is 1 if the candidate adds the less-represented physical/special
category, .5 when existing categories tie, otherwise 0. Nature and Huge/Pure Power
influence the attacking-category comparison. Actual damaging moves are not chosen,
so STAB target coverage is explicitly labeled a proxy in the UI.

W = 1 for the matching automatic setter or a benefiting ability; .7 for a benefiting
type (Water in rain, Fire in sun, Rock/Ground/Steel in sand, Ice in snow); otherwise
0. Fire in rain or Water in sun gets -.5. This score does not simulate weather
turns or directly modify the displayed stat table.

### Nature and stat calculation

For base stat b at level 50, IV=31 and EV=0:

- HP = floor((2b + 31) / 2) + 60; Shedinja is the exception with HP=1.
- Other stats = floor((floor((2b + 31) / 2) + 5) × nature multiplier).
- The nature multiplier is 1.1, .9, or 1. HP is not nature-modified.

The core uses the user’s nature, or an automatic suggestion if none is chosen.
Wall roles boost their relevant defense while lowering the less-used attacking
stat. Fast roles favor Jolly/Timid; slower attackers favor Adamant/Modest. Defensive
archetypes choose defensive natures for support roles. The legacy `applyNature`
helper is no longer used by the team display; use `calculateStats` for these
level-50 illustrations rather than applying nature directly to base stats.

## Explanations and sources

Descriptions are original summaries, grounded in role-based construction and
supporting mechanics rather than claims about the current competitive metagame:

- [Smogon: introductory roles](https://www.smogon.com/articles/getting-started)
- [Smogon: type synergy](https://www.smogon.com/xy/articles/synergy)
- [Smogon: team-building structures](https://www.smogon.com/forums/threads/teambuilding-guide.3552468/)
- [Smogon: hyper offense](https://www.smogon.com/articles/hyper-offense-in-ou)
- [Modern snow](https://www.smogon.com/dex/sv/moves/snowscape/)
- [Sandstorm](https://www.smogon.com/dex/sv/moves/sandstorm/)
- [Simulator implementation](https://github.com/smogon/pokemon-showdown/blob/master/sim/pokemon.ts)

## Changed files

- `src/data/playstyleDetails.js`: explanations, five-role plans, shared option flattening.
- `src/data/teamCapabilities.js`: support-move groups.
- `src/data/pokemonCatalog.js`: generated complete species/type/capability snapshot.
- `scripts/refresh-pokemon-data.mjs`: repeatable data refresh and provenance.
- `src/data/teamBuilder.js`: validation, role checks, stat calculation, scoring, generation.
- `src/data/PokeStats.js`: complete base-stat compatibility export.
- `src/components/Archetype/Playstyle.jsx` and `.css`: visible explanations, optional core
  nature information, Build my team action, invalid-weather guard.
- `src/components/FinalTeam/FinalTeam.jsx` and `.css`: generated cards, reasons, score
  details, formula, warning notes, responsive layout, accessible flip controls.
- `src/App.jsx`: passes the selected playstyle to FinalTeam.
- `tests/teamBuilder.test.js`, `package.json`: tests and data-refresh commands.
- This handoff, upstream license, previous-work handoff, and README links.

## Verification

- `npm test`: eight tests passed, including all **6,948** combinations of 386 cores
  and 18 buildable playstyles producing six unique, eligible, role-qualified members.
- Checks cover known stat calculations, dual-type and ability immunities, nature
  application, deterministic outputs, invalid input handling, and strategy-defining
  support (screens, webs, Pressure, weather setters).
- `npm run build` and `npm run lint` passed after the implementation. The old
  unused-variable errors were removed as part of replacing the FinalTeam code.
- `git diff --check` passed.
- A React server-render smoke check confirmed six team cards, the formula panel,
  the Rain description, and the Build my team action render successfully.
- The in-app browser remains unavailable. Build/unit checks do not verify visual
  layout, scrolling, animation, or real browser interaction.

## Manual verification / next work

Run `npm run dev`. Select a core, choose an archetype, and cycle through its
playstyles to read each explanation. Choose a nature or leave automatic mode on,
then click Build my team. Confirm six distinct members with the core first;
flip a card with mouse and keyboard; inspect its reasons and score breakdown.
Go back and change the strategy, including the generic weather option and each
weather subtype. Check narrow screens and long descriptions/names.

For a future competitive builder, first choose a real generation/format, then add
legal four-move sets, items, EV spreads, abilities and move-combination validation,
actual damage/speed checks, and opponent matchup coverage. Evaluate generated teams
in battles before treating these weights as competitively calibrated.
