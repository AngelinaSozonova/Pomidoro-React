import styled from "styled-components";
import SettingsIcon from "../Icons/SettingsIcon";
import { colors } from "src/constants/colors";

export const button = styled.button`
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
`;

export const svg = styled(SettingsIcon)`
  width: 35px;
  fill: ${colors.white};
`;

export const list = styled.ul`
  margin: 0;
  padding: 0;
`;

export const item = styled.li`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const label = styled.span`
  margin-right: 5px;
  width: 34%;
`;

export const time = styled.span`
  margin-right: 5px;
`;

export const input = styled.input`
  border: none;
  padding: 8px 5px;
  background-color: ${colors.wildSand};
  font-size: 16px;
  font-weight: 300;
  line-height: 17px;
`;
