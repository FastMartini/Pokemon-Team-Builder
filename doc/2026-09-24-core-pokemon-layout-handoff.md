# Core Pokémon layout handoff

## Request

Move “Choose Your Core Pokémon” above the image, put Prev to the left of the
Pokémon and Next to the right, and move the Pokémon number/name and search field
up closer to the image.

## Changes

- `src/components/CorePokemon/CorePokemon.jsx`: placed the heading first,
  grouped Prev / Pokémon image / Next into one row, and placed the number/name
  directly below it, followed by the search and Select controls.
- `src/components/CorePokemon/CorePokemon.css`: centered the navigation buttons
  vertically beside the image; replaced the 300px top padding and image margins
  with compact spacing; allowed the image and buttons to shrink on narrow screens;
  and added a scroll offset for the fixed navbar when following the hero link.
- Added polite announcements of Pokémon number/name changes for screen readers.

## Verification

- Passed production build: `npm run build`.
- Passed targeted lint: `./node_modules/.bin/eslint src/components/CorePokemon/CorePokemon.jsx`.
- Passed whitespace check: `git diff --check`.
- The in-app browser remains unavailable, so visual layout and interactions need
  a manual check. No browser verification is claimed.

## Manual check

1. Open the app using `npm run dev` and follow “Forge your team”.
2. Confirm the heading is visible above the image and below the fixed navbar.
3. Confirm Prev and Next sit on opposite sides of the Pokémon and navigate it.
4. Confirm the number/name and search field sit close below the image; search for
   `25` or `Pikachu` and check that the image and label update together.
5. Check a narrow viewport: the navigation row should fit, and the search/Select
   controls should wrap when needed.
