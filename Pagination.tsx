  
  // Pagination 
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the number of pages
  const totalPages = Math.ceil(data?.length / pageSize);

  // Calculate the start and end indices of the items for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the data
  const currentData = data.slice(startIndex, endIndex);

// Handle change page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };


// Render page number
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const pageRangeDisplayed = 3; // Number of pages to display in the middle
    const totalPageNumbers = pageRangeDisplayed + 2; // Including the first and last pages

    if (totalPages <= totalPageNumbers) {
      for (let number = 1; number <= totalPages; number++) {
        pageNumbers.push(
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={`px-3 py-1 rounded-2xl ${currentPage === number
              ? 'bg-primary font-semibolds text-white '
              : 'bg-gray-100 text-gray-700 hover:bg-gray-400'
              }`}
          >
            {number}
          </button>
        );
      }
    } else {
      let leftSide = Math.max(2, currentPage - 1);
      let rightSide = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage === 1) {
        rightSide = currentPage + 2;
      } else if (currentPage === totalPages) {
        leftSide = currentPage - 2;
      }

      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`px-3 py-1 rounded-2xl ${currentPage === 1
            ? 'bg-primary font-semibolds text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-400'
            }`}
        >
          1
        </button>
      );

      if (leftSide > 2) {
        pageNumbers.push(
          <span key="left-ellipsis" className="px-3 py-1 text-gray-500">
            ...
          </span>
        );
      }

      for (let number = leftSide; number <= rightSide; number++) {
        pageNumbers.push(
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={`px-3 py-1 rounded-2xl ${currentPage === number
              ? 'bg-primary font-semibolds text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-400'
              }`}
          >
            {number}
          </button>
        );
      }

      if (rightSide < totalPages - 1) {
        pageNumbers.push(
          <span key="right-ellipsis" className="px-3 py-1 text-gray-500">
            ...
          </span>
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`px-3 py-1 rounded-2xl ${currentPage === totalPages
            ? 'bg-primary font-semibolds text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-400'
            }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };


// Usage
  <div className="flex justify-end gap-5">
                <div className="flex">
                  <div className="flex justify-center items-center mt-4 space-x-2">
                    <span className="text-gray-400 text-sm font-semidbold mr-2">Showing {currentPage} to {pageSize} of {data?.length} entries</span>
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`px-1.5 py-1.5 rounded-2xl ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-600'}`}
                    >
                      <ChevronLeftIcon width={18} height={18} />
                    </button>
                    {renderPageNumbers()}
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-1.5 py-1.5 rounded-2xl ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-600'}`}
                    >
                      <ChevronRightIcon width={18} height={18} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-center items-center mt-4">
                  <select
                    id="pageSize"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>1</option>
                    <option value={7}>7</option>
                    <option value={14}>14</option>
                    <option value={21}>21</option>
                  </select>
                </div>
              </div>
