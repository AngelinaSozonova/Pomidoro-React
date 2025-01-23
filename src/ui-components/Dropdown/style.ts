import styled from "styled-components";

export const list = styled.div<{$widthButton?: number, $widthList?: number, $heightButton?: number, $placement?: string}>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  ${(props) => props.$placement === 'left' ? 'left: 0' : props.$placement === 'center' ? `right: ${props.$widthButton && props.$widthList ? `${(props.$widthList / 2) - (props.$widthButton / 2)}px` : 0}; top: ${props.$heightButton ? `${props.$heightButton}px` : 0};` : ''}
`;

export const listContainer = styled.div`
  position: absolute;
`;

