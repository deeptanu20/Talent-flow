import { useState, useEffect, useMemo, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import { cn } from '../../utils/helpers.js';
import { VIRTUAL_LIST } from '../../utils/constants.js';
import LoadingSpinner from './LoadingSpinner.jsx';

/**
 * VirtualizedList Component
 * High-performance list for rendering large datasets
 */
const VirtualizedList = ({
  items = [],
  itemHeight = VIRTUAL_LIST.ITEM_HEIGHT,
  height = 400,
  width = '100%',
  renderItem,
  loading = false,
  error = null,
  emptyMessage = 'No items found',
  className = '',
  overscanCount = VIRTUAL_LIST.OVERSCAN,
  onItemsRendered,
  onScroll,
  searchTerm = '',
  searchFields = [],
  sortBy = null,
  sortDirection = 'asc',
}) => {
  const listRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Filter and sort items
  const processedItems = useMemo(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchTerm && searchFields.length > 0) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        searchFields.some(field => {
          const value = field.split('.').reduce((obj, key) => obj?.[key], item);
          return String(value || '').toLowerCase().includes(term);
        })
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = sortBy.split('.').reduce((obj, key) => obj?.[key], a);
        const bValue = sortBy.split('.').reduce((obj, key) => obj?.[key], b);

        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        else if (aValue > bValue) comparison = 1;

        return sortDirection === 'desc' ? -comparison : comparison;
      });
    }

    return filtered;
  }, [items, searchTerm, searchFields, sortBy, sortDirection]);

  // Handle scroll events
  const handleScroll = ({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) => {
    if (onScroll) {
      onScroll({ scrollDirection, scrollOffset, scrollUpdateWasRequested });
    }
  };

  // Handle items rendered
  const handleItemsRendered = ({ 
    visibleStartIndex, 
    visibleStopIndex, 
    overscanStartIndex, 
    overscanStopIndex 
  }) => {
    if (onItemsRendered) {
      onItemsRendered({ 
        visibleStartIndex, 
        visibleStopIndex, 
        overscanStartIndex, 
        overscanStopIndex 
      });
    }
  };

  // Scroll to specific item
  const scrollToItem = (index, align = 'auto') => {
    if (listRef.current) {
      listRef.current.scrollToItem(index, align);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo(0);
    }
  };

  // Row renderer
  const Row = ({ index, style }) => {
    const item = processedItems[index];
    const isEven = index % 2 === 0;

    return (
      <div 
        style={style}
        className={cn(
          'virtual-list-item flex items-center px-4',
          isEven ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900',
          'border-b border-gray-100 dark:border-gray-800 last:border-b-0',
          'transition-colors duration-150'
        )}
      >
        {renderItem ? renderItem(item, index) : (
          <div className="w-full p-2">
            <pre className="text-sm text-gray-600 dark:text-gray-400">
              {JSON.stringify(item, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div 
        className={cn('virtual-list-container', className)}
        style={{ height }}
      >
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner text="Loading items..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div 
        className={cn('virtual-list-container', className)}
        style={{ height }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-red-600 dark:text-red-400 mb-2">
              {error.message || 'Failed to load items'}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (processedItems.length === 0) {
    return (
      <div 
        className={cn('virtual-list-container', className)}
        style={{ height }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="text-lg mb-2">📭</div>
            <div>{emptyMessage}</div>
            {searchTerm && (
              <div className="text-sm mt-1">
                No results for "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('virtual-list-container', className)}>
      <List
        ref={listRef}
        height={height}
        width={width}
        itemCount={processedItems.length}
        itemSize={itemHeight}
        overscanCount={overscanCount}
        onItemsRendered={handleItemsRendered}
        onScroll={handleScroll}
        className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
      >
        {Row}
      </List>
      
      {/* Scroll to top button */}
      {processedItems.length > 10 && (
        <button
          onClick={scrollToTop}
          className={cn(
            'absolute bottom-4 right-4 z-10',
            'bg-primary-600 hover:bg-primary-700 text-white',
            'rounded-full p-2 shadow-lg',
            'transition-all duration-200',
            'opacity-80 hover:opacity-100'
          )}
          title="Scroll to top"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

/**
 * VirtualizedGrid Component
 * Grid layout for virtualized items
 */
export const VirtualizedGrid = ({
  items = [],
  itemHeight = 200,
  itemWidth = 300,
  height = 400,
  width = '100%',
  renderItem,
  loading = false,
  error = null,
  emptyMessage = 'No items found',
  className = '',
  columnCount = 'auto',
}) => {
  const containerRef = useRef(null);
  const [actualColumnCount, setActualColumnCount] = useState(1);

  // Calculate column count based on container width
  useEffect(() => {
    if (columnCount === 'auto' && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const calculatedColumns = Math.floor(containerWidth / itemWidth);
      setActualColumnCount(Math.max(1, calculatedColumns));
    } else if (typeof columnCount === 'number') {
      setActualColumnCount(columnCount);
    }
  }, [itemWidth, columnCount]);

  // Calculate grid dimensions
  const rowCount = Math.ceil(items.length / actualColumnCount);
  const gridHeight = itemHeight;

  // Grid row renderer
  const GridRow = ({ index, style }) => {
    const startIndex = index * actualColumnCount;
    const endIndex = Math.min(startIndex + actualColumnCount, items.length);
    const rowItems = items.slice(startIndex, endIndex);

    return (
      <div style={style} className="flex">
        {rowItems.map((item, itemIndex) => (
          <div
            key={startIndex + itemIndex}
            style={{ width: itemWidth, height: itemHeight }}
            className="p-2"
          >
            {renderItem ? renderItem(item, startIndex + itemIndex) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                Item {startIndex + itemIndex + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center', className)} style={{ height }}>
        <LoadingSpinner text="Loading items..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('flex items-center justify-center', className)} style={{ height }}>
        <div className="text-center text-red-600 dark:text-red-400">
          {error.message || 'Failed to load items'}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={cn('flex items-center justify-center', className)} style={{ height }}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('virtual-grid-container', className)}>
      <List
        height={height}
        width={width}
        itemCount={rowCount}
        itemSize={gridHeight}
        overscanCount={2}
      >
        {GridRow}
      </List>
    </div>
  );
};

// Export utility function to imperatively control the list
export const useVirtualizedList = () => {
  const listRef = useRef(null);

  const scrollToItem = (index, align = 'auto') => {
    if (listRef.current) {
      listRef.current.scrollToItem(index, align);
    }
  };

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo(0);
    }
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollToItem(listRef.current.props.itemCount - 1);
    }
  };

  return {
    listRef,
    scrollToItem,
    scrollToTop,
    scrollToBottom,
  };
};

export default VirtualizedList;