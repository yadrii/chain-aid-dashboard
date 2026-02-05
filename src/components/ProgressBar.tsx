import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  target: number;
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ 
  current, 
  target, 
  className, 
  showLabels = true,
  size = 'md' 
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = percentage >= 100;

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabels && (
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-foreground">
            ${current.toLocaleString()}
          </span>
          <span className="text-muted-foreground">
            ${target.toLocaleString()}
          </span>
        </div>
      )}
      <div className={cn('w-full bg-secondary rounded-full overflow-hidden', heightClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            isComplete ? 'bg-gradient-success' : 'bg-gradient-accent'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between text-xs mt-1">
          <span className={cn(
            'font-medium',
            isComplete ? 'text-success' : 'text-accent'
          )}>
            {percentage.toFixed(0)}% funded
          </span>
          {!isComplete && (
            <span className="text-muted-foreground">
              ${(target - current).toLocaleString()} to go
            </span>
          )}
        </div>
      )}
    </div>
  );
}
