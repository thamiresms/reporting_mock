'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NavigationItem } from '@/types'
import {
  ChartBarIcon,
  PhoneIcon,
  UsersIcon,
  CogIcon,
  PresentationChartLineIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'

interface SidebarProps {
  className?: string
}

interface NavigationSection {
  title: string
  items: NavigationItemWithIcon[]
}

interface NavigationItemWithIcon extends Omit<NavigationItem, 'icon' | 'children'> {
  icon?: React.ComponentType<{ className?: string }>
  children?: NavigationItemWithIcon[]
}

const navigationSections: NavigationSection[] = [
  {
    title: 'AI AGENT',
    items: [
      {
        label: 'Configuration',
        href: '/ai-agent',
        icon: CogIcon,
        children: [],
      },
      {
        label: 'Campaigns',
        href: '/campaigns',
        icon: ChartBarIcon,
        children: [
          { label: "Today's Campaigns", href: '/campaigns/today' },
          { label: 'Uptime', href: '/campaigns/uptime' },
        ],
      },
      {
        label: 'Calls',
        href: '/calls',
        icon: PhoneIcon,
        children: [
          { label: 'Call Logs', href: '/calls/logs' },
          { label: 'Search', href: '/calls/search' },
          { label: 'Delinquency Reasons', href: '/calls/delinquency' },
          { label: 'Overwatch', href: '/calls/overwatch' },
        ],
      },
      {
        label: 'Reporting',
        href: '/reporting',
        icon: PresentationChartLineIcon,
        isActive: true,
        children: [
          {
            label: 'Inbound Dashboard',
            href: '/inbound',
            isActive: true,
          },
          {
            label: 'Outbound Dashboard',
            href: '/outbound',
          },
        ],
      },
      {
        label: 'Accounts',
        href: '/accounts',
        icon: UsersIcon,
        children: [],
      },
    ],
  },
  {
    title: 'ADMIN',
    items: [
      {
        label: 'Admin',
        href: '/admin',
        icon: WrenchScrewdriverIcon,
        children: [],
      },
    ],
  },
]

interface NavItemProps {
  item: NavigationItemWithIcon
  level?: number
}

function NavItem({ item, level = 0 }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(item.isActive || false)
  const hasChildren = item.children && item.children.length > 0
  const IconComponent = item.icon

  return (
    <div>
      <Link
        href={item.href}
        className={cn(
          'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-50',
          item.isActive
            ? 'bg-gray-100 text-gray-900 border-r-2 border-gray-400'
            : 'text-gray-700 hover:text-gray-900',
          level > 0 && 'text-xs py-2'
        )}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault()
            setIsExpanded(!isExpanded)
          }
        }}
        style={{ paddingLeft: `${level > 0 ? 32 : 12}px` }}
      >
        <div className="flex items-center">
          {IconComponent && level === 0 && (
            <IconComponent className="mr-3 h-5 w-5 text-gray-500" />
          )}
          <span className={cn(
            level === 0 ? 'font-medium' : 'font-normal',
            level > 0 && 'text-gray-600'
          )}>
            {item.label}
          </span>
        </div>
        {hasChildren && (
          <svg
            className={cn(
              'h-4 w-4 transition-transform duration-200 text-gray-400',
              isExpanded ? 'rotate-90' : '',
              'group-hover:text-gray-600'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </Link>
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavItem key={child.href} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        'flex h-screen w-64 flex-col border-r border-gray-200 bg-white overflow-y-auto',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 tracking-wide">
            SALIENT
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-8">
            {/* Section Header */}
            <div className="px-6 mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {section.title}
              </h3>
            </div>
            
            {/* Section Items */}
            <div className="px-3 space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
