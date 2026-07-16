import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function formatDate(date: string | Date, format = 'MMM D, YYYY'): string {
  return dayjs(date).format(format)
}

export function timeAgo(date: string | Date): string {
  return dayjs(date).fromNow()
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M+`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K+`
  return num.toString()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 90) return 'bg-emerald-500'
  if (percentage >= 60) return 'bg-blue-500'
  if (percentage >= 30) return 'bg-amber-500'
  return 'bg-red-500'
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    completed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'on-track': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    urgent: 'bg-red-500/10 text-red-500 border-red-500/20',
    delayed: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    inactive: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    upcoming: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  }
  return colors[status] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'
}
