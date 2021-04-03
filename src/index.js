import React from 'react';
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burguerBuilderReducer from "./store/reducers/burguerBuilder";
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


const rootReducer = combineReducers({
  burguerBuilder: burguerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
