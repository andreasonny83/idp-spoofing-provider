export const getExpirationDate = (date: Date, seconds: number): Date => {
  const dateString = new Date(date).setSeconds(date.getSeconds() + seconds);
  return new Date(dateString);
};
