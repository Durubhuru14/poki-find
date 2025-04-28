import { Pagination } from "flowbite-react";

function Component({ totalPages, currentPage, setCurrentPage }) {
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default Component;
