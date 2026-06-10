# Session Log

## 2026-06-10 — Session 1

### Status
Phase 1 in progress. Project scaffolded on branch `feat/pipeline-setup`.

### What exists
- Vite project with Three.js + Rapier.js installed
- `src/main.js`: basic Three.js scene — spinning blob placeholder, scattered objects, lights, floor, fog
- `vite.config.js`: base set to `/katamari-web/` for GitHub Pages subpath
- `.github/workflows/ci.yml`: build check on PRs
- `.github/workflows/deploy.yml`: build + deploy to GitHub Pages on push to `main`
- `plans/SPEC.md`: full feature spec including Godot migration plan

### Next step
- Init git repo, create GitHub repo, push branch, open PR, merge to `main`
- Verify GitHub Pages URL is live
- Then start `feat/rolling-physics`

### Open questions
- None blocking Phase 1

### Godot migration
Decided to build Three.js prototype first, then port to Godot 4. The key GitHub Pages blocker (SharedArrayBuffer headers) is solved with `coi-serviceworker`. See SPEC.md for full pipeline plan.
