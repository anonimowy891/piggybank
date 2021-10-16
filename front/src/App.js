import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Sign from "./Sign";
import Dashboard from "./Dashboard";

export const App = () => {

  const show = (sessionStorage.getItem('Passphrase'));

  

  return (
  <Fragment>
  <Router>
        {!show ? (
          <div>
            <Sign />
          </div>
        ) : (
          <div>
            <Dashboard />
          </div>
        )}
  </Router>
  </Fragment>
  )}

export default App;
