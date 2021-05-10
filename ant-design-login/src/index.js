import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import App from './App';
import Home from './Home';
import store from './store/store';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/login" component={App} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
