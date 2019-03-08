import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, hashHistory } from 'react-router';

import AppRouter from './appRouter.js';
import Master from './containers/masterContainer/masterContainers.jsx';

ReactDOM.render(
  <Router history = { browserHistory } >
    { AppRouter }
  </Router>
, document.getElementById('app'));
