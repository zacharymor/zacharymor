import { createClient } from '@/lib/supabase/server'
import SupabaseStatus from './components/SupabaseStatus'

export default async function Home() {
  const supabase = await createClient()
  
  let connectionStatus = 'connected'
  let errorMessage = ''

  try {
    const { data, error } = await supabase.from('_health_check').select('*').limit(1)
    if (error) {
      connectionStatus = 'error'
      errorMessage = error.message
    }
  } catch (error) {
    connectionStatus = 'not_configured'
    errorMessage = error instanceof Error ? error.message : 'Unknown error'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Next.js + Supabase
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A modern full-stack application starter
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-white dark:text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Next.js 16</h2>
                  <p className="text-gray-600 dark:text-gray-400">App Router + Server Components</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  TypeScript Support
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Tailwind CSS
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Server Actions
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.362 9.354H12.646l6.37-6.37a8.604 8.604 0 0 0-10.032 0l6.37 6.37H6.638l-6.37-6.37a8.604 8.604 0 0 0 0 10.032l6.37-6.37v8.716l-6.37 6.37a8.604 8.604 0 0 0 10.032 0l-6.37-6.37h8.716l6.37 6.37a8.604 8.604 0 0 0 0-10.032l-6.37 6.37z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Supabase</h2>
                  <p className="text-gray-600 dark:text-gray-400">Open Source Firebase Alternative</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  PostgreSQL Database
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Authentication
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Realtime Subscriptions
                </li>
              </ul>
            </div>
          </div>

          <SupabaseStatus 
            status={connectionStatus} 
            errorMessage={errorMessage}
          />

          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Start
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  1. Set up Supabase
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Install via Vercel Marketplace for automatic setup:
                </p>
                <code className="block bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-800 dark:text-gray-200">
                  vercel integration add supabase
                </code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  2. Configure Environment Variables
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Copy .env.local.example to .env.local and add your Supabase credentials:
                </p>
                <code className="block bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-800 dark:text-gray-200">
                  cp .env.local.example .env.local
                </code>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  3. Start Development
                </h3>
                <code className="block bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm text-gray-800 dark:text-gray-200">
                  npm run dev
                </code>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="flex justify-center gap-4">
              <a
                href="https://supabase.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Supabase Docs
              </a>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Next.js Docs
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
