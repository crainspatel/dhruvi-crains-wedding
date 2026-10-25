# Dhruvi & Crains — Wedding website

A responsive, mobile-first, static wedding website for December 24–26, 2026.

## Preview locally

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a new public GitHub repository (for example, `crains-dhruvi-wedding`).
2. Upload the **contents** of this directory to its default branch (`index.html`, `styles.css`, `motion.js`, `experience.js`, `assets/`, and `README.md`).
3. Under repository **Settings → Pages**, choose **Deploy from a branch**, select the default branch and `/ (root)`, and save.
4. Your site will become available at `https://YOUR-USERNAME.github.io/crains-dhruvi-wedding/`.

No build tools or framework are needed. The site works at the root URL or in a GitHub Pages repository subpath because all asset links are relative.

## Before sharing publicly

- Confirm the December 24 evening times and the Grah Shanti time (currently shown as 4:00 PM).
- Check both Google Maps links resolve to the correct venue entrances.
- Check the invitation PDF included in `assets/wedding-invitation.pdf` remains the version you want to share.
- Add a custom Open Graph preview image once the repository URL is finalized, if desired.

## Features

- Fully responsive phone/tablet/desktop layout
- Accessible headings, focus indicators, reduced-motion support
- Three-day program with India Standard Time
- Separate venue directions for the baraat departure and the wedding ceremony
- Immersive scroll-pinned photo story and separate family schedules
- Optimized WebP image assets

## Our Moments gallery

The seven originals are stored unchanged in `assets/moments/` and displayed as responsive polaroid prints. You can replace them with photos of the same filename without changing HTML. The gallery uses each image's own aspect ratio, so landscape and portrait images are fully visible rather than force-cropped.

## Scroll experience

The site uses a tiny vanilla JavaScript `motion.js` enhancement (no library or build step): staggered fade-and-rise entrances for editorial sections, polaroids and event cards, plus a slim scroll progress indicator. Content remains visible if JavaScript is disabled or `IntersectionObserver` is unsupported; reduced-motion settings disable reveal animations. Test on real phone and desktop before publishing.

## Family schedules and immersive chapter

Crains’s side is populated with the confirmed schedule; Dhruvi’s additional ceremonies are intentionally marked coming soon. Edit the `panel-dhruvi` section in `index.html` when details are available. The shared Wedding Day is listed with verified supplied time and venue. The immersive story uses four original photos, sticky positioning, and scroll progress; it automatically respects reduced motion. No downloadable invitation PDF is included or linked.

## Scroll-scattered photo story
The photos in `assets/moments/` are current stand-ins, not the final wedding photos. Replace each image with a new photo using the same filename to keep the animation and layout. The single pinned photo chapter scatters seven separate polaroids into a settled gallery. The final arrangement remains visible until the visitor scrolls into the following section. Supports mouse wheel, touch scrolling and reduced-motion accessibility. All original aspect ratios are preserved using `object-fit: contain`.

## Photo sizing fix
All seven polaroid cards now use equal-height grid tracks at desktop and mobile widths. Photos use `object-fit: contain` to keep their full compositions without cropping. Replace the images in `assets/moments/` with the same filenames to swap in the final photos.

## Pending final content

- The Our Story section deliberately uses temporary prose, not an invented relationship story. Replace when the couple shares their real story.
- The seven current gallery photos are temporary and can be replaced in `assets/moments/`.
- This update reverses the public couple-name order to Dhruvi & Crains while preserving the separately labeled family itineraries.

## Invitation and story

A dedicated heartfelt invitation section appears before Our Story. The latter remains reserved for the couple's personal story to be provided later. The wedding invitation PDF is not linked or included.
