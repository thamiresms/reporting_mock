'use client'

import { cn } from '@/lib/utils'

interface ToggleOption {
  value: string
  label: string
}

interface ToggleGroupProps {
  options: ToggleOption[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function ToggleGroup({
  options,
  value,
  onValueChange,
  className,
}: ToggleGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex rounded-md bg-gray-100 p-1 dark:bg-gray-800',
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onValueChange(option.value)}
          className={cn(
            'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
            value === option.value
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
