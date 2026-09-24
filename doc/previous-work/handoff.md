# Handoff: work completed before the team-generator update

## Scope

This records the work from the blank-page investigation through the single random
Pokémon archetype reveal. The subsequent playstyle explanations and team generator
are documented separately in [../team-builder/handoff.md](../team-builder/handoff.md).
All changes were made in the shared working tree; no commit or deployment was made.

## Startup and blank page

- The user was opening the React/Vite entry HTML with Five Server. The page needs
  Vite to transform JSX and resolve package imports: run `npm run dev` and open
  its printed local URL. For a static deployment, build and publish `dist/`.
- Removed the nonexistent `App.css` HTML link; `App.jsx` already imports the real CSS.
- Replaced the missing Vite favicon with the existing `/logo.png`.
- Added startup/build instructions to `README.md`.

## Core Pokémon picker

- Moved “Choose Your Core Pokémon” above the image.
- Placed Prev and Next on opposite sides of the image, with responsive sizing.
- Put the number/name beneath the image and tightened the space before the search
  field. The final label margin uses `clamp(-3rem, -5vw, -1.5rem)`.
- Centered Select beneath the search field.
- Kept the core section at least one viewport tall. Moved the navbar clearance
  inside the painted section instead of using an external scroll margin, removing
  the visible gap when following “Forge your team”.
- Added polite screen-reader announcements for the current Pokémon label.

## Playstyles background and layout

- Added `PlaystyleBackground.jsx` and its CSS, using all 386 existing sprite URLs
  as the random pool. There are 30 animated slots on desktop, 18 on smaller screens.
- The final animation drifts sideways in both directions and rotates each sprite.
  A new random sprite is selected only when its crossing finishes, not when the
  nested spin animation finishes.
- Sprites occupy six evenly spaced rows. Positioning overrides older stored
  animation styles that can survive Vite Fast Refresh.
- Decorative images have empty alt text, do not intercept clicks, and are hidden
  when the user requests reduced motion.
- Made the Archetype/Playstyles slider viewport-wide, removed conflicting duplicate
  slider CSS, and kept controls above the background. This removed white side gaps.

## Navigation

- Added Back to archetypes. `showPlaystyles` controls the visible panel separately
  from `lockedArc`, so going back preserves the chosen archetype and selections.
- Confirming a different archetype clears the previous playstyle and nature.
- Disabled confirming the placeholder archetype.
- Moved default playstyle synchronization into an effect to avoid setting parent
  state during child rendering.

## Archetype reveal: final agreed design

- The user chose to replace floating Pokémon only in the archetype picker.
  Playstyles retains the sideways floating background.
- Added six archetype themes with accent colors and six illustrative Pokémon per
  theme in `src/data/archetypeThemes.js`.
- The initial six-banner version was replaced by one large angled banner entering
  from the left, with a single randomly chosen Pokémon from that theme’s lineup.
- The reveal is keyed by the archetype. A new selection remounts it, rerolls the
  Pokémon, and replays the entrance. Ordinary rerenders keep that Pokémon stable.
  Random sampling may select the same Pokémon again.
- Desktop controls sit beside the banner; smaller screens put the banner above
  the controls. Reduced-motion preferences disable the slide.
- These themed images were decorative; they did not generate the final team.

## Principal files

- `index.html`, `README.md`
- `src/App.jsx`, `src/components/slider.css`
- `src/components/CorePokemon/CorePokemon.jsx` and `.css`
- `src/components/Archetype/Archetype.jsx` and `.css`
- `src/components/Archetype/Playstyle.jsx` and `.css`
- `src/components/Archetype/PlaystyleBackground.jsx` and `.css`
- `src/components/Archetype/ArchetypeReveal.jsx` and `.css`
- `src/data/archetypeThemes.js`

## Validation and limitations at that time

- Production builds and targeted lint/whitespace checks passed after the changes.
- The original full lint run had six unused-variable errors. Some were cleaned up
  in touched files; the remaining FinalTeam errors belonged to the old code.
- Vite HTTP checks and initial React server rendering succeeded during startup diagnosis.
- The in-app browser was unavailable throughout, so no automated visual or browser
  interaction verification was performed. The user provided visual feedback on
  successive changes.
- Before the new team-generator work, FinalTeam populated only the core slot; the
  other five slots were empty. The existing stats table had only 150 records and
  the old UI applied nature multipliers directly to base stats.

## Documentation preference

The user initially requested handoffs for changes, later paused that requirement,
then explicitly requested this consolidated handoff and a separate handoff for
team generation. Earlier dated notes in `doc/` are historical records; later
changes above supersede intermediate designs.
