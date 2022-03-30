export const time_converter = (num) => {
  const hours = Math.floor(num / 60);
  const minute = num % 60;
  return `${hours}h ${minute}m`;
};
