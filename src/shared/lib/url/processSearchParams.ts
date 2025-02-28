export const processSearchParams = (params: Record<string, unknown> = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value.toString());
    }
  });

  return searchParams.toString();
};
