'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'
import { useCallDirection } from '@/contexts/CallDirectionContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { SimpleChart } from '@/components/ui/SimpleChart'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { Tabs } from '@/components/ui/Tabs'

// Mock data for inbound KPIs
const inboundKPIs = {
  rpcRate: { value: 84.74, data: [{ label: '09/19', value: 85.96 }, { label: '09/20', value: 84.99 }, { label: '09/21', value: 84.39 }, { label: '09/22', value: 86.81 }, { label: '09/23', value: 84.96 }, { label: '09/24', value: 84.64 }, { label: '09/25', value: 84.80 }, { label: '09/26', value: 79.89 }] },
  ptpRate: { value: 52.28, data: [{ label: '09/19', value: 47.77 }, { label: '09/20', value: 54.04 }, { label: '09/21', value: 54.52 }, { label: '09/22', value: 51.47 }, { label: '09/23', value: 51.61 }, { label: '09/24', value: 48.40 }, { label: '09/25', value: 50.85 }, { label: '09/26', value: 50.19 }] },
  cashRate: { value: 48.89, data: [{ label: '09/19', value: 52.26 }, { label: '09/20', value: 49.39 }, { label: '09/21', value: 45.22 }, { label: '09/22', value: 49.95 }, { label: '09/23', value: 51.51 }, { label: '09/24', value: 46.79 }, { label: '09/25', value: 53.11 }] },
  cashAmount: { value: 2932287.33, data: [{ label: '09/19', value: 370347.85 }, { label: '09/20', value: 659831.10 }, { label: '09/21', value: 672088.39 }, { label: '09/22', value: 540835.99 }, { label: '09/23', value: 379749.74 }, { label: '09/24', value: 256569.80 }, { label: '09/25', value: 250003.52 }] },
  hungUpRate: { value: 15.26, data: [{ label: '09/19', value: 14.04 }, { label: '09/20', value: 15.01 }, { label: '09/21', value: 15.61 }, { label: '09/22', value: 13.19 }, { label: '09/23', value: 15.04 }, { label: '09/24', value: 15.36 }, { label: '09/25', value: 15.20 }, { label: '09/26', value: 20.11 }] }
}

// Mock data for outbound collections KPIs
const collectionsKPIs = {
  connected: { value: 1586, data: [{ label: '09/19', value: 1554 }, { label: '09/20', value: 1329 }, { label: '09/21', value: 1551 }, { label: '09/22', value: 1616 }, { label: '09/23', value: 1555 }, { label: '09/24', value: 1227 }, { label: '09/25', value: 1160 }, { label: '09/26', value: 917 }] },
  rpcRate: { value: 89.58, data: [{ label: '09/19', value: 90.40 }, { label: '09/20', value: 89.82 }, { label: '09/21', value: 87.25 }, { label: '09/22', value: 88.79 }, { label: '09/23', value: 89.14 }, { label: '09/24', value: 89.89 }, { label: '09/25', value: 91.48 }, { label: '09/26', value: 91.39 }] },
  ptpRate: { value: 22.28, data: [{ label: '09/19', value: 47.77 }, { label: '09/20', value: 54.04 }, { label: '09/21', value: 54.52 }, { label: '09/22', value: 51.47 }, { label: '09/23', value: 51.61 }, { label: '09/24', value: 48.40 }, { label: '09/25', value: 50.85 }, { label: '09/26', value: 50.19 }] },
  cashRate: { value: 48.89, data: [{ label: '09/19', value: 52.26 }, { label: '09/20', value: 49.39 }, { label: '09/21', value: 45.22 }, { label: '09/22', value: 49.95 }, { label: '09/23', value: 51.51 }, { label: '09/24', value: 46.79 }, { label: '09/25', value: 53.11 }] },
  cashAmount: { value: 2932287.33, data: [{ label: '09/19', value: 370347.85 }, { label: '09/20', value: 659831.10 }, { label: '09/21', value: 672088.39 }, { label: '09/22', value: 540835.99 }, { label: '09/23', value: 379749.74 }, { label: '09/24', value: 256569.80 }, { label: '09/25', value: 250003.52 }] },
  transferRate: { value: 0.00, data: [{ label: '09/19', value: 0.00 }, { label: '09/20', value: 0.00 }, { label: '09/21', value: 0.00 }, { label: '09/22', value: 0.00 }, { label: '09/23', value: 0.00 }, { label: '09/24', value: 0.00 }, { label: '09/25', value: 0.00 }, { label: '09/26', value: 0.00 }] }
}

// Mock data for outbound welcome KPIs
const welcomeKPIs = {
  rpcRate: { value: 89.58, data: [{ label: '09/19', value: 90.40 }, { label: '09/20', value: 89.82 }, { label: '09/21', value: 87.25 }, { label: '09/22', value: 88.79 }, { label: '09/23', value: 89.14 }, { label: '09/24', value: 89.89 }, { label: '09/25', value: 91.48 }, { label: '09/26', value: 91.39 }] },
  welcomeRate: { value: 84.50, data: [{ label: '09/19', value: 85.20 }, { label: '09/20', value: 85.24 }, { label: '09/21', value: 85.71 }, { label: '09/22', value: 82.86 }, { label: '09/23', value: 85.12 }, { label: '09/24', value: 82.23 }, { label: '09/25', value: 84.91 }, { label: '09/26', value: 84.06 }] },
  paymentsRate: { value: 8.09, data: [{ label: '09/19', value: 9.15 }, { label: '09/20', value: 8.52 }, { label: '09/21', value: 8.26 }, { label: '09/22', value: 6.45 }, { label: '09/23', value: 7.90 }, { label: '09/24', value: 7.41 }, { label: '09/25', value: 8.27 }, { label: '09/26', value: 8.72 }] },
  fraudRate: { value: 5.86, data: [{ label: '09/19', value: 6.90 }, { label: '09/20', value: 6.67 }, { label: '09/21', value: 6.02 }, { label: '09/22', value: 5.10 }, { label: '09/23', value: 6.05 }, { label: '09/24', value: 4.89 }, { label: '09/25', value: 5.01 }, { label: '09/26', value: 7.72 }] }
}

// Mock data for outbound verification KPIs
const verificationKPIs = {
  connected: { value: 9.97, data: [{ label: '09/19', value: 15.57 }, { label: '09/20', value: 10.44 }, { label: '09/21', value: 3.39 }, { label: '09/22', value: 11.10 }, { label: '09/23', value: 9.40 }, { label: '09/24', value: 11.71 }, { label: '09/25', value: 11.83 }, { label: '09/26', value: 9.77 }] },
  eligibleRate: { value: 67.97, data: [{ label: '09/19', value: 76.19 }, { label: '09/20', value: 74.35 }, { label: '09/21', value: 58.39 }, { label: '09/22', value: 67.47 }, { label: '09/23', value: 64.81 }, { label: '09/24', value: 66.60 }, { label: '09/25', value: 67.33 }, { label: '09/26', value: 68.90 }] },
  completedRate: { value: 88.23, data: [{ label: '09/19', value: 96.43 }, { label: '09/20', value: 96.79 }, { label: '09/21', value: 96.30 }, { label: '09/22', value: 95.67 }, { label: '09/23', value: 95.98 }, { label: '09/24', value: 95.75 }, { label: '09/25', value: 95.59 }, { label: '09/26', value: 93.83 }] },
  notCompletedRate: { value: 11.77, data: [{ label: '09/19', value: 3.57 }, { label: '09/20', value: 3.21 }, { label: '09/21', value: 3.70 }, { label: '09/22', value: 4.33 }, { label: '09/23', value: 4.02 }, { label: '09/24', value: 4.25 }, { label: '09/25', value: 4.41 }, { label: '09/26', value: 6.17 }] }
}

export default function SuccessMetricsPage() {
  const router = useRouter()
  const { callDirection } = useCallDirection()
  const [activeTab, setActiveTab] = useState('success-metrics')
  const [startDate, setStartDate] = useState('2025-09-10')
  const [endDate, setEndDate] = useState('2025-09-26')
  const [outboundCategory, setOutboundCategory] = useState('collections')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (tabId === 'inbound') {
      router.push('/inbound')
    } else if (tabId === 'transfer-reasons') {
      router.push('/transfer-reasons')
    }
  }

  // Helper function to create KPI card
  const createKPICard = (title: string, value: any, data: any[], suffix: string = '%', prefix: string = '') => (
    <Card className="shadow-sm" key={title}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
              {title}
            </CardTitle>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {typeof value === 'number' && prefix === '$' 
                  ? `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
                  : typeof value === 'number' && suffix === '%' 
                  ? `${value.toFixed(2)}%` 
                  : typeof value === 'number' && suffix === '' 
                  ? value.toLocaleString('en-US') 
                  : value}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {suffix === '%' ? 'Avg Rate' : prefix === '$' ? 'Total' : 'Count'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            <span className="text-xs text-gray-500">Show Count</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <SimpleChart
          type="area"
          height={160}
          data={data}
        />
      </CardContent>
    </Card>
  )

  // Get current KPI data based on call direction and category
  const getCurrentKPIData = () => {
    if (callDirection === 'inbound') {
      return {
        title: 'Inbound Success Metrics',
        kpis: [
          { title: 'RPC Rate', ...inboundKPIs.rpcRate },
          { title: 'PTP Rate', ...inboundKPIs.ptpRate },
          { title: 'Cash Rate', ...inboundKPIs.cashRate },
          { title: 'Cash Amount', ...inboundKPIs.cashAmount, prefix: '$', suffix: '' },
          { title: 'Hung Up Rate', ...inboundKPIs.hungUpRate },
        ]
      }
    } else {
      // Outbound logic based on category
      switch (outboundCategory) {
        case 'collections':
          return {
            title: 'Outbound Collections Metrics',
            kpis: [
              { title: '# Connected', ...collectionsKPIs.connected, suffix: '', prefix: '' },
              { title: 'RPC Rate', ...collectionsKPIs.rpcRate },
              { title: 'PTP Rate', ...collectionsKPIs.ptpRate },
              { title: 'Cash Rate', ...collectionsKPIs.cashRate },
              { title: 'Cash Amount', ...collectionsKPIs.cashAmount, prefix: '$', suffix: '' },
              { title: 'Transfer Rate', ...collectionsKPIs.transferRate },
            ]
          }
        case 'welcome':
          return {
            title: 'Outbound Welcome Metrics',
            kpis: [
              { title: 'RPC Rate', ...welcomeKPIs.rpcRate },
              { title: 'Welcome Rate', ...welcomeKPIs.welcomeRate },
              { title: 'Payments Rate', ...welcomeKPIs.paymentsRate },
              { title: 'Fraud Rate', ...welcomeKPIs.fraudRate },
            ]
          }
        case 'verification':
          return {
            title: 'Outbound Verification Metrics',
            kpis: [
              { title: 'Connected', ...verificationKPIs.connected },
              { title: 'Eligible Rate', ...verificationKPIs.eligibleRate },
              { title: 'Completed Rate', ...verificationKPIs.completedRate },
              { title: 'Not Completed Rate', ...verificationKPIs.notCompletedRate },
            ]
          }
        default:
          return { title: 'Outbound Metrics', kpis: [] }
      }
    }
  }

  const currentData = getCurrentKPIData()

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentData.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Key performance indicators and success measurements for {callDirection} calls
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

        {/* Outbound Category Selector */}
        {callDirection === 'outbound' && (
          <div className="mb-6">
            <Tabs
              tabs={[
                { id: 'collections', label: 'Collections' },
                { id: 'welcome', label: 'Welcome' },
                { id: 'verification', label: 'Verification' },
              ]}
              activeTab={outboundCategory}
              onTabChange={setOutboundCategory}
            />
          </div>
        )}

        {/* KPI Grid */}
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {currentData.kpis.map((kpi, index) => 
            createKPICard(
              kpi.title,
              kpi.value,
              kpi.data,
              kpi.suffix || '%',
              kpi.prefix || ''
            )
          )}
        </div>

      </div>
    </MainLayout>
  )
}
