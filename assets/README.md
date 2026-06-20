# Assets Folder

Place your image and icon files here.

## Recommended files to add:

| File                   | Usage                                       |
|------------------------|---------------------------------------------|
| `favicon.ico`          | Browser tab icon (32×32 px)                 |
| `hero-car.jpg`         | Hero section car wash photo (≥ 1200px wide) |
| `service-banner.jpg`   | Service page hero banner (≥ 1000px wide)    |
| `og-image.jpg`         | Social share preview image (1200×630 px)    |

## Tips
- Compress images with [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) before adding.
- Use WebP format for best performance (add `.jpg` fallbacks for older browsers).
- To replace the inline SVG illustration in `index.html`, swap the `<svg>` block inside
  `.hero__illustration` with:
  ```html
  <img src="assets/hero-car.jpg" alt="Car wash service" style="width:100%;border-radius:var(--r-xl);" />
  ```
