import { IOptions } from "../../ui-components/Select/Select";
import { StatisticsCardType } from "./StatisticsCard/StatisticsCard";

export const options: IOptions[] = [
  {
    label: "Эта неделя",
    value: "currentWeek",
  },
  {
    label: "Прошедшая неделя",
    value: "lastWeek",
  },
  {
    label: "2 недели назад",
    value: "twoLastWeek",
  },
];

export const daysOfWeek = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const statisticsCardsTypes: StatisticsCardType[] = [
  "focus",
  "timePause",
  "stop",
];
