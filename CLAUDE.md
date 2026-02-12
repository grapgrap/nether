# CLAUDE.md

## Project Overview

Nether is a **Yarn Berry monorepo** containing a blog application and shared configuration packages. The blog is built with React 19, React Router v7 (SSR), and Vanilla Extract for type-safe styling. Content is authored as Markdown files with YAML front matter.

## Repository Structure

```
nether/
├── packages/
│   ├── blog/                        # Main blog application (@nether/blog)
│   │   ├── app/
│   │   │   ├── pages/               # Route page components (.tsx)
│   │   │   ├── posts/               # Post domain logic (types, parsers, loaders)
│   │   │   ├── styles/              # Vanilla Extract styles (.css.ts)
│   │   │   ├── root.tsx             # Root layout
│   │   │   └── routes.ts            # Route definitions
│   │   └── contents/posts/          # Markdown blog post files
│   ├── eslint-config-nether/        # Shared ESLint config (base + react)
│   ├── prettier-config/             # Shared Prettier config (@nether/prettier-config)
│   └── tsconfig/                    # Shared TypeScript config (@nether/tsconfig)
├── .husky/                          # Git hooks (pre-commit)
└── .yarn/                           # Yarn PnP cache and SDKs
```

## Commands

All commands are run from the repository root unless noted.

```bash
# Install dependencies
yarn install

# Blog development (run from packages/blog/)
yarn --cwd packages/blog dev       # Start dev server
yarn --cwd packages/blog build     # Production build
yarn --cwd packages/blog start     # Serve production build
yarn --cwd packages/blog lint      # Run ESLint
```

## Package Manager

- **Yarn 4.11.0** with Plug'n'Play (PnP) — no `node_modules` directory
- ESM loader enabled (`pnpEnableEsmLoader: true`)
- Workspace packages are referenced with `workspace:^`
- `.pnp.cjs` and `.pnp.loader.mjs` handle module resolution

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Router v7 with SSR enabled |
| UI | React 19 |
| Styling | Vanilla Extract (zero-runtime, type-safe CSS) |
| Content | Markdown with gray-matter front matter, unified/remark/rehype pipeline |
| Validation | Zod for runtime schema validation |
| Utilities | @fxts/core for functional composition (pipe, map, filter, sort) |
| Build | Vite 7 |
| Language | TypeScript 5.9 (strict mode) |

## Code Conventions

### TypeScript

- **Strict mode** is enforced across all packages (noUnusedLocals, noUnusedParameters, noUncheckedIndexedAccess, verbatimModuleSyntax)
- All packages use ESM (`"type": "module"`)
- Use `import type` for type-only imports
- Zod schemas validate data at system boundaries (e.g., parsing post metadata)

### File Naming

- Route pages: `pages/*.tsx`
- Server-only modules: `*.server.ts` (React Router convention — these never ship to the client)
- Type definitions: `types/*.ts`
- Vanilla Extract styles: `*.css.ts`
- Color/design tokens: `token/*.ts`

### CSS Architecture

- Vanilla Extract with CSS layers in this order: `normalize` → `theme` → `layout`
- Theme tokens defined via `createTheme` in `theme.css.ts`
- Color tokens in `styles/token/colors.ts`
- Global styles in `global.css.ts`

### Functional Patterns

- `@fxts/core` is used for data processing pipelines (see `post-list.server.ts`)
- Prefer `pipe()` with `map`, `filter`, `sort`, `toArray` for collection transformations

### React Router

- Routes defined in `app/routes.ts` using `index()` and `route()` helpers
- Loader functions provide data to pages (type-safe via `type Route` from `.react-router/types`)
- SSR is enabled in `react-router.config.ts`

## Linting & Formatting

### ESLint (v9 flat config)

- Base config: `@eslint/js` recommended + `typescript-eslint` recommended + Prettier
- React config adds: `@eslint-react` + `react-hooks` + `react-refresh`
- Blog ignores: `dist/`, `build/`, `.react-router/`

### Prettier

```
trailingComma: "es5"
semi: true
tabWidth: 2
endOfLine: "lf"
printWidth: 100
```

### Pre-commit Hooks

Husky runs `lint-staged` on commit:
- ESLint `--fix` on `*.{js,ts,tsx}` files
- Prettier `--write` on all staged files

## Design Documentation

The `.loom/` directory inside `packages/blog/` contains domain-driven design documentation:
- `concepts/` — domain concept definitions (e.g., Post)
- `decisions/` — architectural decision records with context and rationale

## Testing

No testing framework is currently configured.

## Content Authoring

Blog posts live in `packages/blog/contents/posts/` as Markdown files with YAML front matter:

```yaml
---
slug: my-post-slug
title: "Post Title"
tags: ["tag1", "tag2"]
isDraft: false
publishedDate: "2026-01-22T00:00:00.000Z"
---
```

- Posts with `isDraft: true` are filtered out in production
- Posts are sorted by `publishedDate` descending
- Markdown is rendered through a remark/rehype pipeline with HTML sanitization
