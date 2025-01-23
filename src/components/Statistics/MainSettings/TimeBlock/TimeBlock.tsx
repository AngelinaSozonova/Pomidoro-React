import { useContext } from "react";
import {
  convertSecondsToHMS,
  formatTime,
} from "../../../../helpers/convertSecondsToHMS";
import { daysOfWeek } from "../../constants";
import { statisticsContext } from "../../../../context/statisticsContext";
import * as s from './style'
import { colors } from "src/constants/colors";

interface ITimeBlock {
  currentDay: number;
  isActive: boolean;
}

const TimeBlock = ({ currentDay, isActive }: ITimeBlock) => {
  const { timeAll } = useContext(statisticsContext);

  const { hours, minutes, remainingSeconds } = convertSecondsToHMS(timeAll);
  const format = ` ${formatTime(hours, minutes, remainingSeconds, "long")}`;

  return (
    <s.data>
      <s.dayWeek>{currentDay !== null && daysOfWeek[currentDay]}</s.dayWeek>
      {isActive ? (
        <s.dataDescr>
          Вы работали над задачами в течение
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: `${colors.punch}`,
            }}
          >
            {format}
          </span>
        </s.dataDescr>
      ) : (
        <s.dataDescr>Нет данных</s.dataDescr>
      )}
    </s.data>
  );
};

export default TimeBlock;
