# BlogVerse — Premium Next.js Blog Platform

BlogVerse is a full-featured, server-side rendered (SSR) blog application built using the latest stable **Next.js (App Router)**, **React 19**, **TanStack React Query**, and **Tailwind CSS v4**. 

It replicates the premium **Beyond UI** design tokens: fine-tuned typographic hierarchy, responsive grid alignment, context-based dark/light theme switching, and smooth Framer Motion micro-animations.

---

## 🚀 Key Features

*   **Server-Side Rendering (SSR):** Fast page loads and SEO optimization achieved via Next.js Server Components.
*   **React Query Caching & Hydration:** Prefetches queries on the server side, dehydrates cache state, and hydrates on the client for instant sibling routing and cached data access.
*   **Dynamic API Routes (Mock API):** Supports full REST API methods (`GET` for lists/details/categories, `POST` for dynamic creation) located at `/api/posts/*`.
*   **Article Creation (`/write`):** A custom editing form that uses TanStack React Query mutations (`useMutation`) to post new articles at runtime, dynamically calculating word-count reading times and invalidating cache states.
*   **Light & Dark Theme Switcher:** Context-based custom provider which checks local storage overrides and detects OS preferences (`prefers-color-scheme`) on startup to prevent hydration flashes.
*   **Framer Motion Micro-Animations:** Fluid lists mounting, card lifts, cover image zooms, and fade-in transitions.
*   **Tailwind Typography Integration:** Safe markdown parsing that converts headers, blockquotes, lists, and code blocks into semantic HTML styled by `@tailwindcss/typography`.
*   **Accessibility & SEO:** Semantic HTML5 layouts, descriptive ARIA attributes, keyboard-focusable forms, and dynamic metadata generation for custom title/description/OpenGraph tags.

---

## 🛠️ Tech Stack & Libraries

*   **Core Framework:** Next.js (App Router, TS support)
*   **Library Core:** React 19 & React DOM
*   **Data Fetching:** TanStack React Query (`@tanstack/react-query`)
*   **Styling Engine:** Tailwind CSS v4 (native `@theme` variables)
*   **Markdown Formatting:** `@tailwindcss/typography`
*   **Animations:** Framer Motion (`framer-motion`)
*   **Icons Pack:** Lucide Icons (`lucide-react`)
*   **Type Safety:** TypeScript

---

## 📂 Project Structure

```txt
src/
├── app/
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts                 # List/Categories GET & POST API route
│   │       └── [slug]/
│   │           └── route.ts             # Details mock API GET route
│   ├── about/
│   │   └── page.tsx                     # Creator profile (Joseph Francis)
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx                 # SSR Dynamic post routing page
│   ├── write/
│   │   └── page.tsx                     # Write post form with TanStack Query mutations
│   ├── globals.css                      # Tailwind v4 theme configurations
│   ├── layout.tsx                       # Root wrapper (Fonts, Headers, Footers)
│   ├── page.tsx                         # SSR Homepage controller (prefetching)
│   └── providers.tsx                    # Theme & React Query client contexts
├── components/
│   ├── BlogContainer.tsx                # Client-side interactive home feed (search & tags)
│   ├── Header.tsx                       # Sticky responsive navigation & theme toggle
│   ├── Footer.tsx                       # Categories, socials, and legal links
│   ├── Newsletter.tsx                   # Email registration box with validations
│   └── PostContent.tsx                  # Reader view with markdown parsing & related grids
└── lib/
    ├── mockData.ts                      # Static mock database (8 posts)
    └── posts.ts                         # Data filter and fetch utilities
```

---

## 💻 Getting Started

Follow these steps to run the application locally in development mode:

### 1. Install Dependencies
Initialize and install required NPM packages:
```bash
npm install
```

### 2. Launch Development Server
Start the development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Production Build
Verify the production build compiles without warnings:
```bash
npm run build
```

---

## 👤 Creator

*   **Joseph Francis** - *Creator & Principal Developer* - [GitHub](https://github.com/Joseph-Francis42)
*   Built with Next.js, React Query, and Tailwind CSS.
