export const isValidDate = (date: string) => {
  const parsedDate = Date.parse(date);
  return !isNaN(parsedDate);
};