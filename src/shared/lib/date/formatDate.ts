export const formatDate = (inputDate?: string) => {
  return inputDate
    ? `${inputDate.slice(0, 4)}-${inputDate.slice(4, 6)}-${inputDate.slice(6)}`
    : inputDate;
};
