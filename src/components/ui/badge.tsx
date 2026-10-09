import * as React from 'react';
import { cn } from '@/lib/utils';

const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border-transparent',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
    outline: 'border-border text-foreground',
    success: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  };
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
