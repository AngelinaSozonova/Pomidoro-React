import { Link } from "react-router-dom";
import styled from "styled-components";
import Switch from "../../ui-components/Switch/Switch";
import { colors } from "src/constants/colors";

export const main = styled.div`
  padding: 15px 0;
  box-shadow: 0px 10px 63px 0px ${(props) => props.theme.headerShadow};
`;

export const header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const linkStatistics = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration-line: none;
  color: ${colors.punch};
`;

export const theme = styled(Switch)`
  margin-right: 10px;

  & .label {
    color: ${(props) => props.theme.textColor};
  }

  & .checkbox:before {
    background: ${colors.punch};
  }

  & .checkbox:checked {
    background: ${colors.punch};
  }

  & .checkbox:checked:before {
    background: ${colors.white};
  }
`
