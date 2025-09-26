'use client'

import { cn } from '@/lib/utils'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { useCallDirection } from '@/contexts/CallDirectionContext'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const { callDirection, setCallDirection } = useCallDirection()

  return (
    <header
      className={cn(
        'border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Call Direction Toggle */}
        <div className="flex items-center space-x-4">
          <ToggleGroup
            options={[
              { value: 'inbound', label: 'Inbound Calls' },
              { value: 'outbound', label: 'Outbound Calls' },
            ]}
            value={callDirection}
            onValueChange={(value) => setCallDirection(value as 'inbound' | 'outbound')}
            className="border border-gray-200 dark:border-gray-600"
          />
        </div>

        {/* Right side - Essential elements only */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span>12:27 PM</span>
            <span>Eastern Time (UTC-04:00)</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              thamires@trysalient.com
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
              <span className="text-sm font-medium text-white">T</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
