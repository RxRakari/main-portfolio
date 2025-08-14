import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { useTheme } from '../../../context/theme-context';

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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const totalPages = pagination ? Math.ceil(pagination.totalItems / pagination.pageSize) : 0;

  const handlePageChange = (page: number) => {
    if (pagination && page >= 1 && page <= totalPages) {
      pagination.onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    if (!pagination || totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const current = pagination.currentPage;
    if (current <= 3) return [1, 2, 3, 4, 5, '...', totalPages];
    if (current >= totalPages - 2)
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', current - 1, current, current + 1, '...', totalPages];
  };

  const containerClasses = isLight
    ? 'bg-white shadow rounded-lg overflow-hidden'
    : 'bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-lg';
  const tableHeadClasses = isLight ? 'bg-gray-50' : 'bg-black/60';
  const tableHeadText = isLight ? 'text-gray-500' : 'text-white';
  const rowBaseClasses = isLight ? 'hover:bg-gray-50' : 'hover:bg-white/10 transition-colors duration-150';
  const cellTextClasses = isLight ? 'text-gray-500' : 'text-gray-300';
  const paginationBg = isLight ? 'bg-white' : 'bg-black/60';
  const paginationBorder = isLight ? 'border-gray-300' : 'border-white/10';
  const activePageClasses = isLight
    ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
    : 'z-10 bg-white/20 border-white/20 text-white';
  const inactivePageClasses = isLight
    ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
    : 'bg-black/40 border-white/10 text-gray-300 hover:bg-white/10';

  // Loading state
  if (isLoading) {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="animate-pulse">
          <div className={`h-10 ${isLight ? 'bg-gray-200' : 'bg-white/5'} mb-4`} />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-16 ${isLight ? 'bg-gray-100' : 'bg-white/10'} mb-2`} />
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!data.length) {
    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="p-6 text-center">
          <p className={isLight ? 'text-gray-500' : 'text-gray-400'}>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y ${isLight ? 'divide-gray-200' : 'divide-white/10'}`}>
          <thead className={tableHeadClasses}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left text-xs font-bold ${tableHeadText} uppercase tracking-wider`}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={isLight ? 'bg-white divide-y divide-gray-200' : 'divide-y divide-white/10'}>
            {data.map((row, idx) => (
              <tr
                key={row[rowKey]}
                className={`${isLight ? '' : idx % 2 === 0 ? 'bg-white/5' : ''} ${rowBaseClasses} ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={`${row[rowKey]}-${col.key}`}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${cellTextClasses}`}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div
          className={`${paginationBg} px-4 py-3 flex items-center justify-between border-t ${paginationBorder} sm:px-6`}
        >
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border ${paginationBorder} text-sm font-medium rounded-md ${
                isLight
                  ? 'text-gray-700 bg-white hover:bg-gray-50'
                  : 'text-white bg-black/40 hover:bg-white/10'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border ${paginationBorder} text-sm font-medium rounded-md ${
                isLight
                  ? 'text-gray-700 bg-white hover:bg-gray-50'
                  : 'text-white bg-black/40 hover:bg-white/10'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className={`text-sm ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                Showing{' '}
                <span className={`font-medium ${isLight ? '' : 'text-white'}`}>
                  {(pagination.currentPage - 1) * pagination.pageSize + 1}
                </span>{' '}
                to{' '}
                <span className={`font-medium ${isLight ? '' : 'text-white'}`}>
                  {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
                </span>{' '}
                of{' '}
                <span className={`font-medium ${isLight ? '' : 'text-white'}`}>
                  {pagination.totalItems}
                </span>{' '}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${paginationBorder} ${
                    isLight
                      ? 'bg-white text-gray-500 hover:bg-gray-50'
                      : 'bg-black/40 text-gray-300 hover:bg-white/10'
                  } text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="sr-only">First</span>
                  <FiChevronsLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 border ${paginationBorder} ${
                    isLight
                      ? 'bg-white text-gray-500 hover:bg-gray-50'
                      : 'bg-black/40 text-gray-300 hover:bg-white/10'
                  } text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                {getPageNumbers().map((page, idx) =>
                  page === '...' ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className={`relative inline-flex items-center px-4 py-2 border ${paginationBorder} ${
                        isLight ? 'bg-white text-gray-700' : 'bg-black/40 text-gray-300'
                      } text-sm font-medium`}
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={`page-${page}`}
                      onClick={() => handlePageChange(page as number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pagination.currentPage === page ? activePageClasses : inactivePageClasses
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 border ${paginationBorder} ${
                    isLight
                      ? 'bg-white text-gray-500 hover:bg-gray-50'
                      : 'bg-black/40 text-gray-300 hover:bg-white/10'
                  } text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={pagination.currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${paginationBorder} ${
                    isLight
                      ? 'bg-white text-gray-500 hover:bg-gray-50'
                      : 'bg-black/40 text-gray-300 hover:bg-white/10'
                  } text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
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
