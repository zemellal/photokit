export const locale = Intl.NumberFormat().resolvedOptions().locale;

export const sumTotal = (numArray: (number | null)[]): number => {
  const total = numArray.reduce(
    (accumulator, currentValue) => (accumulator || 0) + (currentValue || 0),
    0
  );
  return total || 0;
};

export const removeNullKeysFromObject = (
  o: { [s: string]: unknown } | ArrayLike<unknown>
): {
  [k: string]: unknown;
} => {
  return Object.fromEntries(Object.entries(o).filter(([_, v]) => v != null));
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

export const formatUnit = (
  length: number | string | null,
  options: Intl.NumberFormatOptions
): string | null => {
  let value: number;
  if (length === null) return null;
  if (typeof length === "string") {
    value = parseFloat(length);
  } else value = length;

  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: options?.unit,
    unitDisplay: options?.unitDisplay || "short",
    ...options,
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

export const formatDate = (
  input: number | Date | null,
  options?: Intl.DateTimeFormatOptions
) => {
  if (!input || input === null) return null;
  return localizeDate(input, options);
};

export const localizeDate = (
  date?: Date | number,
  options?: Intl.DateTimeFormatOptions
): string => {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: options?.dateStyle,
    ...options,
  }).format(date);
};
