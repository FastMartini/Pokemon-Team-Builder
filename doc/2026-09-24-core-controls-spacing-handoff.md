# Core Pokémon controls spacing handoff

## Request and change

Move the Pokémon number/name (currently Nidorino) and the “Search name or #”
field slightly higher.

Updated `.dexInfo` in `src/components/CorePokemon/CorePokemon.css` to use a
`-1rem` top margin. This cancels the flex container's gap below the image row,
moving the label and following search/Select controls up by 16px at the default
font size. It applies to every Pokémon selection.

## Verification

- Passed `npm run build` and `git diff --check`.
- Browser preview was unavailable in this session. Manually check Nidorino and
  another Pokémon at desktop and mobile widths for comfortable spacing below
  the image.
