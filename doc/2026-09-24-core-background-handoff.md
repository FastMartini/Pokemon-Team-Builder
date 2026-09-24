# Core Pokémon background handoff

## Request and findings

After clicking “Forge your team”, the Pokémon section background appeared cut
off with a white strip visible. The section had a minimum height of only `70vh`,
and its `12rem` scroll margin left space outside the painted background when
landing on the anchor.

## Change

Updated `src/components/CorePokemon/CorePokemon.css`:

- Made the section at least one viewport tall (`100dvh`, with `100vh` fallback).
  Its background already uses `inset: 0` and `background-size: cover`, so it now
  covers the enlarged section. Content can still make the section taller.
- Moved the existing `12rem` navbar clearance from the scroll margin into the
  section's top padding. The anchor now aligns the background with the viewport
  top, while the heading and controls retain their previous position beneath the
  fixed navbar after scrolling.

This replaces the scroll-margin approach recorded in the earlier layout handoff.

## Verification

- Passed `npm run build`.
- Passed `git diff --check`.
- Browser preview remains unavailable, so the visual result needs a manual check:
  click “Forge your team” at desktop and mobile widths and confirm the background
  fills the viewport below the navbar, the heading stays visible, and the
  controls remain reachable on shorter screens.
