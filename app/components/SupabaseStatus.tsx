'use client'

interface SupabaseStatusProps {
  status: string
  errorMessage: string
}

export default function SupabaseStatus({ status, errorMessage }: SupabaseStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'green',
          icon: '✓',
          title: 'Connected to Supabase',
          message: 'Your Supabase connection is working correctly!'
        }
      case 'not_configured':
        return {
          color: 'yellow',
          icon: '⚠',
          title: 'Supabase Not Configured',
          message: 'Please set up your environment variables in .env.local'
        }
      default:
        return {
          color: 'red',
          icon: '✕',
          title: 'Connection Error',
          message: errorMessage || 'Unable to connect to Supabase'
        }
    }
  }

  const config = getStatusConfig()

  const colorClasses = {
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: 'bg-green-500'
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: 'bg-yellow-500'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: 'bg-red-500'
    }
  }

  const colors = colorClasses[config.color as keyof typeof colorClasses]

  return (
    <div className={`rounded-lg border-2 ${colors.border} ${colors.bg} p-6`}>
      <div className="flex items-start">
        <div className={`${colors.icon} rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0`}>
          {config.icon}
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${colors.text}`}>
            {config.title}
          </h3>
          <p className={`${colors.text} opacity-90`}>
            {config.message}
          </p>
          {status === 'not_configured' && (
            <div className="mt-4">
              <p className={`text-sm ${colors.text} mb-2`}>
                To get started:
              </p>
              <ol className={`text-sm ${colors.text} space-y-1 list-decimal list-inside`}>
                <li>Run <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">vercel integration add supabase</code></li>
                <li>Or create a project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
                <li>Copy your project URL and anon key to .env.local</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
