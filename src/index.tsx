import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { App } from 'modules/app/app.component';
import reportWebVitals from 'other/reportWebVitals';

import { StoreProvider } from 'easy-peasy';
import { store } from 'store/store';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

import {Settings} from "luxon"
Settings.defaultLocale = "fr";

const themeOptions = {}
const theme = createMuiTheme(themeOptions);


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
