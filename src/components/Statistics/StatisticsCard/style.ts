import styled from "styled-components";
import { StatisticsCardType } from "./StatisticsCard";
import focusImgDesabled from "../../../assets/focus-desable.svg";
import timeImgDesabled from "../../../assets/time-desable.svg";
import stopImgDesabled from "../../../assets/stop-desable.svg";
import focusImgActive from "../../../assets/focus-active.svg";
import timeImgActive from "../../../assets/time-active.svg";
import stopImgActive from "../../../assets/stop-active.svg";
import { colors } from "src/constants/colors";

const getImageCard = (type: StatisticsCardType, isActive: boolean) => {
  if (type === "focus") {
    if (isActive) {
      return `url(${focusImgActive})`;
    }

    return `url(${focusImgDesabled})`;
  } else if (type === "timePause") {
    if (isActive) {
      return `url(${timeImgActive})`;
    }

    return `url(${timeImgDesabled})`;
  } else if (type === "stop") {
    if (isActive) {
      return `url(${stopImgActive})`;
    }

    return `url(${stopImgDesabled})`;
  }
};

const getBackgroundColor = (type: StatisticsCardType, isActive: boolean) => {
  if (type === "focus") {
    if (isActive) {
      return `${colors.navajoWhite}`;
    }
  } else if (type === "timePause") {
    if (isActive) {
      return `${colors.fog}`;
    }
  } else if (type === "stop") {
    if (isActive) {
      return `${colors.onahau}`;
    }
  }

  return `${colors.wildSand}`;
};

export const card = styled.div<{
  $type: StatisticsCardType;
  $isActive: boolean;
}>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 25px;
  min-width: 405px;
  min-height: 179px;
  background-image: ${(props) => getImageCard(props.$type, props.$isActive)};
  background-repeat: no-repeat;
  background-position: center right 25px;
  background-color: ${(props) =>
    getBackgroundColor(props.$type, props.$isActive)};
`;

export const title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 33px;
  color: ${colors.mineShaft};
`;

export const counter = styled.span`
  font-size: 64px;
  font-weight: 400;
  line-height: 76px;
`;
