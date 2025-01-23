import styled from "styled-components";
import Select from "../../../ui-components/Select/Select";
import { colors } from "src/constants/colors";

export const title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 33px;
  color: ${(props) => props.theme.textColor};
`;

export const select = styled(Select)`
  & .result {
    border: none;
    padding: 19px 15px;
    background: ${(props) => props.theme.backgroundStatistics};
    min-width: 370px;
    min-height: 55px;
    font-weight: 400;
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
  }

  & .list {
    border: none;
    padding: 0;
    background: ${(props) => props.theme.backgroundStatistics};
  }

  & .item {
    padding: 19px 15px;
    font-weight: 400;
    font-size: 16px;
    color: ${(props) => props.theme.textColor};

    &:first-child {
      border-top: 1px solid ${colors.alto};
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${colors.alto};
    }
  }

  & .arrow {
    border-width: 2px;
    border-color: ${colors.rust};
  }
`;

export const wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
