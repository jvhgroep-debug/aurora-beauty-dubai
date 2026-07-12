# Aurora Beauty Lounge — Official Images

These images are sourced from [aurorasalon.info](https://www.aurorasalon.info/) and stored locally for fast loading.

## Folder structure

```
public/images/
├── hero/
│   └── hero-bg.webp          ← Hero banner (homepage)
├── sections/
│   ├── glow.jpg              ← CTA banner background
│   └── face-cream.jpg        ← Alternate hero rotation
└── services/
    ├── vip-facial.jpg
    ├── lash-lift.jpeg
    ├── volume-lash.webp
    ├── mega-volume.jpeg
    ├── vip-special.jpg
    ├── lm-curl.webp
    ├── kk-style.jpeg
    └── brow-lamination.jpeg
```

## Re-download from live site

If images are updated on aurorasalon.info, run:

```bash
npm run download-images
npm run generate
```

This fetches the latest files from the official website and updates `src/data/services.json` and `src/data/locaties.json`.
