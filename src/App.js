import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import store from './store';

import Routes from './routes';
import Header from './components/Header';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
