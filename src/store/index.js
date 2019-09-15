import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';

const initStore = () => {
  const initialState = {
    clients: []
  };

  return createStore(reducer, initialState, applyMiddleware(logger));
};

export default initStore;
