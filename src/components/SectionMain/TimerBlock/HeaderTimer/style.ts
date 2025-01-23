import { colors } from "src/constants/colors";
import styled from "styled-components";

export const header = styled.div<{ $isCount?: boolean; $isBreak?: boolean }>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 0;
  width: 100%;
  padding: 19px 40px;
  background-color: ${(props) =>
    props.$isCount && props.$isBreak
      ? `${colors.oliveGreen}`
      : props.$isCount
      ? `${colors.punch}`
      : props.theme.headerBackgroundTimer};
`;

export const textInformation = styled.span<{ fontWeight?: number }>`
  font-size: 16px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
  color: ${colors.white};
`;
