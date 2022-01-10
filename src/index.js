import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer, { initialState } from './reducer'
import { StateProvider } from './StateProvider';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
   <Provider store={store}>
      <App />
    </Provider>
  </StateProvider>,
  document.getElementById('root')
);


