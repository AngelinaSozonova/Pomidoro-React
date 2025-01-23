import { colors } from "src/constants/colors";
import styled from "styled-components";

export const list = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  margin-bottom: 19px;

  & .item-enter {
    opacity: 0;
  }

  & .item-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  
  & .item-exit {
    opacity: 1;
  }
  
  & .item-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`;

export const textDeleteTask = styled.h2`
  margin: 0;
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: 400;
  color: ${colors.mineShaft};
`;

export const blockButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const buttonCanel = styled.button`
  border-bottom: 1px solid ${colors.mineShaft};
  font-size: 16px;
  font-weight: 300;
  color: ${colors.mineShaft};
`;
