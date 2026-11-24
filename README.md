# Lake Peigneur — Remotion + Three.js Short

A 60-second, 9:16 animated YouTube Short about the November 20, 1980 Lake Peigneur disaster.

## Included
- Remotion composition: `LakePeigneur` (1080 × 1920, 30 fps, 1800 frames)
- Three.js / React Three Fiber scene with lake, oil rig, barges, vortex, island, salt-mine cutaway and stylized characters
- Frame-driven camera and object animation
- Original English narration script and GitHub Actions narration generation
- GitHub Actions MP4 render workflow

## Render in GitHub Actions
1. Upload `LakePeigneur-Short.zip` to the repository root (the ZIP may remain zipped).
2. Add the separate `render-lake-peigneur.yml` workflow file to `.github/workflows/render-lake-peigneur.yml` in the repository. This workflow extracts the ZIP automatically.
3. Commit and push, then open **Actions → Render Lake Peigneur Short → Run workflow** if it did not start automatically.
4. When the job finishes, open its **Artifacts** section and download `LakePeigneur-Short`.

The workflow creates `public/narration.mp3` with Edge TTS, renders `out/LakePeigneur.mp4`, and uploads the MP4 as a downloadable workflow artifact. No API key is required for the default voice generation step.

## Local setup
```bash
npm install
python -m pip install edge-tts
python scripts/generate-narration.py
npm run render
```

## Story notes and sources
- University of Louisiana at Lafayette Special Collections: https://library.louisiana.edu/node/2548/
- Contemporary Washington Post report (Nov. 21, 1980): https://www.washingtonpost.com/archive/politics/1980/11/22/an-end-of-the-world-scene-earth-swallows-lake-oil-rig/2ad5eddb-fbe0-46d3-b8b3-db18bd3266ac/
- UPI archive (Nov. 21, 1980): https://www.upi.com/Archives/1980/11/21/Drilling-rig-breaks-into-salt-mine-cavity-draining-lake/6665343630800/

The event is described as a drilling operation breaching the Diamond Crystal salt mine beneath Lake Peigneur, causing the lake to drain into the mine. Contemporary reports state that all seven rig workers and 50 miners escaped. Some later accounts vary on exact counts of barges and acreage, so the narration uses the commonly reported figures as an approximate scale.
