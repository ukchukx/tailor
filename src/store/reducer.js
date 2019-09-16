import ACTIONS from './actions';

const defaultState = { clients: [] };

const clientReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ACTIONS.Types.LOAD_CLIENTS: 
      return { ...state, clients: payload };

    case ACTIONS.Types.SAVE_CLIENT: {
      const { clients } = state, 
        index = clients.findIndex((c) => c.id === payload.id);

      if (index === -1) {
        clients.push(payload);
      } else {
        clients[index] = payload;
      }

      return { ...state, clients };
    }

    case ACTIONS.Types.DELETE_CLIENT: 
      return { ...state, clients: state.clients.filter((c) => c.id !== payload) };

    default:
      return state;
  }
};

export default clientReducer;
