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

export const formatWeight = (weight: number | string | null): string => {
  let value: number;
  if (weight === null) return "n/a";
  if (typeof weight === "string") {
    value = parseFloat(weight);
  } else value = weight;

  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "gram",
    unitDisplay: "short",
  }).format(value);
};

export const formatCurrency = (
  input: number | string | null,
  options?: Intl.NumberFormatOptions
): string => {
  let rawNum: number;
  if (input === null) return "n/a";
  if (typeof input === "string") {
    rawNum = parseFloat(input);
  } else rawNum = input;

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: options?.maximumFractionDigits,
    style: "currency",
    currency: options?.currency || "USD",
  }).format(rawNum);
};
