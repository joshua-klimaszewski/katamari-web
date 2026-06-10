# katamari-web

Katamari Damacy-style browser game. Rolling blob absorbs objects and grows. Learning project for 3D graphics (Three.js) and physics (Rapier.js).

**Current phase:** Phase 1 — pipeline setup. See `plans/LOG.md` for session state.

## Stack

- Three.js (WebGL rendering)
- Rapier.js WASM (physics)
- Vite (build, dev server)
- GitHub Pages (hosting)

## Branch strategy

`main` is protected. All work on `feat/<name>` branches, merged via PR. CI runs on PR; deploy runs on merge to `main`.

## Project layout

```
src/
  main.js       entry point + scene setup (Phase 1: spinning blob preview)
  blob.js       player blob — physics + mesh (Phase 2+)
  world.js      floor, walls, collectibles (Phase 2+)
  absorb.js     collision detection + absorption logic (Phase 3+)
  camera.js     follow camera (Phase 2+)
plans/
  SPEC.md       feature contract
  LOG.md        session log — read this to resume
.github/workflows/
  ci.yml        build check on PRs
  deploy.yml    deploy to GitHub Pages on push to main
```

## Dev

```sh
npm run dev      # local dev server with HMR
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Key concepts being learned

- **Scene graph**: Three.js `Scene` → `Object3D` hierarchy, same mental model as Godot's node tree
- **Rigid bodies**: Rapier `RigidBodyDesc` (dynamic/static), forces vs velocity, sleep/wake
- **Collision**: Rapier `ColliderDesc.ball()`, contact events, filtering
- **Materials**: `MeshStandardMaterial` (PBR), roughness/metalness, emissive
- **Camera follow**: lerp toward target position each frame

## Godot migration

After the Three.js prototype is complete, the plan is to rebuild in Godot 4. GitHub Pages works with Godot 4 web exports using `coi-serviceworker` (patches SharedArrayBuffer headers via Service Worker). CI uses `chickensoft-games/setup-godot` action. See `plans/SPEC.md` for details.
