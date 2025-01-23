import styled, { createGlobalStyle } from "styled-components";
import FontBold from "./fonts/SFUIDisplay-Bold.woff2";
import FontThin from "./fonts/SFUIDisplay-Thin.woff2";
import FontLight from "./fonts/SFUIDisplay-Light.woff2";
import FontMedium from "./fonts/SFUIDisplay-Medium.woff2";
import FontRegular from "./fonts/SFUIDisplay-Regular.woff2";
import { colors } from "./constants/colors";

const fontFace = (
  fontFamily: string,
  local: string,
  url: string,
  weight: number
) => {
  return `
    @font-face {
        font-family: ${fontFamily};
        src: local(${local}),
        url(${url}) format('woff2');
        font-weight: ${weight};
        font-display: swap;
        font-style: normal;
    }
    `;
};

export const globalStyle = createGlobalStyle`
    ${fontFace("SFUIDisplay", "SFUIDisplay-Bold", FontBold, 700)}
    ${fontFace("SFUIDisplay", "SFUIDisplay-Thin", FontThin, 100)}
    ${fontFace("SFUIDisplay", "SFUIDisplay-Light", FontLight, 300)}
    ${fontFace("SFUIDisplay", "SFUIDisplay-Medium", FontMedium, 500)}
    ${fontFace("SFUIDisplay", "SFUIDisplay-Regular", FontRegular, 400)}

    html {
        box-sizing: border-box;
    }
    
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }
    
    img {
        max-width: 100%;
        display: block;
        height: auto;
        object-fit: cover;
    }
    
    body {
        margin: 0;
        padding: 0;
        min-width: 320px;
        font-family: 'SFUIDisplay', sans-serif;
        background: ${(props) => props.theme.backgroundBody};
    }

    button {
        padding: 0;
        margin: 0;
        background: transparent;
        border: none;
        cursor: pointer;
    }
`;

export const container = styled.div<{ $flex?: boolean }>`
  display: ${(props) => (props.$flex ? "flex" : "block")};
  ${(props) => (props.$flex ? "align-items: flex-start;" : "")}
  padding: 0 80px;
  max-width: 1440px;
  margin: 0 auto;
`;

export const buttonPrimary = styled.button<{
  $mr?: string;
  $mb?: string;
  $canel?: boolean;
}>`
  margin-right: ${(props) => (props.$mr ? `${props.$mr}px` : "0")};
  margin-bottom: ${(props) => (props.$mb ? `${props.$mb}px` : "0")};
  padding: 19px 50px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) => (props.$canel ? `${colors.punch}` : `${colors.oliveGreen}`)};
  color: ${colors.white};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.$canel ? `${colors.rust}` : `${colors.sycamore}`)};
  }
`;

export const buttonDashed = styled.button<{ $disabled?: boolean; $mr?: string }>`
  margin-right: ${(props) => (props.$mr ? `${props.$mr}px` : "0")};
  padding: 19px 50px;
  border: 2px solid ${(props) => (props.$disabled ? `${colors.silver}` : `${colors.punch}`)};
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.$disabled ? `${colors.silver}` : `${colors.punch}`)};
  transition-property: background-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  ${(props) =>
    props.$disabled
      ? "cursor: not-allowed;"
      : `&:hover {background-color: ${colors.punch}; color: ${colors.white};}`}
`;
