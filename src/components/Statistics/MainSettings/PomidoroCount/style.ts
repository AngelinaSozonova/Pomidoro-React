import { colors } from "src/constants/colors";
import styled from "styled-components";

export const pomidoroCountBlock = styled.div<{ $isActive: boolean }>`
  padding: 25px;
  background: ${(props) => props.theme.backgroundStatistics};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.$isActive ? "23px 25px 51px 25px" : "25px")};
  min-height: 179px;
`;

export const imgPomidoro = styled.img<{ $isActive: boolean }>`
  margin-right: ${(props) => (props.$isActive ? "15px" : "0")};
`;

export const countPomidoro = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 33px;
  color: ${(props) => props.theme.textColorCountPomidoro};
`;

export const textCountPomidoro = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 51px;
  font-size: 24px;
  font-weight: 500;
  color: ${colors.white};
  background-color: ${colors.punch};
`;
