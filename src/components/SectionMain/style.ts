import styled from "styled-components";
import SettingsIcon from "../Icons/SettingsIcon";
import { colors } from "src/constants/colors";

export const main = styled.div`
  padding: 100px 0;
`;

export const buttonSettings = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 40px;
  left: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${colors.oliveGreen};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.sycamore};
  }
`;

export const svg = styled(SettingsIcon)`
  width: 35px;
  fill: ${colors.white};
`;
