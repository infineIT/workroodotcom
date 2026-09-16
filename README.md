# Workroo marketing site

Standalone Vite/React marketing site for Workroo.

## Run locally

```bash
npm install
npm run dev
```

No Base44 configuration is required for the marketing pages. Base44 is an
optional source for blog posts; without it, the blog safely shows its empty
state and the rest of the site remains fully usable.

To enable the optional Base44 blog source, provide the app configuration in
the build environment:

```bash
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url
```

## Build

```bash
npm run lint
npm run build
```
