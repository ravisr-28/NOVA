---
name: NOVA Design System
description: The complete NOVA Design System for the NOVA frontend application. Defines all colors, typography, spacing, buttons, form elements, data tables, navigation, cards, sidebar, status badges, and component patterns. Must be followed for all UI work.
---

# NOVA Design System — Full Specification

> **Tagline:** _Sharp lines. Modern classic._

This document is the single source of truth for all frontend UI design decisions. Every component, page, or layout built for this application **must** adhere to these tokens, styles, and patterns.

---

## 1. Color Palette

### 1.1 Primary Colors

| Token                  | Hex         | Usage                                      |
| ---------------------- | ----------- | ------------------------------------------ |
| `--color-navy-900`     | `#0B1D3A`   | Deepest navy — primary backgrounds, headers|
| `--color-navy-800`     | `#132D53`   | Dark navy — sidebar, nav active state      |
| `--color-navy-700`     | `#1A3A63`   | Navy — card headers, table headers         |
| `--color-navy-600`     | `#234E78`   | Medium navy — hover states                 |
| `--color-navy-500`     | `#2D6290`   | Navy accent — links, interactive elements  |

### 1.2 Secondary Colors — Teal / Forest

| Token                  | Hex         | Usage                                      |
| ---------------------- | ----------- | ------------------------------------------ |
| `--color-teal-900`     | `#1B3A34`   | Darkest teal — secondary dark backgrounds  |
| `--color-teal-800`     | `#264D44`   | Deep teal — secondary buttons              |
| `--color-teal-700`     | `#2E6355`   | Teal — badges, status "active"             |
| `--color-teal-600`     | `#3A7D6A`   | Medium teal — hover states                 |
| `--color-teal-500`     | `#4A9A82`   | Light teal — highlights, success accents   |

### 1.3 Accent Colors — Gold / Amber

| Token                  | Hex         | Usage                                      |
| ---------------------- | ----------- | ------------------------------------------ |
| `--color-gold-700`     | `#8B6914`   | Dark gold — secondary CTA text             |
| `--color-gold-600`     | `#A67C1A`   | Gold — accent buttons, highlights          |
| `--color-gold-500`     | `#C49A2A`   | Warm gold — tags, badges, star ratings     |
| `--color-gold-400`     | `#D4AF37`   | Bright gold — primary CTA, premium markers |
| `--color-gold-300`     | `#E0C068`   | Light gold — hover tint, gentle highlights |

### 1.4 Neutrals

| Token                  | Hex         | Usage                                      |
| ---------------------- | ----------- | ------------------------------------------ |
| `--color-white`        | `#FFFFFF`   | Backgrounds, card surfaces                 |
| `--color-gray-50`      | `#FAFAF8`   | Page background, subtle surface            |
| `--color-gray-100`     | `#F0EFEB`   | Alternate row backgrounds, dividers        |
| `--color-gray-200`     | `#E2E0DA`   | Borders, input outlines (idle)             |
| `--color-gray-300`     | `#C8C5BC`   | Placeholder text, disabled states          |
| `--color-gray-400`     | `#A09D94`   | Muted text, secondary labels              |
| `--color-gray-500`     | `#787570`   | Body text (secondary)                      |
| `--color-gray-600`     | `#5C5955`   | Body text (primary)                        |
| `--color-gray-700`     | `#3D3B38`   | Headings, high-contrast text               |
| `--color-gray-800`     | `#2A2826`   | Near-black text                            |
| `--color-gray-900`     | `#1A1917`   | Deepest dark text                          |

### 1.5 Semantic / Status Colors

| Token                  | Hex         | Usage                                      |
| ---------------------- | ----------- | ------------------------------------------ |
| `--color-error`        | `#C0392B`   | Error states, destructive actions, alerts  |
| `--color-error-light`  | `#E8D0CE`   | Error background tint                      |
| `--color-success`      | `#2E6355`   | Success — uses teal-700                    |
| `--color-success-light`| `#D4E8E2`   | Success background tint                    |
| `--color-warning`      | `#D4AF37`   | Warning — uses gold-400                    |
| `--color-warning-light`| `#F5EDCE`   | Warning background tint                    |
| `--color-info`         | `#2D6290`   | Info — uses navy-500                       |
| `--color-info-light`   | `#D0DDE8`   | Info background tint                       |

---

## 2. Typography

### 2.1 Font Families

| Token            | Value                                         | Usage                              |
| ---------------- | --------------------------------------------- | ---------------------------------- |
| `--font-heading` | `'DM Serif Display', 'Georgia', serif`        | Headings (h1–h3), hero text        |
| `--font-body`    | `'DM Sans', 'Inter', system-ui, sans-serif`   | Body text, labels, UI elements     |
| `--font-mono`    | `'DM Mono', 'Fira Code', monospace`           | Code snippets, data values         |

> Load from Google Fonts:
> ```html
> <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
> ```

### 2.2 Type Scale

| Level        | Font Family       | Size   | Weight | Line Height | Letter Spacing | Usage                     |
| ------------ | ----------------- | ------ | ------ | ----------- | -------------- | ------------------------- |
| Display      | `--font-heading`  | 48px   | 400    | 1.1         | -1.5px         | Hero sections only        |
| H1           | `--font-heading`  | 36px   | 400    | 1.2         | -1px           | Page titles               |
| H2           | `--font-heading`  | 28px   | 400    | 1.25        | -0.5px         | Section headings          |
| H3           | `--font-body`     | 22px   | 600    | 1.3         | -0.3px         | Card titles, sub-sections |
| H4           | `--font-body`     | 18px   | 600    | 1.35        | 0              | Widget headings           |
| Body Large   | `--font-body`     | 16px   | 400    | 1.5         | 0.15px         | Primary body text         |
| Body         | `--font-body`     | 14px   | 400    | 1.5         | 0.15px         | Standard body, table text |
| Body Small   | `--font-body`     | 13px   | 400    | 1.45        | 0.2px          | Captions, helper text     |
| Caption      | `--font-body`     | 12px   | 500    | 1.4         | 0.3px          | Labels, meta info         |
| Overline     | `--font-body`     | 11px   | 600    | 1.5         | 1.5px          | Uppercase labels          |

---

## 3. Spacing System

Use a **4px base unit** with the following scale:

| Token      | Value   | Usage                              |
| ---------- | ------- | ---------------------------------- |
| `--sp-1`   | `4px`   | Tight internal padding             |
| `--sp-2`   | `8px`   | Icon-to-text gap, compact padding  |
| `--sp-3`   | `12px`  | Small component padding            |
| `--sp-4`   | `16px`  | Standard padding, gap              |
| `--sp-5`   | `20px`  | Medium section spacing             |
| `--sp-6`   | `24px`  | Card padding, section gaps         |
| `--sp-8`   | `32px`  | Large section margins              |
| `--sp-10`  | `40px`  | Page-level spacing                 |
| `--sp-12`  | `48px`  | Hero spacing                       |
| `--sp-16`  | `64px`  | Major section breaks               |

---

## 4. Border Radius

| Token              | Value   | Usage                                  |
| ------------------ | ------- | -------------------------------------- |
| `--radius-sm`      | `4px`   | Small tags, badges                     |
| `--radius-md`      | `6px`   | Inputs, table cells                    |
| `--radius-lg`      | `8px`   | Cards, dropdowns, modals               |
| `--radius-xl`      | `12px`  | Large cards, panels                    |
| `--radius-pill`    | `9999px`| Pill buttons, rounded badges           |
| `--radius-circle`  | `50%`   | Avatars, round icons                   |

---

## 5. Shadows & Elevation

| Token                | Value                                                     | Usage                  |
| -------------------- | --------------------------------------------------------- | ---------------------- |
| `--shadow-xs`        | `0 1px 2px rgba(11,29,58,0.05)`                           | Subtle lift            |
| `--shadow-sm`        | `0 1px 3px rgba(11,29,58,0.08), 0 1px 2px rgba(11,29,58,0.04)` | Cards (idle)     |
| `--shadow-md`        | `0 4px 6px rgba(11,29,58,0.07), 0 2px 4px rgba(11,29,58,0.04)` | Cards (hover)    |
| `--shadow-lg`        | `0 10px 15px rgba(11,29,58,0.08), 0 4px 6px rgba(11,29,58,0.04)` | Dropdowns, modals |
| `--shadow-xl`        | `0 20px 25px rgba(11,29,58,0.10), 0 8px 10px rgba(11,29,58,0.04)` | Full overlays   |

---

## 6. Buttons

### 6.1 Variants

| Variant      | Background             | Text Color          | Border               | Usage                        |
| ------------ | ---------------------- | ------------------- | -------------------- | ---------------------------- |
| **Primary**  | `--color-navy-900`     | `--color-white`     | none                 | Main CTAs, form submits      |
| **Secondary**| `--color-teal-700`     | `--color-white`     | none                 | Secondary actions             |
| **Accent**   | `--color-gold-400`     | `--color-navy-900`  | none                 | Highlights, premium actions   |
| **Outline**  | `transparent`          | `--color-navy-900`  | 1.5px `--color-navy-900` | Tertiary actions          |
| **Ghost**    | `transparent`          | `--color-navy-700`  | none                 | Inline actions, links         |
| **Danger**   | `--color-error`        | `--color-white`     | none                 | Destructive actions           |

### 6.2 Sizes

| Size     | Height | Padding (h / v)   | Font Size | Radius         |
| -------- | ------ | ------------------ | --------- | -------------- |
| Small    | 32px   | 12px / 6px         | 13px      | `--radius-md`  |
| Medium   | 40px   | 16px / 8px         | 14px      | `--radius-md`  |
| Large    | 48px   | 24px / 12px        | 16px      | `--radius-md`  |
| Pill SM  | 32px   | 16px / 6px         | 13px      | `--radius-pill`|
| Pill MD  | 40px   | 20px / 8px         | 14px      | `--radius-pill`|
| Pill LG  | 48px   | 28px / 12px        | 16px      | `--radius-pill`|

### 6.3 States

| State      | Behavior                                                 |
| ---------- | -------------------------------------------------------- |
| Hover      | Lighten background 8%, add `--shadow-sm`                 |
| Active     | Darken background 5%, scale(0.98)                        |
| Focus      | 2px outline `--color-gold-400`, offset 2px               |
| Disabled   | Opacity 0.5, cursor not-allowed, no hover effects        |
| Loading    | Show spinner icon, disable interaction                   |

### 6.4 Icon Buttons

- Icon-only buttons: equal width & height (square or circle)
- Icon + text: icon placed `--sp-2` (8px) before label text
- Icon size: 16px (small), 18px (medium), 20px (large)

---

## 7. Form Elements

### 7.1 Text Inputs

| Property       | Value                                                        |
| -------------- | ------------------------------------------------------------ |
| Height         | 40px (default), 48px (large)                                 |
| Padding        | 12px horizontal                                              |
| Border         | 1.5px solid `--color-gray-200`                               |
| Border Radius  | `--radius-md`                                                |
| Font           | `--font-body` at 14px                                        |
| Background     | `--color-white`                                              |
| **Focus**      | Border → `--color-navy-500`, ring 3px `rgba(45,98,144,0.15)` |
| **Error**      | Border → `--color-error`, ring 3px `rgba(192,57,43,0.12)`   |
| **Disabled**   | Background `--color-gray-100`, opacity 0.6                   |
| Label          | Caption style, `--color-gray-600`, margin-bottom 6px         |
| Helper Text    | Body Small, `--color-gray-400`, margin-top 4px               |
| Error Text     | Body Small, `--color-error`, margin-top 4px                  |

### 7.2 Select / Dropdown

- Same dimensions & styles as text inputs
- Chevron icon (16px) on right side, `--color-gray-400`
- Dropdown panel: `--shadow-lg`, `--radius-lg`, max-height 280px, scrollable
- Options: 40px height, hover background `--color-gray-50`

### 7.3 Checkbox & Radio

| Property       | Value                                                        |
| -------------- | ------------------------------------------------------------ |
| Size           | 18px × 18px                                                  |
| Border         | 1.5px solid `--color-gray-300`                               |
| Border Radius  | 3px (checkbox), 50% (radio)                                  |
| Checked BG     | `--color-navy-900`                                           |
| Check Mark     | White, 2px stroke                                            |
| Label gap      | 8px from the box                                             |

### 7.4 Textarea

- Same border/focus styles as text input
- Min-height: 100px
- Resize: vertical only

---

## 8. Data Tables

| Property            | Value                                                   |
| ------------------- | ------------------------------------------------------- |
| Header BG           | `--color-gray-50`                                       |
| Header Font         | Caption style, `--color-gray-600`, uppercase, 600 weight|
| Row Height          | 52px                                                    |
| Row Border          | 1px solid `--color-gray-100` (bottom)                   |
| Row Hover BG        | `--color-gray-50`                                       |
| Cell Padding        | 16px horizontal, vertically centered                    |
| Cell Font           | Body (14px), `--color-gray-700`                         |
| Selected Row BG     | `rgba(45,98,144,0.06)`                                  |
| Striped Alternate   | `--color-gray-50` on even rows (optional)               |
| Pagination          | Right-aligned, pill-style page buttons                  |

---

## 9. Navigation

### 9.1 Top Navigation Bar

| Property       | Value                                                        |
| -------------- | ------------------------------------------------------------ |
| Height         | 64px                                                         |
| Background     | `--color-white`                                              |
| Border Bottom  | 1px solid `--color-gray-200`                                 |
| Shadow         | `--shadow-xs`                                                |
| Logo area      | Left-aligned, height 32px                                    |
| Nav Links      | Body (14px), `--color-gray-500`, 600 weight                  |
| Active Link    | `--color-navy-900`, 2px bottom border `--color-gold-400`     |
| Hover Link     | `--color-navy-700`                                           |

### 9.2 Tab Navigation

| Property       | Value                                                        |
| -------------- | ------------------------------------------------------------ |
| Tab Height     | 44px                                                         |
| Tab Font       | Body (14px), `--color-gray-500`, 500 weight                  |
| Active Tab     | `--color-navy-900`, font-weight 600                          |
| Active Bar     | 2px bottom border `--color-gold-400`                         |
| Hover Tab      | `--color-gray-700`, background `--color-gray-50`             |
| Tab Gap        | 0 (flush, separated by border)                               |

### 9.3 Sidebar Navigation

| Property           | Value                                                    |
| ------------------ | -------------------------------------------------------- |
| Width              | 260px (expanded), 72px (collapsed)                       |
| Background         | `--color-navy-900`                                       |
| Text Color         | `rgba(255,255,255,0.7)`                                  |
| Active Item BG     | `rgba(255,255,255,0.1)`                                  |
| Active Item Text   | `--color-white`, font-weight 600                         |
| Active Item Left   | 3px left border `--color-gold-400`                       |
| Hover BG           | `rgba(255,255,255,0.06)`                                 |
| Item Height        | 44px                                                     |
| Item Padding       | 16px horizontal                                          |
| Icon Size          | 20px, `rgba(255,255,255,0.6)` (active: `--color-white`) |
| Section Divider    | 1px `rgba(255,255,255,0.08)`, margin 12px vertical       |

---

## 10. Cards

| Property         | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| Background       | `--color-white`                                            |
| Border           | 1px solid `--color-gray-200`                               |
| Border Radius    | `--radius-lg`                                              |
| Padding          | `--sp-6` (24px)                                            |
| Shadow (idle)    | `--shadow-sm`                                              |
| Shadow (hover)   | `--shadow-md`, translate Y -2px                            |
| Image Ratio      | 16:10 or 4:3, `object-fit: cover`, top `--radius-lg`      |
| Title            | H3 style, margin-top 16px                                  |
| Description      | Body, `--color-gray-500`, margin-top 8px                   |
| Footer           | Border-top 1px `--color-gray-100`, padding-top 16px        |
| Transition       | `all 0.2s ease`                                            |

---

## 11. Badges & Status Indicators

### 11.1 Badge Variants

| Variant    | Background               | Text Color             | Usage              |
| ---------- | ------------------------ | ---------------------- | ------------------ |
| Navy       | `rgba(11,29,58,0.08)`    | `--color-navy-800`     | Default, neutral   |
| Teal       | `rgba(46,99,85,0.10)`    | `--color-teal-700`     | Active, online     |
| Gold       | `rgba(212,175,55,0.12)`  | `--color-gold-700`     | Pending, warning   |
| Red        | `rgba(192,57,43,0.10)`   | `--color-error`        | Error, offline     |
| Gray       | `--color-gray-100`       | `--color-gray-500`     | Disabled, archived |

### 11.2 Badge Sizes

| Size    | Height | Padding     | Font Size | Radius           |
| ------- | ------ | ----------- | --------- | ---------------- |
| Small   | 22px   | 8px / 2px   | 11px      | `--radius-pill`  |
| Medium  | 28px   | 10px / 4px  | 12px      | `--radius-pill`  |

### 11.3 Status Dots

- Size: 8px circle
- Colors match badge variants
- Placed 6px before status text
- Optionally pulse-animated for "live" states

---

## 12. Icons

| Property   | Value                                                         |
| ---------- | ------------------------------------------------------------- |
| Library    | `lucide-react` (already in project deps)                      |
| Size SM    | 16px                                                          |
| Size MD    | 20px (default)                                                |
| Size LG    | 24px                                                          |
| Stroke     | 1.75px                                                        |
| Color      | Inherits from parent `color` property                         |

---

## 13. Transitions & Animation

| Token                | Value                         | Usage                     |
| -------------------- | ----------------------------- | ------------------------- |
| `--ease-default`     | `cubic-bezier(0.4,0,0.2,1)`  | General transitions       |
| `--ease-in`          | `cubic-bezier(0.4,0,1,1)`    | Elements entering         |
| `--ease-out`         | `cubic-bezier(0,0,0.2,1)`    | Elements leaving          |
| `--duration-fast`    | `150ms`                       | Hovers, toggles           |
| `--duration-normal`  | `200ms`                       | Standard transitions      |
| `--duration-slow`    | `300ms`                       | Modals, page transitions  |

---

## 14. Breakpoints (Responsive)

| Name    | Min Width | Usage                                  |
| ------- | --------- | -------------------------------------- |
| Mobile  | `0px`     | Stack layouts, full-width cards        |
| Tablet  | `768px`   | 2-column grids, collapsible sidebar    |
| Desktop | `1024px`  | Full sidebar, 3-4 column grids         |
| Wide    | `1440px`  | Max-width container, spacious layouts  |

Container max-width: **1280px**, centered with auto margins, padding `--sp-6` on mobile.

---

## 15. Z-Index Scale

| Token           | Value   | Usage                     |
| --------------- | ------- | ------------------------- |
| `--z-base`      | `0`     | Default stacking          |
| `--z-dropdown`  | `100`   | Dropdowns, popovers       |
| `--z-sticky`    | `200`   | Sticky headers, sidebar   |
| `--z-overlay`   | `300`   | Overlays, backdrops       |
| `--z-modal`     | `400`   | Modals, dialogs           |
| `--z-toast`     | `500`   | Toast notifications       |
| `--z-tooltip`   | `600`   | Tooltips                  |

---

## 16. Component Patterns — Quick Reference

### Modal / Dialog
- Backdrop: `rgba(11,29,58,0.4)`, blur 4px
- Panel: `--color-white`, `--radius-xl`, `--shadow-xl`, max-width 560px
- Header: 20px padding, border-bottom, H3 title
- Body: 24px padding
- Footer: 20px padding, right-aligned buttons, border-top

### Toast / Notification (via `sonner`)
- Position: top-right
- Width: 360px
- Border-left: 4px solid (semantic color)
- Background: `--color-white`, `--shadow-lg`
- Auto-dismiss: 5s

### Tooltip
- Background: `--color-navy-900`
- Text: `--color-white`, 12px
- Padding: 6px 10px
- Radius: `--radius-sm`
- Arrow: 6px

### Avatar
- Sizes: 28px (sm), 36px (md), 44px (lg), 64px (xl)
- Shape: circle
- Fallback: initials on `--color-navy-700` background, white text
- Border: 2px solid `--color-white` (for stacked avatars)

---

## 17. Implementation Notes

1. **All CSS custom properties** listed above should be declared in `:root` inside `index.css`.
2. **Google Fonts** (`DM Sans`, `DM Serif Display`, `DM Mono`) must be loaded in `index.html`.
3. **Lucide React** is already a dependency — use it for all iconography.
4. **Sonner** is already a dependency — use it for toast notifications, styled to match the system.
5. **Dark Mode** is NOT part of this design system at this time. The palette is designed for a light, warm aesthetic.
6. Prefer **CSS custom properties** over hard-coded values for maximum consistency.
7. All interactive elements must have `:focus-visible` outlines for accessibility.
