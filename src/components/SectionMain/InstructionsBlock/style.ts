import { colors } from "src/constants/colors";
import styled from "styled-components";

export const title = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: ${(props) => props.theme.textColor};
`;

export const instructionsList = styled.ul`
  padding-left: 19px;
`;

export const instructionsItem = styled.li`
  font-size: 16px;
  line-height: 33px;
  color:  ${(props) => props.theme.textColor};

  &::marker {
    color: ${colors.rust};
  }
`;
