# Blank page investigation and handoff

## Reported issue and cause

The user saw a blank `index.html` while opening the project with Five Server.
This project uses React and Vite, rather than standalone HTML. The HTML contains
an empty `#root` element that React fills after `/src/main.jsx` runs. Serving the
source files without Vite's JSX transformation and package import resolution
prevents that startup path from working.

Run `npm run dev` from the project folder and open the local URL printed by Vite.
Run `npm install` first when dependencies are not installed. For deployment,
run `npm run build` and publish `dist/`.

## Changes

- `index.html`: removed the broken `App.css` link. The real stylesheet is already
  imported by `src/App.jsx` from `src/components/App.css`.
- `index.html`: replaced the missing `/vite.svg` favicon with the existing
  `/logo.png` asset.
- `README.md`: added development, production preview, and deployment instructions,
  including why Five Server does not run this source entry point.
- Added this handoff under `doc/` as requested.

The broken stylesheet and favicon links were secondary issues; changing those
links alone does not make Five Server process the React source.

## Verification

- Before edits, `npm run build` passed but warned that `App.css` did not exist.
- After edits, `npm run build` passed without that warning; `git diff --check`
  also passed.
- Vite started successfully at `http://127.0.0.1:5173/`.
- HTTP checks confirmed `/`, `/src/main.jsx`, and `/logo.png` return 200. Vite
  served the entry module as JavaScript with transformed JSX and resolved React
  imports; the HTML no longer referenced the missing stylesheet or favicon.
- A temporary Node check used Vite's `ssrLoadModule` and React's
  `renderToStaticMarkup` to render `App`. The hero, Pokémon selector, archetype,
  playstyle, and team sections were present without a render exception.
- A separate render of the default Bulbasaur team included its stats and HP 45.
- The in-app browser was unavailable, so visual rendering and browser interaction
  were not verified. Server rendering does not execute browser effects.
- `npm run lint` reports six existing unused-variable errors in `src/App.jsx`,
  `src/components/Archetype/Playstyle.jsx`, and
  `src/components/FinalTeam/FinalTeam.jsx`. These are unrelated to Five Server
  serving the unprocessed entry point and were left unchanged.

## Manual check

1. Run `npm run dev` and open its printed URL.
2. Confirm the welcome heading and “Forge your team” link appear.
3. Follow that link and confirm the Pokémon selector starts on Bulbasaur.
4. Use Next, Prev, and the search field to confirm the selector responds.
