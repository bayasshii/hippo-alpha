export const getYears = (years: Array<{ year: number }> = []) =>
  years?.reduce((prev, current) => {
    return prev + current.year;
  }, 0);
