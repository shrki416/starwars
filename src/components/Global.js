import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    padding: 0;
    margin: 0;
    font-family: Starjedi, BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
    font-size: 12px;
  }

  form, .mb {
    margin-bottom: 2.5em;
  }

  .header, h5 {
    font-family: Starjedi;
    letter-spacing: 0.25em;
  }

  .App {
    text-align: center;
  }

  #pagination {
    font-family: Starjedi;
    font-size: 1.25em;
    background: ${({ theme }) => theme.pagination};
  }

  #swFont {
    font-family: Starjedi;
    font-size: 1.25em;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.text};
  }

  a {
    color: ${({ theme }) => theme.text};
}`;
