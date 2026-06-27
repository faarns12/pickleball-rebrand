# Pickleball Rebrand — FAARNS Official

A full-stack marketing & management website for a pickleball business. Built with **Next.js 16 App Router**, **Supabase**, and **Cloudinary**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI primitives) |
| Database | Supabase (PostgreSQL) |
| Image Uploads | Cloudinary |
| Rich Text Editor | Tiptap |
| Forms & Validation | React Hook Form + Zod |
| Animations | Framer Motion |
| Auth | Cookie-based admin session via Next.js Middleware |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Cloudinary](https://cloudinary.com) account

### Environment Variables

Create a `.env.local` file in the root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Auth (cookie-based — set any strong secret string)
ADMIN_TOKEN=your_secret_admin_token
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
pickleball-rebrand/
│
├── app/                              # Next.js App Router — pages & API routes
│   ├── layout.tsx                    # Root layout (fonts, global providers)
│   ├── globals.css                   # Global CSS & Tailwind base styles
│   ├── page.tsx                      # Home page (/)
│   │
│   ├── blog/                         # Public blog section
│   │   ├── page.tsx                  # Blog listing page (/blog)
│   │   ├── BlogList.tsx              # Client component for blog cards
│   │   └── [id]/                     # Dynamic route — single blog post
│   │       ├── page.tsx              # /blog/:id
│   │       └── index.tsx             # Blog post content renderer
│   │
│   ├── menu/                         # Public food menu page
│   │   ├── page.tsx                  # /menu
│   │   └── MenuPageClient.tsx        # Client component with filter/display logic
│   │
│   ├── admin/                        # Admin panel
│   │   ├── page.tsx                  # Login page (/admin)
│   │   ├── actions.ts                # Server Actions — blog CRUD operations
│   │   ├── food-menu-actions.ts      # Server Actions — food menu CRUD operations
│   │   │
│   │   └── (protected)/              # Route group — all routes here require auth
│   │       ├── layout.tsx            # Protected layout (wraps sidebar + content)
│   │       ├── AdminSidebar.tsx      # Sidebar navigation component
│   │       ├── dashboard/
│   │       │   └── page.tsx          # /admin/dashboard
│   │       │
│   │       ├── blogs/                # Blog management
│   │       │   ├── page.tsx          # Blog list (/admin/blogs)
│   │       │   ├── BlogActions.tsx   # Delete / publish actions UI
│   │       │   ├── BlogForm.tsx      # Shared create/edit form
│   │       │   ├── new/page.tsx      # Create blog (/admin/blogs/new)
│   │       │   └── [id]/edit/
│   │       │       └── page.tsx      # Edit blog (/admin/blogs/:id/edit)
│   │       │
│   │       └── food-menu/            # Food menu management
│   │           ├── page.tsx          # Menu item list (/admin/food-menu)
│   │           ├── FoodMenuActions.tsx
│   │           ├── FoodMenuForm.tsx  # Shared create/edit form
│   │           ├── new/page.tsx      # Create item (/admin/food-menu/new)
│   │           └── [id]/edit/
│   │               └── page.tsx      # Edit item (/admin/food-menu/:id/edit)
│   │
│   └── api/                          # API route handlers
│       └── admin/
│           ├── login/route.ts        # POST /api/admin/login
│           ├── logout/route.ts       # POST /api/admin/logout
│           └── upload/route.ts       # POST /api/admin/upload (Cloudinary)
│
├── components/                       # Reusable React components
│   ├── ConditionalLayout.tsx         # Renders Navbar & Footer only on public pages
│   │
│   ├── home/                         # Home page section components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Banner.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Store.tsx
│   │   ├── FoodMenu.tsx              # Server component — fetches menu data
│   │   ├── FoodMenuClient.tsx        # Client component — handles interactivity
│   │   ├── Blog.tsx                  # Blog preview section on home page
│   │   ├── Faq.tsx
│   │   └── Footer.tsx
│   │
│   ├── admin/                        # Admin-only components
│   │   └── TiptapEditor.tsx          # Rich text editor for blog content
│   │
│   └── ui/                           # shadcn/ui base components (auto-generated)
│       ├── button.tsx
│       └── select.tsx
│
├── lib/                              # Shared utilities & data access layer
│   ├── supabase.ts                   # Supabase client for browser (anon key)
│   ├── supabase-server.ts            # Supabase client for server components
│   ├── blogs.ts                      # Blog fetch functions (getBlogs, getBlogById…)
│   ├── food-menu.ts                  # Food menu fetch functions
│   └── utils.ts                      # cn() helper — merges Tailwind classes
│
├── types/                            # TypeScript interfaces & type definitions
│   └── blog.ts                       # Blog-related types (Blog, BlogFormData…)
│
├── public/                           # Static assets served at /
│   ├── logo.png                      # Brand logo
│   ├── navlogo.svg                   # Navbar logo variant
│   ├── video.mp4                     # Hero background video
│   ├── banner.png                    # Banner image
│   ├── about*.svg                    # About section images
│   ├── Services*.{jpg,png}           # Services section images
│   ├── store-*.png                   # Store product images
│   └── product*.png                  # Product images
│
├── middleware.ts                     # Protects /admin/* routes — redirects unauthenticated users
├── next.config.ts                    # Next.js config (image domains, etc.)
├── tsconfig.json                     # TypeScript config
├── eslint.config.mjs                 # ESLint rules
├── postcss.config.mjs                # PostCSS / Tailwind v4 setup
├── components.json                   # shadcn/ui CLI config
└── package.json
```

---

## Key Concepts for New Developers

### Authentication Flow

Admin auth is cookie-based — no external auth library.

1. Admin submits credentials → `POST /api/admin/login`
2. Server validates against `ADMIN_TOKEN` env var and sets an `admin_session` cookie
3. `middleware.ts` runs on every `/admin/*` request and checks the cookie
4. Unauthenticated requests are redirected to `/admin` (login page)

### Server vs Client Components

This project follows Next.js App Router conventions:

- **Server components** (default) — fetch data directly from Supabase using `lib/supabase-server.ts`. No `"use client"` directive.
- **Client components** — marked with `"use client"` at the top. Used for interactivity (forms, animations, state).
- **Server Actions** — `app/admin/actions.ts` and `app/admin/food-menu-actions.ts` handle all database mutations (create, update, delete) and are called directly from forms.

### Adding shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com). To add a new component:

```bash
npx shadcn@latest add <component-name>
```

Generated files land in `components/ui/`.

### Database

All data lives in Supabase. Fetch helpers are in `lib/blogs.ts` and `lib/food-menu.ts`. When adding a new data model, follow this pattern:
1. Create the table in Supabase
2. Add fetch functions in `lib/`
3. Add TypeScript types in `types/`
4. Add server actions in `app/admin/`

---

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code — only merge via PR |
| Feature branches | One branch per developer / feature (e.g. `muhammadTarek`, `ameerhamzahd`) |

Always open a Pull Request against `main`. Never push directly to `main`.
