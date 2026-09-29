# Next.js + Supabase Starter

A modern full-stack application starter built with Next.js 16 and Supabase, featuring TypeScript, Tailwind CSS, and the App Router.

## Features

- ⚡️ **Next.js 16** - Latest version with App Router and Server Components
- 🗄️ **Supabase** - Open-source Firebase alternative with PostgreSQL
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📘 **TypeScript** - Type safety throughout the application
- 🔐 **Authentication Ready** - Supabase auth utilities pre-configured
- 🚀 **Vercel Ready** - Optimized for deployment on Vercel

## Quick Start

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Supabase

#### Option A: Via Vercel Marketplace (Recommended)

The easiest way to set up Supabase is through the Vercel Marketplace, which automatically provisions your database and configures environment variables:

```bash
vercel integration add supabase
```

This will:
- Create a Supabase project
- Automatically inject environment variables into your Vercel project
- Enable unified billing through Vercel

#### Option B: Manual Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to Project Settings → API
3. Copy your project URL and anon/public key

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

If you used the Vercel Marketplace integration, pull the environment variables:

```bash
vercel env pull .env.local
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app running!

## Project Structure

```
.
├── app/
│   ├── components/         # React components
│   │   └── SupabaseStatus.tsx
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/
│   └── supabase/          # Supabase client utilities
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       └── middleware.ts  # Middleware utilities
├── middleware.ts          # Next.js middleware
└── .env.local.example     # Environment variables template
```

## Supabase Client Usage

This starter includes three Supabase client configurations:

### Server Components

For Server Components and Route Handlers:

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase.from('your_table').select('*')
  
  return <div>{/* your content */}</div>
}
```

### Client Components

For Client Components with client-side interactivity:

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'

export default function ClientComponent() {
  const supabase = createClient()
  
  // Use supabase client for queries, auth, etc.
}
```

### Middleware

The middleware automatically handles session refresh:

```typescript
// middleware.ts
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
```

## Common Tasks

### Creating a Table

1. Go to your Supabase Dashboard → Table Editor
2. Create a new table (e.g., `todos`)
3. Add columns as needed
4. Query from your app:

```typescript
const { data, error } = await supabase
  .from('todos')
  .select('*')
```

### Adding Authentication

Supabase provides built-in authentication:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})

// Sign out
await supabase.auth.signOut()
```

### Real-time Subscriptions

Subscribe to database changes in real-time:

```typescript
const channel = supabase
  .channel('todos')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'todos' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
```

## Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js app is with Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy
4. If you haven't already, add the Supabase integration in your Vercel dashboard

Or use the Vercel CLI:

```bash
vercel
```

Environment variables will be automatically synced if you're using the Vercel Marketplace integration.

## Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Supabase Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase GitHub](https://github.com/supabase/supabase)

### Vercel Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Storage](https://vercel.com/docs/storage)
- [Vercel Marketplace](https://vercel.com/marketplace)

## About

Built by [Zachary Mor](https://github.com/zacharymor)

## License

MIT
