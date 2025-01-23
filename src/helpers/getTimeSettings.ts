import { ITime } from "src/types.global";

export const getTimeSettings = (objTime: ITime) => {
  const minutes = Number(objTime.min);
  const sec = Number(objTime.sec);

  let res = 0;

  if (minutes) {
    res = minutes * 60;
  }

  res += sec;

  return res;
};
