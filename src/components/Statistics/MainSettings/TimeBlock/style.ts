import styled from "styled-components";

export const data = styled.div`
  padding: 25px;
  min-height: 260px;
  margin-bottom: 32px;
  background: ${(props) => props.theme.backgroundStatistics};
`;

export const dayWeek = styled.span`
  margin-bottom: 14px;
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
`;

export const dataDescr = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.textColor};
`;