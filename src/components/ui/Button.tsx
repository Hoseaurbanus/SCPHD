import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-gold-500 text-navy-900 hover:bg-gold-400 btn-primary shadow-lg shadow-gold-500/20',
      secondary: 'bg-navy-900 text-white hover:bg-navy-800 shadow-lg shadow-navy-900/20',
      outline: 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900',
      ghost: 'text-navy-900 hover:bg-navy-50 dark:text-white dark:hover:bg-navy-800',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
