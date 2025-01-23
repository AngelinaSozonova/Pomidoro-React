import styled from "styled-components";
import { typeButton } from "./Button";
import { colors } from "src/constants/colors";

export const button = styled.button<{ type: typeButton }>`
  padding: 19px 50px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid ${(props) =>
    props.type === "default" ? `${colors.rust}` : "transperent"};
  background-color: ${(props) =>
    props.type === "primary" ? `${colors.oliveGreen}` : "transperent"};
  color: ${(props) => (props.type === "default" ? `${colors.rust}` : `${colors.white}`)};
`;
