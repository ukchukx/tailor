import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';
import ACTIONS from './actions';

const initStore = () => {
  const store = createStore(reducer, { clients: [] }, applyMiddleware(thunk, logger));
  
  store.dispatch(ACTIONS.loadClients());

  return store;
};

export default initStore;
