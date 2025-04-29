import { Pagination } from "flowbite-react";

function Component({ totalPages, currentPage, setCurrentPage }) {
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

export default Component;
