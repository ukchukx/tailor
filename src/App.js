import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar, { Brand } from 'react-bootstrap/Navbar';
import Routes from './Routes';
import initStore from './store';

/* eslint-disable react/prop-types */
const App = () => (
  <Provider store={initStore()}>
    <HashRouter>
      <div className="container-fluid">
        <header>
          <Navbar collapseOnSelect expand="lg">
            <Brand as={Link} to="/clients">Tailor</Brand>
          </Navbar>
        </header>
        <main style={{ marginTop: '10px' }}>
          <Routes />
        </main>
      </div>
    </HashRouter>
  </Provider>
);

export default App;
