import { type SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900',
            'focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500',
            'transition-all duration-200 appearance-none',
            'dark:bg-navy-900 dark:text-white dark:border-navy-700',
            error ? 'border-red-500 focus:ring-red-500/50' : 'border-navy-200 dark:border-navy-700',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
