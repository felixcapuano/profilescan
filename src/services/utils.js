export const time_converter = (num) => {
  const hours = Math.floor(num / 60);
  const minute = num % 60;
  return `${hours}h ${minute}m`;
};

export const minutes_to_hours = (min) => {
  return Math.floor(min / 60);
};

export const seconds_to_hours = (min) => {
  return Math.floor(min / 3600);
};
