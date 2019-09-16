import { deleteClient as dbDeleteClient, saveClient as dbSaveClient, getClients, getClient } from '../db';

const Types = {
  LOAD_CLIENTS: 'LOAD_CLIENTS',
  SAVE_CLIENT: 'SAVE_CLIENT',
  DELETE_CLIENT: 'DELETE_CLIENT'
};

const loadClients = () => (dispatch) => getClients()
  .then((payload) => dispatch({ type: Types.LOAD_CLIENTS, payload }));

const saveClient = (client) => (dispatch) => dbSaveClient(client)
  .then((id) => getClient(id)
    .then((payload) => dispatch({ type: Types.SAVE_CLIENT, payload })));

const deleteClient = (id) => (dispatch) => dbDeleteClient(id)
  .then(() => dispatch({ type: Types.DELETE_CLIENT, payload: id }));

export default {
  loadClients,
  saveClient,
  deleteClient,
  Types
};
