import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";

import { ReactComponent as Rebels } from "../images/rebels.svg";
import { ReactComponent as Empire } from "../images/empire.svg";

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.body};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.25rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: fixed;
  /* position: relative; */
  width: 8rem;
  height: 4rem;

  svg {
    height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;

    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(0)" : "translateY(100px)"};
    }

    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";
  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <Rebels />
      <Empire />
    </ToggleContainer>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;
