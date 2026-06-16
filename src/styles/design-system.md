# Amber Glass Atelier Design System

## Theme Intent

- Premium iOS-forward glass aesthetic with warm craft-beverage personality.
- High readability first, with restrained accent usage.

## Core Palette

- Background: `#F6F1E8`
- Elevated Background: `#EFE7DA`
- Dark Background: `#131110`
- Dark Elevated Background: `#1A1715`
- Primary Text: `#1F1A16`
- Secondary Text: `#5E554E`
- Inverse Text: `#F7F3EE`
- Dark Secondary Text: `#C3B8AC`
- Accent Amber: `#C8872C`
- Accent Amber Pressed: `#A56E20`
- Success Green: `#3E7E62`
- Danger: `#C84F4F`

## Glass Materials

- Light Surface: `rgba(255,255,255,0.58)`
- Dark Surface: `rgba(22,20,18,0.50)`
- Light Border: `rgba(255,255,255,0.45)`
- Dark Border: `rgba(255,255,255,0.14)`
- Light Separator: `rgba(255,255,255,0.35)`
- Dark Separator: `rgba(255,255,255,0.10)`

## Semantic Usage

- Use `atelier-accent` for primary CTAs.
- Use `atelier-success` for positive actions and active nav icons.
- Use `atelier-text` and `atelier-text-muted` for content hierarchy.
- Keep list rows transparent within glass cards; use separator tokens only.

## Component Rules

- Headers and tab bar must use blur + translucent overlay.
- Cards are glass surfaces, never full opaque white.
- Buttons must use semantic tokens; no ad hoc hex values.
- New components should import `theme` from `src/styles/theme.ts` for inline colors.
