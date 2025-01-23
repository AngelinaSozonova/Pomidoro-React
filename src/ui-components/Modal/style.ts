import { colors } from "src/constants/colors";
import styled from "styled-components";

export const modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

export const modalBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background: ${colors.white};
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  text-align: left;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const buttonClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const title = styled.h2`
  margin: 0;
  margin-bottom: 10px;
`;

export const wrapFooter = styled.div`
  display: flex;
  justify-content: end;
`;

export const buttonFooter = styled.button`
  padding: 6px 8px;
  font-size: 16px;
  background-color: ${colors.oliveGreen};
  color: ${colors.white};
  transition: background-color 0.2s ease-in-out;

  &:not(:last-child) {
    margin-right: 10px;
  } 

  &:hover {
    background-color: ${colors.sycamore};
  }
`;
