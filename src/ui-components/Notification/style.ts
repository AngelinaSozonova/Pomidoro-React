import { colors } from "src/constants/colors";
import styled from "styled-components";

export const block = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  position: fixed;
  bottom: 40px;
  right: 50px;
`;

export const wrapInfo = styled.li`
  position: relative;
  min-width: 400px;
  padding: 10px 20px;
  border: 1px solid ${colors.oliveGreen};
  box-shadow: 0 0 7px 2px ${(props) => props.theme.headerShadow};
  background-color: ${(props) => props.theme.backgroundColorNotification};

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const title = styled.h2<{ $isDescr?: string }>`
  margin: 0;
  ${(props) => props.$isDescr && " margin-bottom: 5px;"}
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
`;

export const description = styled.p`
  margin: 0;
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;

export const closeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;
