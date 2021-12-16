/* eslint-disable import/prefer-default-export */

export const simulateHttpRequest = (): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), 1500));
