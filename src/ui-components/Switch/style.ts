import { colors } from "src/constants/colors";
import styled from "styled-components";

export const wrap = styled.div`
  display: flex;
  align-items: center;
`

export const label = styled.label`
  margin-right: 10px;
`

export const checkbox = styled.input<{$size?: 'small' | 'middle' | 'large'}>`
  position: relative;
  width: ${(props) => props.$size === 'small' ? '40px' : props.$size === 'middle' ? '60px' : '80px'};
  height: ${(props) => props.$size === 'small' ? '20px' : props.$size === 'middle' ? '30px' : '40px'};
  -webkit-appearance: none;
  outline: none;
  background: ${colors.silverC6};
  border-radius: 20px;
  transition: 0.5s;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:checked {
    background: ${colors.malachite};
  }

  &:before {
    content: "";
    position: absolute;
    width: ${(props) => props.$size === 'small' ? '20px' : props.$size === 'middle' ? '30px' : '40px'};
    height: ${(props) => props.$size === 'small' ? '20px' : props.$size === 'middle' ? '30px' : '40px'};
    border-radius: 20px;
    top: 0;
    left: 0;
    background: ${colors.white};
    transition: 0.5s;
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:checked:before {
    left: ${(props) => props.$size === 'small' ? '20px' : props.$size === 'middle' ? '30px' : '40px'};
  }
`;
