import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md'
  dot?: boolean
  children: ReactNode
  className?: string
}

export default function Badge({ variant = 'default', size = 'sm', dot, children, className }: BadgeProps) {
  const variants = {
    default: 'bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    outline: 'bg-transparent border border-current',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  }

  const dotColors = {
    default: 'bg-navy-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    outline: 'bg-current',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold rounded-sm uppercase tracking-wider',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  )
}
