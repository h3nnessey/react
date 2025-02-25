export const processSearchParams = (
  params: Record<string, unknown | undefined> = {}
) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value.toString());
    }
  });

  return searchParams.toString();
};
