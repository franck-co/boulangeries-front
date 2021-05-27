"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
//import './index.css';
var app_component_1 = require("modules/app/app.component");
var reportWebVitals_1 = require("other/reportWebVitals");
var easy_peasy_1 = require("easy-peasy");
var store_1 = require("store/store");
var core_1 = require("@material-ui/core");
var themeOptions = {};
var theme = core_1.createMuiTheme(themeOptions);
react_dom_1["default"].render(<core_1.ThemeProvider theme={theme}>
    <core_1.CssBaseline />
    <react_1["default"].StrictMode>
      <easy_peasy_1.StoreProvider store={store_1.store}>
        <app_component_1.App />
      </easy_peasy_1.StoreProvider>
    </react_1["default"].StrictMode>
  </core_1.ThemeProvider>, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals_1["default"]();
