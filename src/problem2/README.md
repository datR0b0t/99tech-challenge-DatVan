# 99Tech Challenge – Problem 2 (Vite + React + TS)

A React (TypeScript) application bootstrapped with Vite, integrated with Tailwind CSS v4 and several UI utilities to quickly build a modern interface.

## Tech stack
- **Build tool**: Vite 7
- **Framework**: React 19 + React DOM
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI/UX**: shadcn/ui, lucide-react (icons)
- **Theming**: next-themes
- **Linting**: ESLint 9, typescript-eslint

## System requirements
- Node.js LTS (>= 18)
- npm (recommended >= 9) or pnpm/yarn (optional)

## Setup & Run
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run lint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project structure
```
.
├─ index.html
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ hooks/
│  ├─ lib/
│  ├─ services/
│  ├─ types/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  └─ App.css
├─ vite.config.ts
├─ tsconfig*.json
├─ eslint.config.js
├─ components.json
├─ .env
├─ package.json
└─ package-lock.json
```

## Configuration
- Alias `@` points to `./src` (see `vite.config.ts`).
- Tailwind CSS v4 is configured via the `@tailwindcss/vite` plugin.
- An `.env` file is available to declare environment variables if needed.

## Development notes
- Import from `@/...` for cleaner references to files within `src`.
- Use Radix UI and lucide-react to build components quickly.
- Use `sonner` to display toasts/notifications.

## Troubleshooting
- If styles are not applied: ensure the Tailwind plugin is enabled and directives in `index.css` are intact.
- If you see type errors: run `npm install` again and verify the TypeScript version in `devDependencies`.
- If the `@` alias does not work in your IDE: reconfigure the path alias in TS/IDE (see `vite.config.ts`).
