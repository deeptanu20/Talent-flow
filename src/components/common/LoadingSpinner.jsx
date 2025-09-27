import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers.js';

/**
 * LoadingSpinner Component
 * Simple, customizable loading spinner with multiple variants
 */
const LoadingSpinner = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  className = '',
  text = null,
  fullScreen = false,
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  // Color configurations
  const colorClasses = {
    primary: 'text-primary-600',
    gray: 'text-gray-600 dark:text-gray-400',
    white: 'text-white',
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
  };

  // Text size based on spinner size
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const SpinnerIcon = () => (
    <Loader2 
      className={cn(
        'animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )} 
    />
  );

  const DotsSpinner = () => (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn(
            'rounded-full',
            size === 'xs' && 'w-1 h-1',
            size === 'sm' && 'w-1.5 h-1.5',
            size === 'md' && 'w-2 h-2',
            size === 'lg' && 'w-3 h-3',
            size === 'xl' && 'w-4 h-4',
            colorClasses[color]
          )}
          style={{
            backgroundColor: 'currentColor',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );

  const PulseSpinner = () => (
    <motion.div
      className={cn(
        'rounded-full border-2',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      style={{
        borderColor: 'currentColor',
        borderTopColor: 'transparent',
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );

  const BarSpinner = () => (
    <div className={cn('flex space-x-0.5', className)}>
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className={cn(
            'rounded-sm',
            size === 'xs' && 'w-0.5 h-2',
            size === 'sm' && 'w-0.5 h-3',
            size === 'md' && 'w-1 h-4',
            size === 'lg' && 'w-1 h-6',
            size === 'xl' && 'w-1.5 h-8',
            colorClasses[color]
          )}
          style={{
            backgroundColor: 'currentColor',
          }}
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );

  // Render appropriate spinner variant
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return <DotsSpinner />;
      case 'pulse':
        return <PulseSpinner />;
      case 'bars':
        return <BarSpinner />;
      case 'spinner':
      default:
        return <SpinnerIcon />;
    }
  };

  const content = (
    <div className={cn(
      'flex items-center justify-center',
      text && 'space-x-2',
      fullScreen && 'min-h-screen'
    )}>
      {renderSpinner()}
      
      {text && (
        <span className={cn(
          'font-medium',
          textSizeClasses[size],
          colorClasses[color]
        )}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

/**
 * Loading Skeleton Component
 * For content placeholders while loading
 */
export const LoadingSkeleton = ({ 
  className = '',
  width = 'full',
  height = '4',
  rounded = 'md',
  animate = true 
}) => {
  const widthClasses = {
    full: 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '2/3': 'w-2/3',
    '1/4': 'w-1/4',
    '3/4': 'w-3/4',
  };

  const heightClasses = {
    2: 'h-2',
    3: 'h-3',
    4: 'h-4',
    6: 'h-6',
    8: 'h-8',
    12: 'h-12',
    16: 'h-16',
    20: 'h-20',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700',
        widthClasses[width] || `w-${width}`,
        heightClasses[height] || `h-${height}`,
        roundedClasses[rounded],
        animate && 'animate-pulse',
        className
      )}
    />
  );
};

/**
 * Loading Card Component
 * Complete loading card placeholder
 */
export const LoadingCard = ({ className = '' }) => {
  return (
    <div className={cn(
      'p-4 border border-gray-200 dark:border-gray-700 rounded-lg',
      'bg-white dark:bg-gray-800',
      className
    )}>
      <div className="space-y-3">
        <LoadingSkeleton width="3/4" height="6" />
        <LoadingSkeleton width="full" height="4" />
        <LoadingSkeleton width="1/2" height="4" />
        <div className="flex space-x-2 mt-4">
          <LoadingSkeleton width="20" height="8" rounded="full" />
          <LoadingSkeleton width="24" height="8" rounded="full" />
        </div>
      </div>
    </div>
  );
};

/**
 * Loading Table Component
 * Table rows loading placeholder
 */
export const LoadingTable = ({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={rowIndex} 
          className="flex space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <LoadingSkeleton 
              key={colIndex} 
              width={colIndex === 0 ? '1/4' : 'full'} 
              height="4" 
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LoadingSpinner;