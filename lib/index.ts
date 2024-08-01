export const locale = Intl.NumberFormat().resolvedOptions().locale;

// MOCK temporary userId
export const mock_userId = "g9om23d7o0rdpigl81e2tl50";

export const sumTotal = (numArray: (number | null)[]): number => {
  const total = numArray.reduce(
    (accumulator, currentValue) => (accumulator || 0) + (currentValue || 0),
    0
  );
  return total || 0;
};
