# SV Audio Showcase Website

A responsive product showcase website for **SV Audio Pvt (Ltd)**, helping customers in Sri Lanka browse professional audio and lighting equipment, find branch details, and contact the team via WhatsApp.

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Bundler**: Vite 7
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Package Manager**: npm workspaces

## Project Structure

```
├── artifacts/
│   ├── sv-audio/        ← Main website (React + Vite)
│   └── mockup-sandbox/  ← UI component sandbox
├── lib/
│   ├── api-client-react/ ← Shared React Query API client
│   ├── api-spec/         ← OpenAPI spec & codegen config
│   ├── api-zod/          ← Zod schema library
│   └── db/               ← Drizzle ORM + PostgreSQL schema
└── scripts/              ← Utility scripts
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

The site will be available at **http://localhost:3000**

### Build for production

```bash
npm run build
```

The built files will be in `artifacts/sv-audio/dist/public/`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server at localhost:3000 |
| `npm run build` | Build the production bundle |
| `npm run typecheck` | Run TypeScript type checking |

## Branches

- **Jaffna** — Main branch
- **Nelliady** — Northern Province
- **Chavakachchery** — Northern Province

## Contact & Social

WhatsApp-first contact flow. All enquiries and orders go through WhatsApp for fastest response.
# SV-Audio
