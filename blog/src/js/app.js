import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, hashHistory } from 'react-router';

/* react-redux */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducer from './reducers';

import AppRouter from './appRouter.js';
import Master from './containers/masterContainer/masterContainers.jsx';

const middleware = process.env.NODE_ENV === 'production'
?[ thunk ] :[ thunk, createLogger() ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

const appHistory = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store = { store }>
    <Router history = { appHistory } >
      <div>
        { AppRouter }
      </div>
    </Router>
  </Provider>
, document.getElementById('app'));
