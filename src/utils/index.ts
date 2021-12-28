/* eslint-disable import/prefer-default-export */

export const simulateHttpRequest = (): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), 1500));

const monthNames = [
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

export const calculateTimeDiff = (timestamp: number): string => {
  const timestampDate = new Date(timestamp);

  const diffInMinutes = Math.floor(
    (new Date().getTime() - timestampDate.getTime()) / 60000,
  );

  const hours = Math.floor(diffInMinutes / 60);
  const days = Math.floor(hours / 24);
  const month = Math.floor(days / 30);
  const years = Math.floor(month / 12);

  const timestampMonthName = monthNames[timestampDate.getMonth()];

  if (years >= 1) {
    return `${timestampMonthName} ${timestampDate}, ${timestampDate.getFullYear()}`;
  }

  if (month >= 1) {
    return `${timestampMonthName} ${timestampDate}`;
  }
  if (days >= 1) {
    return `${days} day ago`;
  }
  if (hours >= 1) {
    return `${hours} hour ago`;
  }
  return `${diffInMinutes} min ago`;
};

export const TOKEN_STORAGE_KEY = 'singularity-token';
