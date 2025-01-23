import styled from "styled-components";
import { IOptions } from "./Select";
import { colors } from "src/constants/colors";

export const list = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
  padding: 10px;
  border-left: 1px solid ${colors.black};
  border-right: 1px solid ${colors.black};
  border-bottom: 1px solid ${colors.black};
  z-index: 10;
`;

export const resultBlock = styled.div<{ $selectOption?: IOptions | null }>`
  display: flex;
  justify-content: ${(props) =>
    props.$selectOption ? "space-between" : "flex-end"};
  align-items: center;
  padding: 15px;
  min-width: 100px;
  min-height: 30px;
  border: 1px solid ${colors.black};
`;

export const arrowBottom = styled.div<{ $isOpenList?: boolean }>`
  width: 10px;
  height: 10px;
  border-top: 3px solid ${colors.black};
  border-right: 3px solid ${colors.black};
  transform: ${(props) =>
    props.$isOpenList ? "rotate(135deg)" : "rotate(-45deg)"};
  transition: transform 0.3s ease-in-out;
`;

export const item = styled.li`
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const wrap = styled.div<{$isOpen: boolean}>`
  position: relative;
  cursor: pointer;
`;
