export const getPagesToRender = (
  maxPages: number,
  currentPage: number,
  limit: number
) => {
  const pagesToRender = [];
  const half = Math.floor(limit / 2);

  let start = Math.max(currentPage - half, 1);
  let end = Math.min(currentPage + half, maxPages);

  if (currentPage <= half) {
    start = 1;
    end = Math.min(limit, maxPages);
  } else if (currentPage >= maxPages - half) {
    start = Math.max(maxPages - limit + 1, 1);
    end = maxPages;
  }

  if (start > 1) {
    pagesToRender.push({ content: '1', to: 1 });
    if (start > 2) {
      pagesToRender.push({
        content: '...',
        to: Math.max(1, currentPage - limit),
      });
    }
  }

  for (let i = start; i <= end; i += 1) {
    pagesToRender.push({ content: i.toString(), to: i });
  }

  if (end < maxPages) {
    if (end < maxPages - 1) {
      pagesToRender.push({
        content: '...',
        to: Math.min(maxPages, currentPage + limit),
      });
    }

    pagesToRender.push({ content: maxPages.toString(), to: maxPages });
  }

  return pagesToRender;
};
