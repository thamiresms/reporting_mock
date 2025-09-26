'use client'

import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine
} from 'recharts'
import { cn } from '@/lib/utils'

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface SimpleChartProps {
  data: DataPoint[]
  type: 'bar' | 'line' | 'area'
  height?: number
  className?: string
  title?: string
  showAverageLine?: boolean
}

export function SimpleChart({
  data,
  type = 'bar',
  height = 200,
  className,
  title,
  showAverageLine = true,
}: SimpleChartProps) {
  // Calculate average for reference line
  const average = showAverageLine ? data.reduce((sum, d) => sum + d.value, 0) / data.length : 0

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Calls: {payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  const chartConfig = {
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
  }

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data} {...chartConfig}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis 
              dataKey="label" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
            />
            {showAverageLine && (
              <ReferenceLine 
                y={average} 
                stroke="#94a3b8" 
                strokeDasharray="5 5" 
                strokeWidth={1.5}
                label={{ value: `Avg: ${Math.round(average)}`, position: "top", fontSize: 11, fill: '#6b7280' }}
              />
            )}
          </AreaChart>
        )
      
      case 'line':
        return (
          <LineChart data={data} {...chartConfig}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis 
              dataKey="label" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
            />
            {showAverageLine && (
              <ReferenceLine 
                y={average} 
                stroke="#94a3b8" 
                strokeDasharray="5 5" 
                strokeWidth={1.5}
                label={{ value: `Avg: ${Math.round(average)}`, position: "top", fontSize: 11, fill: '#6b7280' }}
              />
            )}
          </LineChart>
        )
      
      case 'bar':
        return (
          <BarChart data={data} {...chartConfig}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis 
              dataKey="label" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#3b82f6"
              radius={[2, 2, 0, 0]}
            />
            {showAverageLine && (
              <ReferenceLine 
                y={average} 
                stroke="#94a3b8" 
                strokeDasharray="5 5" 
                strokeWidth={1.5}
                label={{ value: `Avg: ${Math.round(average)}`, position: "top", fontSize: 11, fill: '#6b7280' }}
              />
            )}
          </BarChart>
        )
      
      default:
        return (
          <div className="flex items-center justify-center h-40 text-gray-500">
            Unsupported chart type
          </div>
        )
    }
  }

  return (
    <div className={cn('w-full', className)}>
      {title && (
        <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </h4>
      )}
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
