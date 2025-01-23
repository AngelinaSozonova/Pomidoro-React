import { colors } from "src/constants/colors";
import styled from "styled-components";

export const time = styled.span<{ $isCount?: boolean; $isBreak?: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 150px;
  font-weight: 200;
  line-height: 179px;
  color: ${(props) =>
    props.$isCount && props.$isBreak
      ? `${colors.oliveGreen}`
      : props.$isCount
      ? `${colors.punch}`
      : `${colors.mineShaft}`};

  &.times-enter {
    opacity: 0;
    transform: scale(0.9);
  }

  &.times-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }

  &.times-exit {
    opacity: 1;
  }
`;

export const timerBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 733px;
  min-height: 507px;
  background-color: ${(props) => props.theme.backgroundTimer};
`;

export const blockTime = styled.div`
  display: flex;
  align-items: center;
  min-width: 453px;
  justify-content: space-between;
`;

export const blockCommands = styled.div`
  display: flex;
  justify-content: center;
`;

export const buttonAddTime = styled.button`
  svg circle {
    transition: fill 0.2s ease-in-out;
  }

  &:hover svg circle {
    fill: ${colors.sycamore};
  }
`;
