export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const years = Array.from({ length: 2031 - 1980 }, (_, i) => {
  return (1980 + i).toString();
});