# Instalater Anđeo — Styleguide

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--yellow` | `#F4E600` | Primary accent, buttons, logo bg, highlights |
| `--yellow-warm` | `#F7C948` | Focus rings, upload hover, warm accents |
| `--dark` | `#111111` | Primary text, dark buttons, footer bg |
| `--white` | `#FFFFFF` | Body bg, card bg |
| `--secondary` | `#4B4B4B` | Body copy, labels, muted text |
| `--section-bg` | `#F6F5F2` | Alternating section backgrounds |
| `#b08800` | — | Section labels, story tags (dark gold) |
| `#c0a000` | — | Mobile nav hover state |
| `#0e0d0b` | — | Footer background |

### Transparency variants
- `rgba(255,255,255,0.92)` — scrolled header bg
- `rgba(255,255,255,0.12)` — outline button bg
- `rgba(255,255,255,0.85)` — nav links on dark bg
- `rgba(255,255,255,0.5)` — hero trust text
- `rgba(0,0,0,0.08)` — header shadow
- `rgba(255,230,130,0.18)` — hero glassmorphism card bg
- `rgba(244,230,0,0.4)` — yellow button glow shadow

---

## Typography

**Font family:** `Manrope, sans-serif`
**Import:** `https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap`

| Role | Size | Weight | Line height | Notes |
|------|------|--------|-------------|-------|
| H1 (hero) | `clamp(26px, 3.2vw, 42px)` | 800 | 1.18 | |
| H2 (section) | `clamp(24px, 3vw, 40px)` | 800 | 1.2 | |
| Body / subtitle | `clamp(15px, 1.2vw, 18px)` | 400 | 1.7 | max-width 600px |
| Section label | `12px` | 700 | — | uppercase, letter-spacing 0.16em, color #b08800 |
| Nav links | `14px` | 500 | — | letter-spacing 0.02em |
| Logo brand | `13px` | 700 | — | uppercase, letter-spacing 0.12em |
| Logo sub | `11px` | 500 | — | letter-spacing 0.04em |
| Button primary | `15px` | 700 | — | |
| Button outline | `15px` | 600 | — | |
| Button ghost | `13px` | 600 | — | |
| Nav CTA | `14px` | 700 | — | |
| Mobile menu link | `16px` | 500 | — | |
| Footer col heading | `13px` | 700 | — | uppercase, letter-spacing 0.1em |
| Footer body | `14px` | 400 | 1.7 | |
| Impact number | `clamp(44px, 5vw, 72px)` | 800 | 1 | color #F4E600 |
| Impact label | `14px` | 500 | — | uppercase, letter-spacing 0.08em |
| Blockquote | `clamp(20px, 2.4vw, 30px)` | 600 | 1.5 | |
| Cite | `14px` | 600 | — | uppercase, letter-spacing 0.1em |

---

## Spacing

| Context | Value |
|---------|-------|
| Section padding | `clamp(64px, 8vw, 120px) 5%` |
| Impact section padding | `clamp(64px, 8vw, 100px) 5%` |
| Quote section padding | `clamp(80px, 10vw, 140px) 5%` |
| Header height | `72px` |
| Header horizontal padding | `5%` |
| Grid gap (cards) | `24px` |
| Grid gap (kako cards) | `20px` |
| Card padding (mission) | `32px 28px` |
| Card padding (kako) | `28px 24px` |
| Card padding (story body) | `24px 22px 22px` |
| Card icon size | `52x52px` |
| Card icon border-radius | `14px` |
| Hero card max-width | `520px` |
| Hero card margin-left | `clamp(0px, 8%, 140px)` |
| Hero card padding | `clamp(28px, 4vw, 44px)` |
| Section max-width | `1100px` |
| Contact form max-width | `820px` |

---

## Border Radius

| Element | Radius |
|---------|--------|
| Hero card | `24px` |
| Btn primary / outline | `14px` |
| Nav CTA, mobile CTA | `12px` |
| Mission / story / kako / impact cards | `20px` |
| Partner items | `14px` |
| Form inputs | `12px` |
| Form tabs container | `14px` |
| Form tab (active) | `10px` |
| Logo icon (header) | `10px` |
| Logo icon (hero) | `8px` |
| Social buttons (footer) | `10px` |
| Upload area | `12px` |
| Form note | `10px` |
| Prijava image | `24px` |
| Scrollbar thumb | `3px` |

---

## Shadows

| Element | Shadow |
|---------|--------|
| Header (scrolled) | `0 2px 24px rgba(0,0,0,0.08)` |
| Hero card | `0 24px 80px rgba(0,0,0,0.32)` |
| Mobile menu | `0 20px 40px rgba(0,0,0,0.12)` |
| Mission card (hover) | `0 16px 48px rgba(0,0,0,0.1)` |
| Mission card | `0 4px 32px rgba(0,0,0,0.06)` |
| Story card (hover) | `0 20px 48px rgba(0,0,0,0.12)` |
| Story card | `0 4px 24px rgba(0,0,0,0.06)` |
| Kako card (hover) | `0 20px 48px rgba(0,0,0,0.08)` |
| Partner item (hover) | `0 12px 32px rgba(0,0,0,0.1)` |
| Button primary (hover) | `0 12px 32px rgba(244,230,0,0.5)` |
| Nav CTA (hover) | `0 8px 24px rgba(244,230,0,0.4)` |
| Section CTA (hover) | `0 12px 32px rgba(244,230,0,0.45)` |
| Button outline (hover) | `0 8px 24px rgba(0,0,0,0.2)` |
| Form submit (hover) | `0 12px 32px rgba(0,0,0,0.2)` |
| Form active tab | `0 2px 12px rgba(0,0,0,0.08)` |
| Input focus ring | `0 0 0 3px rgba(244,230,0,0.18)` |

---

## Buttons

### Primary `.btn-primary`
```
background:    #F4E600
color:         #111111
padding:       14px 26px
border-radius: 14px
font-weight:   700
font-size:     15px
hover:         translateY(-3px) + box-shadow 0 12px 32px rgba(244,230,0,0.5)
```

### Outline `.btn-outline`
```
background:    rgba(255,255,255,0.12)
color:         #FFFFFF
padding:       14px 26px
border-radius: 14px
font-weight:   600
font-size:     15px
border:        1.5px solid rgba(255,255,255,0.45)
backdrop-filter: blur(8px)
hover:         translateY(-3px) + rgba(255,255,255,0.22)
```

### Ghost `.btn-ghost`
```
background:    none
color:         #111111
padding:       8px 18px
border-radius: 10px
font-size:     13px
font-weight:   600
border:        1.5px solid #ddd
hover:         border-color #111111, background #f5f5f5
```

### Section CTA `.section-cta`
```
background:    #F4E600
color:         #111111
padding:       16px 36px
border-radius: 14px
font-weight:   700
font-size:     16px
hover:         translateY(-3px) + box-shadow 0 12px 32px rgba(244,230,0,0.45)
```

### Nav CTA `.nav-cta`
```
background:    #F4E600
color:         #111111
padding:       10px 22px
border-radius: 12px
font-weight:   700
font-size:     14px
hover:         translateY(-2px) + box-shadow 0 8px 24px rgba(244,230,0,0.4)
```

---

## Animations & Transitions

| Name | Definition |
|------|-----------|
| `fadeInCard` | opacity 0→1 + translateX(-28px→0), 1s ease |
| `bounce` | translateY(0→8px→0), 2s ease-in-out infinite |
| Reveal on scroll | opacity 0→1 + translateY(32px→0), 0.7s ease, threshold 12% |
| Card hover lift | translateY(-6px), 0.25s |
| Header blur | background + backdrop-filter + box-shadow, 0.4s ease |
| General hover | transform 0.2s, box-shadow 0.2s |
| Color transitions | color 0.2s, border-color 0.2s, background 0.2s |
| Partner grayscale | filter 0.3s, transform 0.25s, box-shadow 0.25s |

---

## Layout & Grid

| Grid | Columns | Gap |
|------|---------|-----|
| Mission cards | `repeat(3, 1fr)` | `24px` |
| Impact grid | `repeat(4, 1fr)` | `24px` |
| Kako grid | `repeat(4, 1fr)` | `20px` |
| Galerija grid | `repeat(3, 1fr)` | `24px` |
| Prijava split | `1fr 1fr` | `80px` |
| Footer top | `2fr 1fr 1fr 1fr` | `48px` |

---

## Breakpoints

| Breakpoint | Changes |
|-----------|---------|
| max-width 1024px | Impact 2 col, Kako 2 col, Footer 2 col |
| max-width 768px | Nav hidden, hamburger active, Mission/Galerija/Form 1 col, Prijava stacked, Footer 1 col |
| max-width 480px | Impact 2 col, Kako 1 col, Partner items 120x60px |

---

## Glassmorphism (Hero Card)

```
background:              rgba(255, 230, 130, 0.18)
backdrop-filter:         blur(20px)
-webkit-backdrop-filter: blur(20px)
border:                  1px solid rgba(255,255,255,0.28)
box-shadow:              0 24px 80px rgba(0,0,0,0.32)
border-radius:           24px
```

---

## Hero Overlay Gradient

```
background: linear-gradient(
  105deg,
  rgba(10,6,2,0.72)   0%,
  rgba(30,18,5,0.58)  40%,
  rgba(60,35,10,0.22) 70%,
  rgba(80,50,10,0.06) 100%
)
```

---

## Form

```
Input border:        1.5px solid #e8e8e8
Input border-radius: 12px
Input focus border:  #F7C948
Input focus shadow:  0 0 0 3px rgba(244,230,0,0.18)
Textarea min-height: 120px
Upload border:       2px dashed #ddd
Form note bg:        #fefae5
Form note border:    3px solid #F4E600 (left)
Submit bg:           #111111
Submit color:        #FFFFFF
Submit success bg:   #2d7a3a
Tab container bg:    #F6F5F2
Tab border-radius:   14px (container), 10px (active tab)
Tab padding:         6px (container)
Active tab bg:       #FFFFFF
Active tab shadow:   0 2px 12px rgba(0,0,0,0.08)
```

---

## Partner Items

```
width:         148px
height:        72px
background:    #FFFFFF
border:        1px solid #e8e8e8
border-radius: 14px
filter:        grayscale(1) opacity(0.55)
hover:         grayscale(0) opacity(1) + translateY(-4px) + box-shadow 0 12px 32px rgba(0,0,0,0.1)
```

---

## Scrollbar

```
width:  6px
track:  #f0f0f0
thumb:  #ccc, border-radius 3px
```