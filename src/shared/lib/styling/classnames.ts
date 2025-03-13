type ClassNamesArgs = (string | Record<string, boolean> | undefined)[];

export const classnames = (...classNames: ClassNamesArgs) => {
  const initialValue: string[] = [];

  return classNames
    .reduce((acc, current) => {
      if (typeof current === 'object' && current !== null) {
        Object.entries(current).forEach(([key, value]) => {
          if (value) {
            acc.push(key);
          }
        });
      }

      if (typeof current === 'string' && current.length > 0) {
        acc.push(current);
      }

      return acc;
    }, initialValue)
    .join(' ');
};
