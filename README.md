GIFcommit00011

# Layout study — Hot 'n Now, in its old colours, as GIFn'now

**Live:** [`https://gregoryedgerton.github.io/golden-grids-study-12-hotnnow/`](https://gregoryedgerton.github.io/golden-grids-study-12-hotnnow/)

An unaffiliated layout study. It rebuilds the five pages of
[hot-n-now.com](https://www.hot-n-now.com/) (home, menu, about, careers,
locations) as stacked golden grids under the GIFn'now brand, with the
content of the brand as it is today and the style of the brand as it was: the
navy, gold and red of the 1992 mark, the red-roofed building and the blue
drive-thru board. GIFn'now is not the restaurant. Nothing here can be
ordered, no form sends anything, and none of the site's sentences, photographs
or marks is reproduced. Built with
[Golden Grids](https://github.com/gregoryedgerton/golden-grids) from the
[study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Reference

**Content: the current site**, read and captured 2026-10-08 at 390 / 820 /
1440 (measured boxes in [`captures/reference-*.json`](captures/); the
screenshots are not kept, they carry the site's photography). It is a small
site in purple, gold and red with a heavy geometric face: a headline over a
bolt, a photograph beside a gold panel, a featured burger, a closing line and
a sign-up form on every page. The menu is a two-column list with no prices:
four mains, six extras, three sides, eight soft drinks and two shakes, and two
bundles. About has four values and nine questions; careers has five values and
an apply link; locations has two addresses and a note on franchising.

**Style: the legacy branding**, from three files on Wikimedia Commons, used as
reference and, for the two photographs, shown with credit:

- the 1992 logo, whose SVG gives the colours: navy `#0B145F`, gold `#FEBC12`,
  red `#E31921`;
- a 2014 photograph of a former restaurant: a white wall, a tall slanted red
  standing-seam roof, a navy base under a red line;
- a 2014 photograph of the Sturgis drive-thru board: a blue frame, a cream
  header with the name in red, rows of coloured strips with white price tiles
  and a checkered panel.

From those the study takes: the three colours as flat blocks with no outlines;
a band heading drawn as the seamed red roof with its slanted gable; the menu
bands framed as the blue board with a cream header, each item under a coloured
strip with a white tile for what the board lists; the board's purple, green
and orange as secondary tones; a checkered edge on the bag; and a footer that
is the building's navy base under its red line. Archivo at its blackest and
widest stands in for the sign lettering. The purple of the current site is not
used as a brand colour. The reference has one scheme; dark is the study's.

## Approach

The current site sets its menu as a two-column list without prices, and its other pages as a headline, a photograph beside a coloured panel and a closing line. The study sets each menu section as one grid, with one item in the largest square, and each item's square opens to order it. The look is taken from the chain's older branding rather than its current one.

## The pages

Five Vite entries, plain relative links, no router. `Squares`
([`src/bands/bands.tsx`](src/bands/bands.tsx)) draws every band from facts,
photographs, strips and menu items; `lib/plan.ts` chooses each grid. More than
half the bands skip a range, so the library collapses the smaller squares into
one strip. Measured sizes are the grid's width×height; below 1100px a skip
grid falls back to a plain one and a band of five is dealt into two.

**Home** (`index.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Hungry now? Good timing. | from 2 to 5 · bottom · ccw · strip | 358×239+358×179 / 788×525+788×394 / 1140×713 |
| The Olive Burger | from 3 to 5 · left · ccw · strip | 358×573 / 788×493 / 1140×713 |
| Pull up, order, go | from 1 to 3 · bottom · cw | 358×537 / 788×525 / 1140×760 |

**Menu** (`menu.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Mains | from 2 to 5 · bottom · cw · strip | 338×225+338×169 / 768×512+768×384 / 1120×700 |
| Extras | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |
| Sides | from 3 to 5 · left · cw · strip | 338×541 / 768×480 / 1120×700 |
| Beverages | from 2 to 5 · bottom · ccw · strip | 338×225+338×169 / 768×512+768×384 / 1120×700 |
| More for less | from 1 to 4 · right · ccw | 358×597 / 788×473 / 1140×684 |

**About** (`about.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Since 1984 | from 3 to 5 · right · cw · strip | 358×573 / 788×493 / 1140×713 |
| What it is all about | from 1 to 4 · right · ccw | 358×597 / 788×473 / 1140×684 |
| Forty years in five numbers | from 2 to 5 · bottom · cw · strip | 358×239+358×179 / 788×525+788×394 / 1140×713 |

**Careers** (`careers.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| The jobs are here. Bring the drive. | from 3 to 5 · right · cw · strip | 358×573 / 788×493 / 1140×713 |
| Five things | from 1 to 5 · top · cw | 358×239+358×179 / 788×525+788×394 / 1140×713 |
| Straight to it | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |

**Locations** (`locations.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Find the bolt | from 3 to 5 · right · cw · strip | 358×573 / 788×493 / 1140×713 |
| Where to find one | from 1 to 4 · right · cw | 358×537 / 788×525 / 1140×684 |
| Not yet, but soon | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |

Flat modules: running text between the grids (`Prose`), the bag, the nine
questions, the sign-up form.

## The subject

The menu, the addresses, the telephone number, the values, the owners and the
answers to the nine questions are the restaurant's, from its site. The
sentences are this study's: nothing is quoted, and the site's slogans are not
used. The history before the relaunch (founded in Kalamazoo in 1984, a 39-cent
price, more than 150 locations at the peak, PepsiCo in 1990, 80 stores closed
in a quarter of 1995, one location left by 2016, Wayland opened October 13,
2025) is from [Wikipedia](https://en.wikipedia.org/wiki/Hot_%27n_Now). Each
square names its source and each footer lists them.

Photographs are third parties', from Wikimedia Commons and Flickr under
Creative Commons licences or in the public domain
([`src/photos.json`](src/photos.json); credited in every footer and under each
opened photograph). None shows the restaurant's food: the olive burger is
another Michigan kitchen's, and the rest are the same kind of dish. A caption
never describes its picture; that is the alt text. Captions sell the item, and
the author gave leave for them to be cheeky.

## How it works

- **The order.** A menu square opens in place into its builder: size, the
  three add-ons for a burger, the sauce that comes with the chicken, a flavour
  for a drink. "Add to the bag" puts a line in the bag below the board, with
  quantity controls. The site lists no prices, so none are shown or invented.
- **The map.** Michigan is drawn from its outline with four places pinned:
  Wayland (open), Alpena (coming), Sturgis (the heritage location) and
  Kalamazoo (where it began). Choosing one, on the map or from the list, fills
  the square beside it; the two new restaurants link to directions.
- Statistics are large type; body copy is fitted to its square; photographs
  open whole with a paragraph and a button.
- Light and dark by device preference; reduced motion respected; Close is the
  outlined button.
- [`captures/scan.cjs`](captures/scan.cjs), Chrome and WebKit, 390 / 820 /
  1440, light and dark, all five pages: nothing overflows, no fitted line under
  12px, axe clean with a More open. No screen-reader user has tested it.

## Notes for review

Observations for whoever reviews this study, recorded without a verdict. Whether the layout suits the page is assessed separately, after every study has been reviewed.

- **Legacy references.** The old style is read from one logo file and two photographs taken in 2014; no period print, packaging or advertising was found under a usable licence.
- **Bolt.** The wordmark's bolt is the study's drawing in the old mark's colours, not the chain's mark.
- **Food photographs.** They are not the restaurant's food. Only the olive burger is the named dish; "cheesy taters" is shown by a similar fried potato bite.
- **Addresses.** The Sturgis and Kalamazoo pins have no street address; the site gives none.
- **Dates.** Wikipedia's dates for the relaunch were not checked against the company.
- **Testing.** The order builder was run at two widths, not through every item, and was not scanned while open.

## Disclosure

Every page says what it is in three places, all read from
[`src/study.json`](src/study.json): its title and description, a sticky notice
at the top, and a disclosure at the very end listing the pages reviewed, what
is real, what is invented or changed, and where each kind of asset came from.

## Study tools

A floating panel (`?tools=1`) toggles grid outlines (`g`), band notes (`n`)
and reduced motion (`m`).

## Running and deploying

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`; pushing to `main` deploys
to GitHub Pages. The library is consumed from npm at its published version,
never linked locally.
