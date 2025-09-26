import { cn } from '@/lib/utils'

interface ProgressBarProps {
  percentage: number
  color: string
  label: string
  count: number
  className?: string
}

export function ProgressBar({
  percentage,
  color,
  label,
  count,
  className,
}: ProgressBarProps) {
  return (
    <div className={cn('flex items-center justify-between py-2', className)}>
      <div className="flex min-w-0 flex-1 items-center space-x-3">
        <span className="w-12 text-right text-sm text-gray-600 dark:text-gray-300">
          {percentage.toFixed(1)}%
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {label}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${percentage}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      </div>
      <span className="ml-4 min-w-[2rem] text-right text-sm text-gray-600 dark:text-gray-300">
        {count}
      </span>
    </div>
  )
}
