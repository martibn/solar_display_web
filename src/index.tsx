import PowerContainer from "./components/PowerContainer";
import CurrentPowerChart from "./components/CurrentPowerChart";
import * as React from "react";
import ReactDOM from 'react-dom';

import "./index.css";
import axios from "axios";

axios.defaults.baseURL= window.location.origin;

ReactDOM.render(
  <div>
    <PowerContainer initialVal = "Loading..." />

    <CurrentPowerChart />
  </div>,
  document.querySelector("root")
);