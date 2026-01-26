# Three Webapp Framework (Vite + Three.js)

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Notes
- `src/core/` is the engine layer (renderer, time loop, sizing)
- `src/world/` is your experience layer (scene content, controls, logic)
- Add shaders in `src/shaders/` and import via `?raw`
