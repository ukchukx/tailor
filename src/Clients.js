import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import ListGroup, { Item } from 'react-bootstrap/ListGroup';
import { Control } from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal, { Header, Footer, Body, Title } from 'react-bootstrap/Modal';
import ACTIONS from './store/actions';

class Clients extends Component {
  static propTypes = {
    saveClient: func.isRequired,
    deleteClient: func.isRequired,
    clients: array.isRequired
  };

  state = {
    searchText: '',
    localClients: this.props.clients,
    form: {
      name: '',
      gender: 'female',
      phone: ''
    },
    showModal: false
  };

  handleSearchTextChange = (e) => {
    const searchText = e.target.value.trim(),
      localClients = this.props.clients.filter(({ name }) => name.includes(searchText));
    
    this.setState({ searchText, localClients });
  }

  openModal = () => this.setState({ showModal: true });

  closeModal = () => this.setState({ showModal: false });

  createClient = () => {
    this.closeModal();
  };

  render() {
    const { 
      state: { searchText, localClients, showModal },
      openModal,
      closeModal,
      createClient,
      handleSearchTextChange,
      renderClientListItem,
      renderEmptyView
    } = this;

    return (
      <Row>
        <Col sm={{ span: 3, offset: 9 }} className="mb-3">
          <Button size="sm" variant="outline-primary" onClick={openModal}>Create client</Button>

          <Modal show={showModal} onHide={closeModal} animation={false}>
            <Header closeButton>
              <Title>Create client</Title>
            </Header>
            <Body>
              Body goes here...
            </Body>
            <Footer>
              <Button size="sm" variant="outline-secondary" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" variant="outline-primary" onClick={createClient}>
                Create
              </Button>
            </Footer>
          </Modal>
        </Col>
        <Col sm={12}>
          <ListGroup variant="flush">
            <Item>
              <Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchTextChange}
              />
            </Item>
            {localClients.length ?  localClients.map(renderClientListItem) : renderEmptyView()}
          </ListGroup>
        </Col>
      </Row>
    );
  }

  renderClientListItem = ({ id, name }) =>
    (
      <Item key={id}>
        {name}
      </Item>
    );

  renderEmptyView = () => 
    (
      <Item>
        <h3 className="text-muted text-center">No clients</h3>
      </Item>
    );
}

const mapStateToProps = ({ clients }) => ({ clients });

const mapDispatchToProps = (dispatch) => ({
  saveClient: (client) => dispatch(ACTIONS.saveClient(client)),
  deleteClient: (id) => dispatch(ACTIONS.deleteClient(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
