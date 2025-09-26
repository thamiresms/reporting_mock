export interface NavigationItem {
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
  isActive?: boolean
}

export interface TransferReason {
  id: string
  label: string
  percentage: number
  count: number
  color: string
}

export interface InboundCallReason {
  id: string
  label: string
  percentage: number
  count: number
  color: string
  handleTime: string
  transferRate: number
  transferReasons: TransferReason[]
}

export interface MetricData {
  label: string
  value: number
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
  change?: number
}

export interface DashboardData {
  totalTransferReasons: number
  dateRange: {
    start: string
    end: string
  }
  transferReasons: TransferReason[]
}

export interface InboundDashboardData {
  totalInboundCalls: number
  dateRange: {
    start: string
    end: string
  }
  callReasons: InboundCallReason[]
}
