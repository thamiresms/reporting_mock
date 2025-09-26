'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { useCallDirection } from '@/contexts/CallDirectionContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { HorizontalBarChart } from '@/components/ui/HorizontalBarChart'
import { Button } from '@/components/Button'
import { TransferReason } from '@/types'

// Professional color palette - monochromatic blue with good contrast (same as call breakdown)
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
  '#e2e8f0', // Additional light gray-blue
  '#cbd5e1', // Additional gray-blue
  '#94a3b8', // Additional medium gray-blue
  '#64748b', // Additional darker gray-blue
  '#475569', // Additional dark gray-blue
  '#334155', // Additional very dark gray-blue
  '#1e293b', // Additional deepest gray-blue
]

// Mock data with consistent blue color palette
const mockTransferReasons: TransferReason[] = [
  {
    id: '1',
    label: 'Live Agent Request',
    percentage: 66.2,
    count: 10919,
    color: professionalColors[0],
  },
  {
    id: '2',
    label: 'Payoff Requests',
    percentage: 6.8,
    count: 1127,
    color: professionalColors[1],
  },
  {
    id: '3',
    label: 'Financial Hardship / Extensions',
    percentage: 6.2,
    count: 1016,
    color: professionalColors[2],
  },
  {
    id: '4',
    label: 'Payment Assistance',
    percentage: 4.2,
    count: 686,
    color: professionalColors[3],
  },
  {
    id: '5',
    label: 'Billing and Charges Inquiries',
    percentage: 3.3,
    count: 540,
    color: professionalColors[4],
  },
  {
    id: '6',
    label: 'Insurance Matters',
    percentage: 2.1,
    count: 339,
    color: professionalColors[5],
  },
  {
    id: '7',
    label: 'Vehicle Title and Ownership Issues',
    percentage: 2.0,
    count: 337,
    color: professionalColors[6],
  },
  {
    id: '8',
    label: 'Language Barrier',
    percentage: 1.9,
    count: 321,
    color: professionalColors[7],
  },
  {
    id: '9',
    label: 'Due Date Change Requests',
    percentage: 1.7,
    count: 286,
    color: professionalColors[8],
  },
  {
    id: '10',
    label: 'Repossession Issues',
    percentage: 1.2,
    count: 191,
    color: professionalColors[9],
  },
  {
    id: '11',
    label: 'Account Updates',
    percentage: 1.1,
    count: 185,
    color: professionalColors[10],
  },
  {
    id: '12',
    label: 'Technical Issues',
    percentage: 1.0,
    count: 163,
    color: professionalColors[11],
  },
  {
    id: '13',
    label: 'Identity Verification Issues',
    percentage: 0.9,
    count: 150,
    color: professionalColors[12],
  },
  {
    id: '14',
    label: 'Loan Inquiries',
    percentage: 0.6,
    count: 93,
    color: professionalColors[13],
  },
  {
    id: '15',
    label: 'Warranty and Vehicle Issues',
    percentage: 0.5,
    count: 86,
    color: professionalColors[14],
  },
  {
    id: '16',
    label: 'Fraud and Disputes',
    percentage: 0.3,
    count: 48,
    color: professionalColors[15],
  },
  {
    id: '17',
    label: 'Other',
    percentage: 0.1,
    count: 13,
    color: professionalColors[16],
  },
]


export default function TransferReasonsPage() {
  const router = useRouter()
  const { callDirection } = useCallDirection()
  const [activeTab, setActiveTab] = useState('transfer-reasons')
  const [startDate, setStartDate] = useState('2025-09-10')
  const [endDate, setEndDate] = useState('2025-09-26')
  const [viewMode, setViewMode] = useState<'separately' | 'percentage'>(
    'separately'
  )

  const totalTransferReasons = mockTransferReasons.reduce(
    (sum, reason) => sum + reason.count,
    0
  )

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {callDirection === 'inbound' ? 'Inbound' : 'Outbound'} Transfer Reasons
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Analysis of {callDirection} call transfer patterns and reasons
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
                onValueChange={(v) => {
                  setActiveTab(v)
                  if (v === 'inbound') router.push('/inbound')
                  else if (v === 'success-metrics') router.push('/success-metrics')
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Transfer Reasons</CardTitle>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total transfer reasons: 16,500
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <HorizontalBarChart
              data={mockTransferReasons}
            />
          </CardContent>
        </Card>

        {/* Categories by Day Section */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Categories by Day</CardTitle>
              <ToggleGroup
                options={[
                  { value: 'separately', label: 'View Separately' },
                  { value: 'percentage', label: 'Show as Percentage' },
                ]}
                value={viewMode}
                onValueChange={(v) =>
                  setViewMode(v as 'separately' | 'percentage')
                }
              />
            </div>
          </CardHeader>
          <CardContent>
            {/* Legend */}
            <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: professionalColors[0] }}></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Live Agent Request
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: professionalColors[1] }}></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Payoff Requests
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-600 dark:text-gray-300">Totals</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: professionalColors[2] }}></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Financial Hardship / Extensions
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: professionalColors[3] }}></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Payment Assistance
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: professionalColors[4] }}></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Billing and Charges Inquiries
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: professionalColors[5] }}></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Insurance Matters
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: professionalColors[6] }}></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Vehicle Title and Ownership Issues
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: professionalColors[7] }}></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Language Barrier
                </span>
              </div>
            </div>
            {/* Simple Stacked Bar Chart */}
            <div className="mb-6 h-64">
              <div className="flex h-full items-end justify-between space-x-4">
                {/* Sep 19 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-100 rounded-sm overflow-hidden" style={{ height: '200px' }}>
                    <div className="w-full" style={{ height: '71%', backgroundColor: professionalColors[0] }}></div>
                    <div className="w-full" style={{ height: '7%', backgroundColor: professionalColors[1] }}></div>
                    <div className="w-full" style={{ height: '6%', backgroundColor: professionalColors[2] }}></div>
                    <div className="w-full" style={{ height: '5%', backgroundColor: professionalColors[3] }}></div>
                    <div className="w-full" style={{ height: '4%', backgroundColor: professionalColors[4] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[5] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[6] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[7] }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Sep 19</div>
                </div>

                {/* Sep 20 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-100 rounded-sm overflow-hidden" style={{ height: '110px' }}>
                    <div className="w-full" style={{ height: '70%', backgroundColor: professionalColors[0] }}></div>
                    <div className="w-full" style={{ height: '6%', backgroundColor: professionalColors[1] }}></div>
                    <div className="w-full" style={{ height: '8%', backgroundColor: professionalColors[2] }}></div>
                    <div className="w-full" style={{ height: '6%', backgroundColor: professionalColors[3] }}></div>
                    <div className="w-full" style={{ height: '4%', backgroundColor: professionalColors[4] }}></div>
                    <div className="w-full" style={{ height: '1%', backgroundColor: professionalColors[5] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[6] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[7] }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Sep 20</div>
                </div>

                {/* Sep 21 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-100 rounded-sm overflow-hidden" style={{ height: '85px' }}>
                    <div className="w-full" style={{ height: '62%', backgroundColor: professionalColors[0] }}></div>
                    <div className="w-full" style={{ height: '4%', backgroundColor: professionalColors[1] }}></div>
                    <div className="w-full" style={{ height: '13%', backgroundColor: professionalColors[2] }}></div>
                    <div className="w-full" style={{ height: '7%', backgroundColor: professionalColors[3] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[4] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[5] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[6] }}></div>
                    <div className="w-full" style={{ height: '7%', backgroundColor: professionalColors[7] }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Sep 21</div>
                </div>

                {/* Sep 22 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-100 rounded-sm overflow-hidden" style={{ height: '180px' }}>
                    <div className="w-full" style={{ height: '73%', backgroundColor: professionalColors[0] }}></div>
                    <div className="w-full" style={{ height: '7%', backgroundColor: professionalColors[1] }}></div>
                    <div className="w-full" style={{ height: '6%', backgroundColor: professionalColors[2] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[3] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[4] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[5] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[6] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[7] }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Sep 22</div>
                </div>

                {/* Sep 23 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-100 rounded-sm overflow-hidden" style={{ height: '145px' }}>
                    <div className="w-full" style={{ height: '73%', backgroundColor: professionalColors[0] }}></div>
                    <div className="w-full" style={{ height: '8%', backgroundColor: professionalColors[1] }}></div>
                    <div className="w-full" style={{ height: '6%', backgroundColor: professionalColors[2] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[3] }}></div>
                    <div className="w-full" style={{ height: '4%', backgroundColor: professionalColors[4] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[5] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[6] }}></div>
                    <div className="w-full" style={{ height: '1%', backgroundColor: professionalColors[7] }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Sep 23</div>
                </div>

                {/* Sep 24 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-100 rounded-sm overflow-hidden" style={{ height: '80px' }}>
                    <div className="w-full" style={{ height: '71%', backgroundColor: professionalColors[0] }}></div>
                    <div className="w-full" style={{ height: '10%', backgroundColor: professionalColors[1] }}></div>
                    <div className="w-full" style={{ height: '5%', backgroundColor: professionalColors[2] }}></div>
                    <div className="w-full" style={{ height: '4%', backgroundColor: professionalColors[3] }}></div>
                    <div className="w-full" style={{ height: '4%', backgroundColor: professionalColors[4] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[5] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[6] }}></div>
                    <div className="w-full" style={{ height: '1%', backgroundColor: professionalColors[7] }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Sep 24</div>
                </div>

                {/* Sep 25 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-100 rounded-sm overflow-hidden" style={{ height: '130px' }}>
                    <div className="w-full" style={{ height: '73%', backgroundColor: professionalColors[0] }}></div>
                    <div className="w-full" style={{ height: '8%', backgroundColor: professionalColors[1] }}></div>
                    <div className="w-full" style={{ height: '6%', backgroundColor: professionalColors[2] }}></div>
                    <div className="w-full" style={{ height: '5%', backgroundColor: professionalColors[3] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[4] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[5] }}></div>
                    <div className="w-full" style={{ height: '2%', backgroundColor: professionalColors[6] }}></div>
                    <div className="w-full" style={{ height: '1%', backgroundColor: professionalColors[7] }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Sep 25</div>
                </div>

                {/* Sep 26 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-100 rounded-sm overflow-hidden" style={{ height: '95px' }}>
                    <div className="w-full" style={{ height: '72%', backgroundColor: professionalColors[0] }}></div>
                    <div className="w-full" style={{ height: '10%', backgroundColor: professionalColors[1] }}></div>
                    <div className="w-full" style={{ height: '7%', backgroundColor: professionalColors[2] }}></div>
                    <div className="w-full" style={{ height: '4%', backgroundColor: professionalColors[3] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[4] }}></div>
                    <div className="w-full" style={{ height: '3%', backgroundColor: professionalColors[5] }}></div>
                    <div className="w-full" style={{ height: '1%', backgroundColor: professionalColors[6] }}></div>
                    <div className="w-full" style={{ height: '1%', backgroundColor: professionalColors[7] }}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Sep 26</div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 text-left font-medium text-gray-600 dark:text-gray-400">Category</th>
                    <th className="py-2 px-4 text-center font-medium text-gray-600 dark:text-gray-400">Sep 19</th>
                    <th className="py-2 px-4 text-center font-medium text-gray-600 dark:text-gray-400">Sep 20</th>
                    <th className="py-2 px-4 text-center font-medium text-gray-600 dark:text-gray-400">Sep 21</th>
                    <th className="py-2 px-4 text-center font-medium text-gray-600 dark:text-gray-400">Sep 22</th>
                    <th className="py-2 px-4 text-center font-medium text-gray-600 dark:text-gray-400">Sep 23</th>
                    <th className="py-2 px-4 text-center font-medium text-gray-600 dark:text-gray-400">Sep 24</th>
                    <th className="py-2 px-4 text-center font-medium text-gray-600 dark:text-gray-400">Sep 25</th>
                    <th className="py-2 px-4 text-center font-medium text-gray-600 dark:text-gray-400">Sep 26</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">Live Agent Request</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">2,366</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">998</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">666</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">2,078</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">1,646</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">751</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">1,501</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">893</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">Payoff Requests</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">225</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">81</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">38</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">197</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">186</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">106</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">172</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">120</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">Financial Hardship / Extensions</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">202</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">121</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">138</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">170</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">126</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">56</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">119</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">84</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">Payment Assistance</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">173</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">85</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">81</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">91</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">69</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">43</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">98</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">46</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">Billing and Charges Inquiries</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">133</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">56</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">26</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">92</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">82</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">40</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">69</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">42</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">Insurance Matters</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">64</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">16</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">24</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">73</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">61</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">20</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">46</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">35</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">Vehicle Title and Ownership Issues</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">69</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">21</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">29</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">67</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">69</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">30</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">39</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">13</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">Language Barrier</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">77</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">45</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">74</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">64</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">16</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">9</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">22</td>
                    <td className="py-2 px-4 text-center text-gray-600 dark:text-gray-400">14</td>
                  </tr>
                  <tr className="border-t border-gray-300 dark:border-gray-600 font-semibold">
                    <td className="py-2 text-gray-900 dark:text-white">Total</td>
                    <td className="py-2 px-4 text-center text-gray-900 dark:text-white">3,329</td>
                    <td className="py-2 px-4 text-center text-gray-900 dark:text-white">1,423</td>
                    <td className="py-2 px-4 text-center text-gray-900 dark:text-white">1,076</td>
                    <td className="py-2 px-4 text-center text-gray-900 dark:text-white">2,832</td>
                    <td className="py-2 px-4 text-center text-gray-900 dark:text-white">2,257</td>
                    <td className="py-2 px-4 text-center text-gray-900 dark:text-white">1,055</td>
                    <td className="py-2 px-4 text-center text-gray-900 dark:text-white">2,066</td>
                    <td className="py-2 px-4 text-center text-gray-900 dark:text-white">1,247</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
