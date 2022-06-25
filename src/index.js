import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import './styles/styles.css';
import { Provider } from 'react-redux';
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);

