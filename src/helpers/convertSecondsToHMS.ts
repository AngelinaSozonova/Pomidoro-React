export const convertSecondsToHMS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return { hours, minutes, remainingSeconds };
};

export const formatTime = (
  hours: number,
  minutes: number,
  remainingSeconds: number,
  format: "short" | "middle" | "long" = "middle"
) => {
  let result = "";

  if (hours !== 0) {
    result += format === "middle" ? `${hours} ч` : format === "short" ? `${hours}ч` : `${hours} часов`;
  }

  if (minutes !== 0) {
    result += format === "middle" ? `${minutes} мин` :  format === "short" ? `${minutes}м` : `${minutes} минуты`;
  }

  if (remainingSeconds !== 0) {
    result +=
      format === "middle" ? `${remainingSeconds} сек` : format === "short" ? `${remainingSeconds}с` : `${remainingSeconds} секунд`;
  }

  return result;
};
