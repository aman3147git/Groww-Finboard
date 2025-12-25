# FINBOARD

FinBoard is a customizable, real‑time finance dashboard builder built with Next.js 15 and React 19. It lets you create beautiful data visualizations by connecting to any JSON API, assembling dashboards from cards, charts, and tables with drag‑and‑drop ease. It includes a secure proxy for server‑side fetching, light/dark themes, and a modular widget theme system.

## 📸 Screenshots

> Place the images in `public/screenshots/` with the following filenames to display them.

- Hero / Landing

<img width="943" height="293" alt="image" src="https://github.com/user-attachments/assets/2558e777-c7c2-434d-ab50-9b13f508092f" />


- Create Widget – Source tab

<img width="939" height="390" alt="image" src="https://github.com/user-attachments/assets/6b1fa05f-712c-4bc2-80b9-b2073d8daf8f" />





- Create Widget – Theme tab

<img width="950" height="382" alt="image" src="https://github.com/user-attachments/assets/a3ea61f7-f91e-4489-8cad-a3e24db4bcad" />


- Dashboard (Light)

<img width="672" height="430" alt="image" src="https://github.com/user-attachments/assets/c58f315c-42ee-4ade-9e08-4dfd80504031" />


- Dashboard (Dark)

<img width="607" height="311" alt="image" src="https://github.com/user-attachments/assets/9fb46c02-d2d4-4022-bdc8-c64e1c642ea7" />




## ✨ Highlights

- **Drag‑and‑drop dashboard builder** with reorder support
- **Real‑time updates** with per‑widget refresh intervals
- **Secure server proxy** to fetch external APIs safely and avoid CORS
- **Cards, Charts, Tables** with field selection and smart parsing
- **Theme system** with Classic, Minimal, and Glass wrappers
- **Zustand state** with persistence and fast updates
- **Responsive UI** with light/dark mode

## 🧱 Architecture Overview

### App Routes (Next.js App Router)
- `src/app/(app)/workspace/page.tsx`: Main workspace page rendering the dashboard UI
- `src/app/api/proxy/route.ts`: Server‑side proxy for fetching external JSON APIs with validation, rate limiting, and in‑memory caching

### Core Libraries
- **React 19**, **Next.js 15**, **TypeScript**
- **Zustand** for client state and persistence
- **Tailwind CSS** utilities (via `clsx` + `tailwind-merge` helpers)
- **Charts** supported by `recharts` and `react-chartjs-2`

### State & Data Flow
1. User configures a widget (endpoint, fields, refresh interval, theme)
2. Client calls `apiClient.fetch` → server proxy at `/api/proxy`
3. Proxy validates URL, applies basic rate limiting and in‑memory caching, fetches data
4. Response returns to client; `widgetStore` updates widget `data` and UI re-renders

### Proxy: Caching and Rate Limiting
- In‑memory cache with TTL (default 30s)
- Per‑IP rate limiting (default 60 req/min)
- URL validation and blocking of localhost/private networks
- 10s request timeout and structured error responses

If you need distributed caching for production, you can optionally integrate Upstash Redis (see Production section). By default, Redis is not used.

## 📂 Project Structure

- `src/app/(app)/workspace/page.tsx` – Entry for the dashboard workspace
- `src/app/api/proxy/route.ts` – Secure API proxy (validation, rate limit, cache)
- `src/store/widgetStore.tsx` – Zustand store for widgets and actions
- `src/lib/apiClient.tsx` – Client helper to talk to `/api/proxy`
- `src/lib/utils.ts` – `cn` utility combining class names
- `src/components/` – UI building blocks and widget components
- `src/components/Theme/` – Theme wrappers and theme selector/editor
- `src/features/builder/` – Dashboard builder UI and tabs (Configure/Fields/Theme)
- `public/` – Static assets and screenshots

## 🧩 Widgets
Each widget shares a common shape stored in Zustand:
- `type`: `card` | `table` | `chart`
- `apiUrl`, optional `apiKey`
- `selectedFields`: which keys from the API response to visualize
- `refreshInterval`: milliseconds between automatic refreshes
- `theme`: `default` | `minimal` | `glass` | `neon` | `aurora` | `sunset` | `midnight` | `ocean`
- `data`, `error`, `isLoading`, `lastUpdated`, `position`

Common actions:
- `addWidget`, `removeWidget`, `updateWidget`
- `refreshWidget` (fetch via proxy and update)
- `reorderWidgets` (drag-and-drop support)
- `testApiUrl` (validate endpoint before adding)

## 🎨 Theme System
Wrappers enforce consistent spacing, typography, and color tokens across widgets. You can pick a theme per widget and switch light/dark mode globally.

```
src/components/Theme/
├── WidgetWrapper.tsx          # Classic
├── WidgetWrapperMinimal.tsx   # Minimal
├── WidgetWrapperGlass.tsx     # Glass
├── ThemeSelector.tsx          # Switch and preview
└── WidgetThemeEditor.tsx      # Edit theme configuration
```

![Theme](public/widgetTheme.png)

## 🔐 API Proxy Details
Location: `src/app/api/proxy/route.ts`

- Validates URL format; blocks localhost/private networks
- Per‑IP rate limit: 60 req/min (configurable)
- In‑memory cache TTL: 30s (configurable)
- 10s timeout with helpful error messages
- Returns `{ data, cached }` payloads

Example client call (already used internally):
```ts
const res = await apiClient.fetch({ url: 'https://api.example.com/data', apiKey: '...' });
if (res.error) {
  // handle
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Scripts
- `dev` – Next.js dev server
- `build` – Production build
- `start` – Start production server
- `lint` – Run ESLint

## 🧭 Using the App
1. Click "Add Widget" → choose Card, Chart, or Table
2. Enter an API endpoint (public JSON), optionally an API key
3. Pick fields to visualize
4. Choose a theme (Classic, Minimal, Glass)
5. Reorder via drag‑and‑drop
6. Configure refresh interval to enable auto‑updates

![API Config](public/widgetApi.png)
![Fields](public/widgetFields.png)

## 🏭 Production Considerations
- Default in‑memory cache is per‑instance. For multiple instances or serverless, enable a distributed cache.
- Optional: **Upstash Redis** (`@upstash/redis`) for shared caching/rate‑limit state. Not used by default.

Optional env if enabling Redis later:
```bash
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
API_RATE_LIMIT=100
API_CACHE_TTL=30000
```

## 🧪 Tech Stack
- Next.js 15, React 19, TypeScript
- Zustand, Tailwind utilities (`clsx`, `tailwind-merge`)
- Recharts / react-chartjs-2

## 🤝 Contributing
Issues and PRs are welcome.

## 📜 License
MIT © Contributors

---

Made with ❤️ for finance and data enthusiasts.

