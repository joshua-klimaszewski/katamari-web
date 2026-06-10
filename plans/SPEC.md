# Katamari Web — Spec

## What We're Building

A Katamari Damacy-inspired browser game. A blob rolls around a 3D world, absorbing objects smaller than itself on contact. Each absorption grows the blob, letting it absorb progressively larger objects.

Learning goals: physics engines (forces, rigid bodies, collision), 3D graphics (scene graph, materials, lighting, shaders).

## Tech Stack

| Layer | Tool |
|---|---|
| Rendering | Three.js (WebGL) |
| Physics | Rapier.js (WASM rigid bodies) |
| Build | Vite |
| Hosting | GitHub Pages via GitHub Actions |

**Migration target:** Rebuild in Godot 4 after the web version is complete, using the web prototype as a gameplay/mechanic reference. See the Godot migration note below.

## Core Mechanics

1. **Rolling** — Player applies forces to a sphere; the blob rolls (not slides) in response
2. **Absorption** — On contact, if `blob.radius > object.size`, the object is absorbed: its physics body is removed, its mesh is reparented to the blob group and offset to the blob's surface
3. **Growth** — After each absorption, `blob.radius` increases proportionally; the sphere collider is resized to match
4. **World** — ~50 objects placed in concentric rings at graduated sizes; the player can only absorb the inner ring initially

## Win / Loss

- Win: reach the target radius (shown in UI)
- No loss condition in v1

## Out of Scope (v1)

- Mobile touch controls
- Sound
- Multiple levels
- Save state

## Godot Migration Plan

Godot 4 exports to Web (WebAssembly) but requires `SharedArrayBuffer`, which needs HTTP headers (`COEP: require-corp`, `COOP: same-origin`) that GitHub Pages doesn't serve. Workaround: bundle `coi-serviceworker` with the export, which patches the headers via a Service Worker. This is a well-known, one-file solution.

Pipeline for Godot 4 → GitHub Pages:
1. Use `chickensoft-games/setup-godot` GitHub Action to install Godot in CI
2. Export with `godot --headless --export-release "Web" dist/index.html`
3. Prepend `coi-serviceworker.js` to the export output
4. Deploy `dist/` via `actions/deploy-pages`

We'll build out this pipeline in a future phase after completing the Three.js prototype.
