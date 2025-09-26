'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { ProgressBar } from './ProgressBar'
import { SimpleChart } from './SimpleChart'
import { Button } from '../Button'
import { InboundCallReason } from '@/types'
import { cn } from '@/lib/utils'

interface CallReasonBreakdownProps {
  reason: InboundCallReason
  onClose: () => void
  className?: string
  dateRange?: {
    startDate: string
    endDate: string
  }
}

export function CallReasonBreakdown({
  reason,
  onClose,
  className,
  dateRange,
}: CallReasonBreakdownProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'transfers'>(
    'overview'
  )

  // Generate date range text
  const getDateRangeText = () => {
    return 'Call Volume'
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
        className
      )}
    >
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: reason.color }}
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {reason.label} - Detailed Breakdown
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                'border-b-2 px-1 py-4 text-sm font-medium transition-colors',
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              )}
            >
              Overview & Metrics
            </button>
            <button
              onClick={() => setActiveTab('transfers')}
              className={cn(
                'border-b-2 px-1 py-4 text-sm font-medium transition-colors',
                activeTab === 'transfers'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              )}
            >
              Transfer Reasons ({reason.transferReasons.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="min-h-[500px] space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Total Calls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {reason.count}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {reason.percentage.toFixed(1)}% of all calls
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Avg Handle Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {reason.handleTime}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      vs 4:32 average
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Containment Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(100 - reason.transferRate).toFixed(1)}%
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Calls resolved without transfer
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Call Volume by Time */}
              <Card>
                <CardHeader>
                  <CardTitle>{getDateRangeText()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleChart
                    type="line"
                    height={200}
                    data={[
                      { label: '8AM', value: Math.round(reason.count * 0.08) },
                      { label: '9AM', value: Math.round(reason.count * 0.15) },
                      { label: '10AM', value: Math.round(reason.count * 0.18) },
                      { label: '11AM', value: Math.round(reason.count * 0.22) },
                      { label: '12PM', value: Math.round(reason.count * 0.25) },
                      { label: '1PM', value: Math.round(reason.count * 0.2) },
                      { label: '2PM', value: Math.round(reason.count * 0.18) },
                      { label: '3PM', value: Math.round(reason.count * 0.15) },
                      { label: '4PM', value: Math.round(reason.count * 0.12) },
                      { label: '5PM', value: Math.round(reason.count * 0.08) },
                    ]}
                    title={`${reason.label} calls by hour`}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'transfers' && (
            <div className="min-h-[500px] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  When {reason.label} calls are transferred
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {Math.round((reason.count * reason.transferRate) / 100)} total
                  transfers
                </div>
              </div>

              {reason.transferReasons.length > 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {reason.transferReasons.map((transfer) => (
                        <ProgressBar
                          key={transfer.id}
                          percentage={transfer.percentage}
                          color={transfer.color}
                          label={transfer.label}
                          count={transfer.count}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="py-8 text-center">
                      <div className="mb-2 text-gray-400">
                        <svg
                          className="mx-auto h-12 w-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Most {reason.label} calls are resolved without transfer
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Transfer rate: {reason.transferRate.toFixed(1)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 p-6 dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
