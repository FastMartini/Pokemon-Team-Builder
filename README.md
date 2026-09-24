# Martini's Pokelab

A Pokémon team builder built with React and Vite.

## Run locally

From the project folder, install dependencies once:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173/`).
Keep the terminal running while using the app.

Use Vite's development server instead of Five Server, Live Server, or opening
`index.html` directly. This project's HTML loads `/src/main.jsx`; Vite transforms
the React JSX and resolves its package imports so the browser can run it.

## Preview a production build

```sh
npm run build
npm run preview
```

Open the URL printed by the preview command. Deploy the generated `dist/` folder
when publishing to a static host.

## Handoffs

- [Previous UI and startup work](doc/previous-work/handoff.md)
- [Playstyle explanations, team generator, and exact formula](doc/team-builder/handoff.md)

## Build a casual singles team

Choose your core Pokémon, confirm an archetype, and read the explanation for a
playstyle. Optionally choose your core's nature, then click **Build my team**.
The result keeps your core and adds five teammates with roles, suggested abilities,
support-move options, and reasons. Expand **How this team was chosen** to see the
scoring formula. Click a Pokémon card to see level-50 stats (31 IVs, 0 EVs).

This is a roster suggestion using modern data and historical move access for the
386 stored species. Choose final move sets, items, and training for your game;
the app does not validate a competitive format or promise a win rate.

Run `npm test` for generator checks and `npm run lint` for code checks. The data
snapshot works locally; `npm run data:refresh` refreshes it from Pokémon Showdown.
