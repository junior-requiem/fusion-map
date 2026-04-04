# Fusion Map

This repository contains an interactive Oracle Fusion HCM enterprise architecture map built with React + Vite.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the local URL shown in your terminal (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

This app is configured with `base: "/fusion-map/"` in `vite.config.js` so assets resolve correctly when hosted at `https://junior-requiem.github.io/fusion-map/`.

Deployment is automated through `.github/workflows/deploy.yml`:

- Every push to `main` builds the app and publishes `dist/` to GitHub Pages.
- You can also trigger deployment manually from the **Actions** tab via **workflow_dispatch**.

### One-time repository setup

In your GitHub repository settings:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.

If you rename the repository, update the `base` value in `vite.config.js` to match the new repo path.
