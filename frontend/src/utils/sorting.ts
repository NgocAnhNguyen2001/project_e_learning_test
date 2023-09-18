export const sortDescending = (
  a: { order: number } | any,
  b: { order: number } | any,
): number => {
  return b.order - a.order;
};

export const sortAscending = (
  a: { order: number } | any,
  b: { order: number } | any,
): number => {
  return a.order - b.order;
};
