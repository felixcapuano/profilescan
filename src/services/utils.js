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

export const isValidSteamId = (id) => {
  return id.match(/[0-9]{17}$/g) !== null;
};

export const getIdFromPathname = (pathname) => {
  const regex =
    /^\/(?:id|profiles)\/([A-z0-9[^\-\]_.~!*'();:@&=+$,?%#@"]+)\/?$/;
  const match = pathname.match(regex);
  return match[1] || false;
};
