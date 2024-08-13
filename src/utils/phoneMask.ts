export const phoneMask = (value: string): string => {
  if (value.startsWith('8')) {
    return '+7' + value.slice(1);
  }
  return value;
};
