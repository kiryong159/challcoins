import React from "react";
import { useRecoilState } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { isDarkMode } from "./atom";
import HelmetComponent from "./helmet";
import Router from "./Router";
import { darktheme, lighttheme } from "./theme";

const GlobalStyle = createGlobalStyle`
body {
  font-family: "Nunito", sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  font-weight: 300;
  line-height: 1.2;
}
a {
  text-decoration-line: none;
  color:inherit;
}
* {
  box-sizing: border-box;
}
`;

function App() {
  const [isDark] = useRecoilState(isDarkMode);
  return (
    <>
      <ThemeProvider theme={isDark ? darktheme : lighttheme}>
        <HelmetComponent />
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
