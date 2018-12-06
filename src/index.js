import React from 'react';
import ReactDOM from 'react-dom';


import { Route, Link, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combineReducers from './reducers';
import  FinalResult  from './components/FinalResult';

import './index.css';
import App from './App';

const store = createStore(combineReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={store}>
        <BrowserRouter >
            <Switch>
                <Route exact path = "/" component={App}/>
                <Route exact path = "/finalresult" component={FinalResult}/>
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
