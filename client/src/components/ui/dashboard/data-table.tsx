import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

interface Column {
  key: string;
  header: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: Pagination;
  onRowClick?: (row: any) => void;
  rowKey?: string;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  emptyMessage = 'No data available',
  isLoading = false,
  pagination,
  onRowClick,
  rowKey = 'id',
  className = '',
}) => {
  // Calculate total pages for pagination
  const totalPages = pagination
    ? Math.ceil(pagination.totalItems / pagination.pageSize)
    : 0;

  // Handle page change
  const handlePageChange = (page: number) => {
    if (pagination && page >= 1 && page <= totalPages) {
      pagination.onPageChange(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    if (!pagination || totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const current = pagination.currentPage;
    
    if (current <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    
    if (current >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, '...', current - 1, current, current + 1, '...', totalPages];
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className={`bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-lg ${className}`}>
        <div className="animate-pulse">
          <div className="h-10 bg-white/5 mb-4"></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-16 bg-white/10 mb-2"></div>
          ))}
        </div>
      </div>
    );
  }
  
  // Render empty state
  if (!data.length) {
    return (
      <div className={`bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-lg ${className}`}>
        <div className="p-6 text-center">
          <p className="text-gray-400">{emptyMessage}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-black/60">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.map((row, index) => (
              <tr
                key={row[rowKey]}
                className={`${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-white/10 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td key={`${row[rowKey]}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="bg-black/60 px-4 py-3 flex items-center justify-between border-t border-white/10 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-white/10 text-sm font-medium rounded-md text-white bg-black/40 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-white/10 text-sm font-medium rounded-md text-white bg-black/40 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-300">
                Showing <span className="font-medium text-white">{((pagination.currentPage - 1) * pagination.pageSize) + 1}</span> to{' '}
                <span className="font-medium text-white">
                  {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
                </span>{' '}
                of <span className="font-medium text-white">{pagination.totalItems}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-white/10 bg-black/40 text-sm font-medium text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">First</span>
                  <FiChevronsLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-white/10 bg-black/40 text-sm font-medium text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="relative inline-flex items-center px-4 py-2 border border-white/10 bg-black/40 text-sm font-medium text-gray-300"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={`page-${page}`}
                      onClick={() => handlePageChange(page as number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pagination.currentPage === page
                          ? 'z-10 bg-white/20 border-white/20 text-white'
                          : 'bg-black/40 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-white/10 bg-black/40 text-sm font-medium text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={pagination.currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-white/10 bg-black/40 text-sm font-medium text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Last</span>
                  <FiChevronsRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable; 