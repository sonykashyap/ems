export const getPagination = (currentPage, totalPages) => {
  const pages = [];

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);
  pages.push(2);

  if (currentPage > 3) pages.push("...");

  if (currentPage > 2 && currentPage < totalPages - 1) {
    pages.push(currentPage);
  }

  if (currentPage < totalPages - 2) pages.push("...");

  pages.push(totalPages - 1);

  return pages;
};