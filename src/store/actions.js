const Types = {
  SAVE_CLIENT: 'SAVE_CLIENT',
  DELETE_CLIENT: 'DELETE_CLIENT'
};

const saveClient = (client) => ({ type: Types.SAVE_CLIENT, payload: client });
const deleteClient = (id) => ({ type: Types.DELETE_CLIENT, payload: id });

export default {
  saveClient,
  deleteClient,
  Types
};
