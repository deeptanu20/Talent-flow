import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  Briefcase, 
  CheckCircle, 
  Clock,
  Target,
  Award,
  AlertCircle
} from 'lucide-react';
import { cn, formatNumber, calculatePercentage } from '../../utils/helpers.js';

/**
 * MetricsCard Component
 * Displays key metrics with trend indicators and icons
 */
const MetricsCard = ({
  title,
  value,
  previousValue = null,
  format = 'number',
  icon = 'default',
  color = 'blue',
  className = '',
  loading = false,
  error = null,
  subtitle = null,
  trend = 'auto',
  showTrend = true,
}) => {
  // Icon mapping
  const iconMap = {
    users: Users,
    jobs: Briefcase,
    success: CheckCircle,
    time: Clock,
    target: Target,
    award: Award,
    alert: AlertCircle,
    default: TrendingUp,
  };

  // Color configurations
  const colorConfig = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-800/50',
      trend: {
        up: 'text-green-600 dark:text-green-400',
        down: 'text-red-600 dark:text-red-400',
        neutral: 'text-gray-600 dark:text-gray-400',
      }
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      icon: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-800/50',
      trend: {
        up: 'text-green-600 dark:text-green-400',
        down: 'text-red-600 dark:text-red-400',
        neutral: 'text-gray-600 dark:text-gray-400',
      }
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'text-red-600 dark:text-red-400',
      iconBg: 'bg-red-100 dark:bg-red-800/50',
      trend: {
        up: 'text-green-600 dark:text-green-400',
        down: 'text-red-600 dark:text-red-400',
        neutral: 'text-gray-600 dark:text-gray-400',
      }
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      icon: 'text-yellow-600 dark:text-yellow-400',
      iconBg: 'bg-yellow-100 dark:bg-yellow-800/50',
      trend: {
        up: 'text-green-600 dark:text-green-400',
        down: 'text-red-600 dark:text-red-400',
        neutral: 'text-gray-600 dark:text-gray-400',
      }
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      icon: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-800/50',
      trend: {
        up: 'text-green-600 dark:text-green-400',
        down: 'text-red-600 dark:text-red-400',
        neutral: 'text-gray-600 dark:text-gray-400',
      }
    },
  };

  // Format value based on type
  const formatValue = (val) => {
    if (val == null) return '—';
    
    switch (format) {
      case 'number':
        return formatNumber(val);
      case 'percentage':
        return `${val}%`;
      case 'currency':
        return `$${formatNumber(val)}`;
      case 'time':
        return `${val} days`;
      default:
        return String(val);
    }
  };

  // Calculate trend
  const getTrendData = () => {
    if (!showTrend || previousValue == null || value == null) {
      return null;
    }

    const change = value - previousValue;
    const percentChange = previousValue !== 0 
      ? ((change / previousValue) * 100).toFixed(1)
      : 0;

    let trendDirection = trend;
    if (trend === 'auto') {
      if (change > 0) trendDirection = 'up';
      else if (change < 0) trendDirection = 'down';
      else trendDirection = 'neutral';
    }

    const trendIcon = {
      up: TrendingUp,
      down: TrendingDown,
      neutral: Minus,
    }[trendDirection];

    return {
      change: Math.abs(change),
      percentChange: Math.abs(percentChange),
      direction: trendDirection,
      icon: trendIcon,
      isPositive: change > 0,
      isNegative: change < 0,
      isNeutral: change === 0,
    };
  };

  const IconComponent = iconMap[icon] || iconMap.default;
  const colors = colorConfig[color] || colorConfig.blue;
  const trendData = getTrendData();

  if (loading) {
    return (
      <div className={cn(
        'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6',
        className
      )}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        'bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 p-6',
        className
      )}>
        <div className="flex items-center text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="text-sm">Failed to load metric</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
        'p-6 hover:shadow-lg transition-shadow duration-200',
        colors.bg,
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={cn('p-2 rounded-lg', colors.iconBg)}>
          <IconComponent className={cn('w-5 h-5', colors.icon)} />
        </div>
        
        {trendData && (
          <div className={cn(
            'flex items-center text-sm font-medium',
            colors.trend[trendData.direction]
          )}>
            <trendData.icon className="w-4 h-4 mr-1" />
            <span>{trendData.percentChange}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {formatValue(value)}
        </div>
      </div>

      {/* Title and Subtitle */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {subtitle}
          </p>
        )}
        
        {trendData && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {trendData.isPositive && '+'}{formatValue(trendData.change)} from last period
          </p>
        )}
      </div>
    </motion.div>
  );
};

/**
 * MetricsGrid Component
 * Grid layout for multiple metrics cards
 */
export const MetricsGrid = ({ 
  metrics = [], 
  columns = 4,
  className = '',
  loading = false 
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  };

  if (loading) {
    return (
      <div className={cn('grid gap-6', gridCols[columns] || gridCols[4], className)}>
        {Array.from({ length: columns }).map((_, index) => (
          <MetricsCard key={index} loading={true} title="" value={0} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns] || gridCols[4], className)}>
      {metrics.map((metric, index) => (
        <MetricsCard
          key={metric.id || index}
          {...metric}
        />
      ))}
    </div>
  );
};

/**
 * ComparisonCard Component
 * Shows comparison between two values
 */
export const ComparisonCard = ({
  title,
  primaryValue,
  secondaryValue,
  primaryLabel,
  secondaryLabel,
  format = 'number',
  icon = 'default',
  color = 'blue',
  className = '',
}) => {
  const IconComponent = iconMap[icon] || iconMap.default;
  const colors = colorConfig[color] || colorConfig.blue;

  const formatValue = (val) => {
    if (val == null) return '—';
    
    switch (format) {
      case 'percentage':
        return `${val}%`;
      case 'currency':
        return `$${formatNumber(val)}`;
      default:
        return formatNumber(val);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
        'p-6 hover:shadow-lg transition-shadow duration-200',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className={cn('p-2 rounded-lg mr-3', colors.iconBg)}>
          <IconComponent className={cn('w-5 h-5', colors.icon)} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>

      {/* Comparison Values */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {formatValue(primaryValue)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {primaryLabel}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {formatValue(secondaryValue)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {secondaryLabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsCard;