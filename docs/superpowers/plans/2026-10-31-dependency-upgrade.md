# Dependency Upgrade Implementation Plan

**Goal:** Update Filmoteka to current stable libraries while preserving its routes, authentication, watchlist and GitHub Pages hosting.
**Architecture:** Replace deprecated Create React App with Vite, retain the existing REACT_APP_ environment variable names, and adapt imports and player props to supported public APIs.
**Tech Stack:** React 19, Redux Toolkit 2, React Router 7, Firebase, Vite, Vitest, ESLint 10.
**Spec:** User request: “проведи оновлення бібліотек до сучасних”.

## Constraints and verification

- Keep `/filmoteka/`, GitHub Pages fallback and existing secret names.
- Resolve stable versions from npm; do not force incompatible peer dependencies.
- Remove unused axios, yup and web-vitals dependencies.
- Keep all edits in the supplied workspace; do not publish or commit automatically.

## Tasks

- [x] Update package.json and lockfile; add Vite, ESLint flat configuration and Vitest setup.
- [x] Move the HTML/JSX entry points, preserve absolute source imports and environment variables, update React Router and ReactPlayer APIs.
- [x] Add regression tests covering player source, routing/authentication, forms and Redux state.
- [x] Update CI and local setup documentation; run tests, lint, production build, dependency and security checks.

## Review focus

Verify deep links and asset paths under `/filmoteka/`, legacy CI environment names, player source URLs, Redux persisted state compatibility, and React 19 form/navigation behavior. Integration tests cover local behavior; external Firebase/TMDB credentials are required for live service verification.

## Results

`npm ci`, nine tests, ESLint and the production build pass. The dev server
serves the base path, login deep link, transformed entry/environment modules
and 404 fallback with HTTP 200. `npm outdated` reports no outdated packages;
`npm audit --omit=dev` reports zero vulnerabilities. A scoped Firebase gRPC
override resolves high-severity findings; five moderate findings remain in
ESLint's minimatch dependency chain. The build reports large-chunk warnings.
An independent read-only review found no actionable migration regressions.
Live Firebase/TMDB, YouTube playback and the remote deployment were not run.
