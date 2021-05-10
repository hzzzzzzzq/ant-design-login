import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';

const store = createStore(reducer, applyMiddleware(thunkMiddleware, promise));

export default store;
