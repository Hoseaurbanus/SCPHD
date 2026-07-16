import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'dark' | 'outline'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800',
      glass: 'glass',
      dark: 'bg-navy-900 text-white border border-navy-800',
      outline: 'border-2 border-navy-200 dark:border-navy-700',
    }

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-7',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-sm',
          variants[variant],
          paddings[padding],
          hover && 'card-lift',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
export default Card
