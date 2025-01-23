import { colors } from "src/constants/colors";
import styled from "styled-components";

export const block = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
`;

export const InputNameTask = styled.input<{ $error?: boolean }>`
  border: none;
  background-color: ${(props) => props.theme.backgroundInputTask};
  min-height: 55px;
  min-width: 370px;
  padding: 19px 15px;
  margin-bottom: 25px;
  border: 1px solid ${(props) => (props.$error ? `${colors.scarlet}` : "transperent")};
  font-size: 16px;
  font-weight: 300;
  line-height: 17px;
  color: ${(props) => props.theme.textColorInputTask};

  &::placeholder {
    color: ${(props) => props.theme.placeholderInputTask};
  }

  &:focus-visible {
    outline: none;
  }
`;

export const buttonAddTask = styled.button`
  padding: 19px 50px;
  background-color: ${colors.oliveGreen};
  color: ${colors.white};
`;

export const textError = styled.span`
  position: absolute;
  top: -21px;
  font-size: 16px;
  color: ${colors.scarlet};
`;

export const time = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: ${colors.dustyGray};
`;
