'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { useCallDirection } from '@/contexts/CallDirectionContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { HorizontalBarChart } from '@/components/ui/HorizontalBarChart'
import { CallReasonBreakdown } from '@/components/ui/CallReasonBreakdown'
import { SimpleChart } from '@/components/ui/SimpleChart'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { InboundCallReason, TransferReason } from '@/types'

// Professional color palette - monochromatic blue with good contrast
const professionalColors = [
  '#1e40af', // Deep blue
  '#2563eb', // Medium blue
  '#3b82f6', // Standard blue
  '#60a5fa', // Light blue
  '#93c5fd', // Lighter blue
  '#c3dafe', // Very light blue
  '#dbeafe', // Pale blue
  '#eff6ff', // Almost white blue
  '#f8fafc', // Very pale
  '#f1f5f9', // Lightest
]

// Mock data for inbound call reasons with detailed metrics
const mockInboundCallReasons: InboundCallReason[] = [
  {
    id: '1',
    label: 'One-time Payment',
    percentage: 28.5,
    count: 142,
    color: professionalColors[0],
    handleTime: '3:45',
    transferRate: 8.5,
    transferReasons: [
      {
        id: 't1',
        label: 'Payment Processing Issues',
        percentage: 45.2,
        count: 5,
        color: '#ef4444',
      },
      {
        id: 't2',
        label: 'Account Verification',
        percentage: 32.3,
        count: 4,
        color: '#f97316',
      },
      {
        id: 't3',
        label: 'Technical Issues',
        percentage: 22.5,
        count: 3,
        color: '#eab308',
      },
    ],
  },
  {
    id: '2',
    label: 'Payment Question',
    percentage: 18.2,
    count: 91,
    color: professionalColors[1],
    handleTime: '5:12',
    transferRate: 15.4,
    transferReasons: [
      {
        id: 't4',
        label: 'Complex Payment Terms',
        percentage: 57.1,
        count: 8,
        color: '#ef4444',
      },
      {
        id: 't5',
        label: 'Account Specialist Needed',
        percentage: 42.9,
        count: 6,
        color: '#f97316',
      },
    ],
  },
  {
    id: '3',
    label: 'AutoPay Setup',
    percentage: 15.4,
    count: 77,
    color: professionalColors[2],
    handleTime: '6:30',
    transferRate: 22.1,
    transferReasons: [
      {
        id: 't6',
        label: 'Technical Difficulties',
        percentage: 64.7,
        count: 11,
        color: '#ef4444',
      },
      {
        id: 't7',
        label: 'Bank Verification Issues',
        percentage: 35.3,
        count: 6,
        color: '#f97316',
      },
    ],
  },
  {
    id: '4',
    label: 'Payoff Quote',
    percentage: 12.8,
    count: 64,
    color: professionalColors[3],
    handleTime: '4:15',
    transferRate: 12.5,
    transferReasons: [
      {
        id: 't8',
        label: 'Complex Calculation',
        percentage: 62.5,
        count: 5,
        color: '#ef4444',
      },
      {
        id: 't9',
        label: 'Loan Specialist Required',
        percentage: 37.5,
        count: 3,
        color: '#f97316',
      },
    ],
  },
  {
    id: '5',
    label: 'Contract Question',
    percentage: 8.6,
    count: 43,
    color: professionalColors[4],
    handleTime: '7:45',
    transferRate: 34.9,
    transferReasons: [
      {
        id: 't10',
        label: 'Legal Department',
        percentage: 66.7,
        count: 10,
        color: '#ef4444',
      },
      {
        id: 't11',
        label: 'Senior Representative',
        percentage: 33.3,
        count: 5,
        color: '#f97316',
      },
    ],
  },
  {
    id: '6',
    label: 'Account Update',
    percentage: 6.2,
    count: 31,
    color: professionalColors[5],
    handleTime: '4:00',
    transferRate: 9.7,
    transferReasons: [
      {
        id: 't12',
        label: 'Identity Verification',
        percentage: 66.7,
        count: 2,
        color: '#ef4444',
      },
      {
        id: 't13',
        label: 'Document Processing',
        percentage: 33.3,
        count: 1,
        color: '#f97316',
      },
    ],
  },
  {
    id: '7',
    label: 'Late fee',
    percentage: 4.4,
    count: 22,
    color: professionalColors[6],
    handleTime: '3:20',
    transferRate: 18.2,
    transferReasons: [
      {
        id: 't14',
        label: 'Fee Waiver Request',
        percentage: 75.0,
        count: 3,
        color: '#ef4444',
      },
      {
        id: 't15',
        label: 'Manager Approval',
        percentage: 25.0,
        count: 1,
        color: '#f97316',
      },
    ],
  },
  {
    id: '8',
    label: 'Policy Question',
    percentage: 2.8,
    count: 14,
    color: professionalColors[7],
    handleTime: '5:50',
    transferRate: 42.9,
    transferReasons: [
      {
        id: 't16',
        label: 'Policy Specialist',
        percentage: 83.3,
        count: 5,
        color: '#ef4444',
      },
      {
        id: 't17',
        label: 'Compliance Team',
        percentage: 16.7,
        count: 1,
        color: '#f97316',
      },
    ],
  },
  {
    id: '9',
    label: 'Hours of Operation',
    percentage: 1.8,
    count: 9,
    color: professionalColors[8],
    handleTime: '1:30',
    transferRate: 0,
    transferReasons: [],
  },
  {
    id: '10',
    label: 'Out of scope',
    percentage: 1.3,
    count: 7,
    color: professionalColors[9],
    handleTime: '2:45',
    transferRate: 100,
    transferReasons: [
      {
        id: 't18',
        label: 'Different Department',
        percentage: 71.4,
        count: 5,
        color: '#ef4444',
      },
      {
        id: 't19',
        label: 'External Vendor',
        percentage: 28.6,
        count: 2,
        color: '#f97316',
      },
    ],
  },
]

// Mock data for outbound call reasons
const mockOutboundCallReasons: InboundCallReason[] = [
  {
    id: '1',
    label: 'Payment Reminder',
    percentage: 35.2,
    count: 186,
    color: professionalColors[0],
    handleTime: '2:15',
    transferRate: 4.3,
    transferReasons: [
      {
        id: 't1',
        label: 'Account Dispute',
        percentage: 58.3,
        count: 7,
        color: '#ef4444',
      },
      {
        id: 't2',
        label: 'Payment Plan Request',
        percentage: 41.7,
        count: 5,
        color: '#f97316',
      },
    ],
  },
  {
    id: '2',
    label: 'Account Follow-up',
    percentage: 22.8,
    count: 120,
    color: professionalColors[1],
    handleTime: '3:45',
    transferRate: 8.7,
    transferReasons: [
      {
        id: 't3',
        label: 'Specialist Required',
        percentage: 63.6,
        count: 7,
        color: '#ef4444',
      },
      {
        id: 't4',
        label: 'Account Update Needed',
        percentage: 36.4,
        count: 4,
        color: '#f97316',
      },
    ],
  },
  {
    id: '3',
    label: 'Delinquency Notice',
    percentage: 18.5,
    count: 98,
    color: professionalColors[2],
    handleTime: '4:20',
    transferRate: 12.2,
    transferReasons: [
      {
        id: 't5',
        label: 'Legal Department',
        percentage: 66.7,
        count: 8,
        color: '#ef4444',
      },
      {
        id: 't6',
        label: 'Collections Team',
        percentage: 33.3,
        count: 4,
        color: '#f97316',
      },
    ],
  },
  {
    id: '4',
    label: 'Payment Plan Setup',
    percentage: 12.1,
    count: 64,
    color: professionalColors[3],
    handleTime: '6:15',
    transferRate: 15.6,
    transferReasons: [
      {
        id: 't7',
        label: 'Credit Assessment',
        percentage: 70.0,
        count: 7,
        color: '#ef4444',
      },
      {
        id: 't8',
        label: 'Manager Approval',
        percentage: 30.0,
        count: 3,
        color: '#f97316',
      },
    ],
  },
  {
    id: '5',
    label: 'Account Verification',
    percentage: 7.8,
    count: 41,
    color: professionalColors[4],
    handleTime: '3:30',
    transferRate: 19.5,
    transferReasons: [
      {
        id: 't9',
        label: 'Identity Verification',
        percentage: 75.0,
        count: 6,
        color: '#ef4444',
      },
      {
        id: 't10',
        label: 'Document Review',
        percentage: 25.0,
        count: 2,
        color: '#f97316',
      },
    ],
  },
  {
    id: '6',
    label: 'Settlement Offer',
    percentage: 3.6,
    count: 19,
    color: professionalColors[5],
    handleTime: '8:45',
    transferRate: 26.3,
    transferReasons: [
      {
        id: 't11',
        label: 'Legal Review',
        percentage: 80.0,
        count: 4,
        color: '#ef4444',
      },
      {
        id: 't12',
        label: 'Manager Authorization',
        percentage: 20.0,
        count: 1,
        color: '#f97316',
      },
    ],
  },
]

export default function InboundPage() {
  const router = useRouter()
  const { callDirection } = useCallDirection()
  const [activeTab, setActiveTab] = useState('inbound')
  const [startDate, setStartDate] = useState('2025-09-10')
  const [endDate, setEndDate] = useState('2025-09-26')
  const [viewMode, setViewMode] = useState<'separately' | 'percentage'>(
    'separately'
  )
  const [selectedReason, setSelectedReason] =
    useState<InboundCallReason | null>(null)

  // Get the current data based on call direction
  const currentCallReasons = callDirection === 'inbound' ? mockInboundCallReasons : mockOutboundCallReasons
  
  const totalCalls = currentCallReasons.reduce(
    (sum, reason) => sum + reason.count,
    0
  )

  // Dynamic labels and metrics based on call direction
  const pageTitle = 'Call Breakdown' // Keep consistent with toggle name
  const chartTitle = callDirection === 'inbound' ? 'Inbound Call Reasons' : 'Outbound Call Reasons'
  const containmentRate = callDirection === 'inbound' ? '81.3%' : '87.6%'
  const avgHandleTime = callDirection === 'inbound' ? '4:32' : '3:18'

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (tabId === 'transfer-reasons') {
      router.push('/transfer-reasons')
    } else if (tabId === 'success-metrics') {
      router.push('/success-metrics')
    }
  }

  const handleBarClick = (reason: InboundCallReason | TransferReason) => {
    // Only show breakdown for InboundCallReason type (not TransferReason)
    if ('handleTime' in reason && 'transferRate' in reason) {
      setSelectedReason(reason as InboundCallReason)
    }
  }

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {pageTitle}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {callDirection === 'inbound' 
                  ? 'Reasons for calling, containment and weekly volume'
                  : 'Outbound campaign results, success rates and call volume'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onDateChange={(start, end) => {
                  setStartDate(start)
                  setEndDate(end)
                }}
              />
              <ToggleGroup
                options={[
                  { value: 'inbound', label: 'Call Breakdown' },
                  { value: 'success-metrics', label: 'Success metrics' },
                  { value: 'transfer-reasons', label: 'Transfer reasons' },
                ]}
                value={activeTab}
                onValueChange={handleTabChange}
              />
            </div>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Calls
                  </div>
                  <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {totalCalls.toLocaleString()}
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                      +12%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      vs previous period
                    </span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                  <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Average Handle Time
                  </div>
                  <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {avgHandleTime}
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                      -8%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      vs previous period
                    </span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                  <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Containment Rate
                  </div>
                  <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {containmentRate}
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-100">
                      +2.3%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      vs previous period
                    </span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
                  <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Horizontal Bar Chart */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  {chartTitle}
                </CardTitle>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Click on any category to view detailed breakdown
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Total: {totalCalls} calls
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  for selected period
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <HorizontalBarChart
              data={currentCallReasons}
              onBarClick={handleBarClick}
            />
          </CardContent>
        </Card>

        {/* Call Volume Trend */}
        <Card className="mt-8 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Call Volume by Day
                </CardTitle>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Daily call volume trends for the selected period
                </p>
              </div>
              <ToggleGroup
                options={[
                  { value: 'separately', label: 'View Separately' },
                  { value: 'percentage', label: 'Show as Percentage' },
                ]}
                value={viewMode}
                onValueChange={(value) =>
                  setViewMode(value as 'separately' | 'percentage')
                }
              />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <SimpleChart
              type="area"
              height={240}
              data={[
                { label: 'Mon', value: 45 },
                { label: 'Tue', value: 52 },
                { label: 'Wed', value: 38 },
                { label: 'Thu', value: 61 },
                { label: 'Fri', value: 55 },
                { label: 'Sat', value: 29 },
                { label: 'Sun', value: 22 },
              ]}
            />
          </CardContent>
        </Card>

        {/* Breakdown Modal */}
        {selectedReason && (
          <CallReasonBreakdown
            reason={selectedReason}
            onClose={() => setSelectedReason(null)}
            dateRange={{ startDate, endDate }}
          />
        )}
      </div>
    </MainLayout>
  )
}
