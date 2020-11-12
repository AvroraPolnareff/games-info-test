import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app/App";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import darkTheme from "./app/theme";

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 14px;
    line-height: normal;
    font-weight: 400;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,
    Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    letter-spacing: 0;
    text-rendering: optimizeLegibility;
}

`

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle/>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  window.document.getElementById('root')
)
window.document.getElementById('root').innerText = "lol"
console.log("lol")
