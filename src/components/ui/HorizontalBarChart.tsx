'use client'

import { cn } from '@/lib/utils'
import { InboundCallReason, TransferReason } from '@/types'

interface HorizontalBarChartProps {
  data: (InboundCallReason | TransferReason)[]
  onBarClick?: (reason: InboundCallReason | TransferReason) => void
  className?: string
}

export function HorizontalBarChart({
  data,
  onBarClick,
  className,
}: HorizontalBarChartProps) {
  const maxCount = Math.max(...data.map((item) => item.count))

  return (
    <div className={cn('space-y-1', className)}>
      {data.map((item) => (
        <div
          key={item.id}
          className={cn(
            'group relative cursor-pointer rounded-md p-4 transition-all hover:bg-gray-50/80 dark:hover:bg-gray-800/50',
            onBarClick && 'hover:shadow-sm'
          )}
          onClick={() => onBarClick?.(item)}
        >
          {/* Header with label, count, and percentage */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.label}
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="font-semibold text-gray-900 dark:text-white">
                {item.count}
              </span>
              <span className="min-w-[3.5rem] text-right font-medium text-gray-600 dark:text-gray-400">
                {item.percentage.toFixed(1)}%
              </span>
              {/* Spacer for arrow to prevent overlap */}
              {onBarClick && <div className="w-6" />}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}dd 100%)`,
                }}
              />
            </div>
          </div>

          {/* Click indicator */}
          {onBarClick && (
            <div className="absolute top-4 right-3 opacity-0 transition-opacity group-hover:opacity-60">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
