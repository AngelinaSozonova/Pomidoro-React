import { useContext, useEffect, useState } from "react";
import * as s from "./style";
import { statisticsContext } from "../../../context/statisticsContext";
import {
  convertSecondsToHMS,
  formatTime,
} from "../../../helpers/convertSecondsToHMS";

export type StatisticsCardType = "focus" | "timePause" | "stop";

interface IStatisticsCard {
  type: StatisticsCardType;
}

const StatisticsCard = ({ type }: IStatisticsCard) => {
  const { focus, pauseTime, stops } = useContext(statisticsContext);

  const [isActive, setIsActive] = useState(false);

  const getTitle = () => {
    if (type === "focus") {
      return "Фокус";
    } else if (type === "stop") {
      return "Остановки";
    } else if (type === "timePause") {
      return "Время на паузе";
    }

    return "";
  };

  const getCounter = () => {
    if (type === "focus") {
      return `${focus}%`;
    } else if (type === "stop") {
      return `${stops}`;
    } else if (type === "timePause") {
      const { hours, minutes, remainingSeconds } =
        convertSecondsToHMS(pauseTime);
      const format = formatTime(hours, minutes, remainingSeconds, "short");

      if (format) return `${format}`;

      return "0c";
    }

    return "";
  };

  useEffect(() => {
    if (focus !== 0) {
      setIsActive(true);
    } else setIsActive(false);
  }, [focus])

  return (
    <s.card $type={type} $isActive={isActive}>
      <s.title>{getTitle()}</s.title>
      <s.counter>{getCounter()}</s.counter>
    </s.card>
  );
};

export default StatisticsCard;
