'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DateRangePickerProps {
  startDate: string
  endDate: string
  onDateChange: (startDate: string, endDate: string) => void
  className?: string
}

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-gray-700 dark:text-gray-300">
          {formatDate(startDate)} - {formatDate(endDate)}
        </span>
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* This would be a proper date picker in a real app */}
      {isOpen && (
        <div className="absolute top-full z-10 mt-1 w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Date picker implementation would go here
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
