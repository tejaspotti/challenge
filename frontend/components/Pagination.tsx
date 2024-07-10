import React from 'react';

interface PaginationProps {
  total: number;
  limit: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, limit, offset, onPageChange }) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (offset > 0) {
      onPageChange(offset - limit);
    }
  };

  const handleNext = () => {
    if (offset + limit < total) {
      onPageChange(offset + limit);
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button onClick={handlePrev} disabled={offset === 0} className="btn btn-primary">
        Prev
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNext} disabled={offset + limit >= total} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default Pagination;
