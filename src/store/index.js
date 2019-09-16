import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';
import ACTIONS from './actions';

const initStore = () => {
  const store = createStore(reducer, { clients: [] }, 
    process.env.NODE_ENV === 'development' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk));
  
  store.dispatch(ACTIONS.loadClients());

  return store;
};

export default initStore;
