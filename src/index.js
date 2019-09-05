import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App'
import docsReducer from './store/reducers/docsReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  docsReducer: docsReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
