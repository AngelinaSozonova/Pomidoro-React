export type ThemeType = "light" | "dark";

export interface ISetting {
  timePomidoro: ITime;
  timeShortBreak: ITime;
  timeLongBreak: ITime;
  frequencyLongBreak: number;
  isNotifications: boolean;
}

export interface ITime {
  min: string;
  sec: string;
}