import { colors } from "src/constants/colors";
import styled from "styled-components";

export const item = styled.li`
  display: flex;
  justify-content: space-between;
  max-width: 370px;
  padding: 15px 0;
  padding-right: 2px;
  border-bottom: 1px solid ${colors.mercuryE4};

  &:first-child {
    border-top: 1px solid ${colors.mercuryE4};
  }
`;

export const info = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 10px;
`;

export const quantityPomidoro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border: 1px solid ${colors.silver};
  border-radius: 50%;
  font-size: 16px;
  font-weight: 300;
  color:  ${(props) => props.theme.textColor};
`;

export const nameTask = styled.span`
  font-size: 16px;
  font-weight: 300;
  color:  ${(props) => props.theme.textColor};
`;

export const inputEditNameTask = styled.input`
  border: none;
  width: 100%;
  padding: 4px 5px;
  font-family: "SFUIDisplay";
  font-size: 16px;
  font-weight: 300;
  line-height: 17px;
  background-color: ${colors.wildSand};
  color: ${colors.mineShaft};

  &:focus-visible {
    outline: none;
  }
`;

export const dropdownList = styled.ul`
  position: absolute;
  padding: 0;
  list-style-type: none;
  padding: 5px 0;
  background-color: ${(props) => props.theme.backgroundDropdown};
  border: 1px solid ${colors.silver};

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 45%;
    bottom: 100%;
    border: 10px solid transparent;
    border-bottom: 10px solid ${colors.silver};
  }

  &::after {
    border-bottom: 10px solid ${(props) => props.theme.backgroundDropdown};
    bottom: 99%;
  }
`;

export const dropdownItem = styled.li<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  padding: 9px 15px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    ${(props) => (props.$disabled ? "" : `background-color: ${props.theme.hoverItemDropdown};`)}
  }
`;

export const nameCommand = styled.span`
  font-size: 16px;
  font-weight: 300;
  color: ${colors.dustyGray};
`;
