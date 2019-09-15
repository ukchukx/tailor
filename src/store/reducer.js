import ACTIONS from './actions';

const defaultState = { clients: [] };

const clientReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ACTIONS.Types.SAVE_CLIENT: {
      const { clients } = state;

      if (!payload.id) {
        payload.id = clients.length + 1;
        payload.measurements = [];
        clients.push(payload);
      } else {
        clients.splice(payload.id - 1, 1, payload);
      }

      return { ...state, clients };
    }

    case ACTIONS.Types.DELETE_CLIENT: {
      const { clients } = state;

      clients.splice(payload - 1, 1);

      return { ...state, clients };
    }

    default:
      return state;
  }
};

export default clientReducer;
