import React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';
import Home from './containers/homeContainer/homeContainers.jsx';
import Detail from './containers/detailContainer/detailContainers.jsx';
import List from './containers/listContainer/listContainers.jsx';
import Master from './containers/masterContainer/masterContainers.jsx';

const AppRouter = (
  <Route path = '/' component = { Master }>
    <IndexRoute component = { Home } />
    <Route path = "index" component = { Home } />
    <Route path = "detail" component = { Detail } />
    <Route path = "list" component = { List } />
  </Route>
);

export default AppRouter;
