import { Pagination } from "flowbite-react";

/**
 * Pagination component that displays page navigation controls.
 * Fixed at the bottom center of the viewport and horizontally scrollable if needed.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.totalPages - Total number of available pages
 * @param {number} props.currentPage - Currently active page (1-based index)
 * @param {function} props.setCurrentPage - Callback function to update the current page
 * @returns {JSX.Element} Fixed position pagination controls
 *
 * @example
 * <PaginationComponent
 *   totalPages={10}
 *   currentPage={3}
 *   setCurrentPage={setCurrentPage}
 * />
 */

function PaginationComponent({ totalPages, currentPage, setCurrentPage }) {
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto justify-center fixed bottom-0 left-1/2 translate-x-[-50%]">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default PaginationComponent;
