import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app/App";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import darkTheme from "./app/theme";
import {Provider} from "react-redux";
import {store} from "./store/store";

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 14px;
    line-height: normal;
    font-weight: 400;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,
    Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
    letter-spacing: 0;
    text-rendering: optimizeLegibility;
    color: ${({theme}) => theme.colors.text};
    background-color: ${({theme}) => theme.colors.back};
}

`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle/>
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  window.document.getElementById('root')
)
