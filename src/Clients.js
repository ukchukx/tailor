import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import ListGroup, { Item } from 'react-bootstrap/ListGroup';
import { Control, Label } from 'react-bootstrap/Form';
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
    showModal: false,
    nameRef: React.createRef()
  };

  handleSearchTextChange = (e) => {
    const searchText = e.target.value.trim(),
      localClients = this.props.clients.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()));
    
    this.setState({ searchText, localClients });
  }

  openModal = () => this.setState({ showModal: true }, () => this.state.nameRef.current.focus());

  closeModal = () => this.setState({ showModal: false, form: { name: '', gender: 'female', phone: '' } });

  createClient = () => {
    this.props.saveClient(this.state.form);
    this.closeModal();
  };

  isFormValid = () => {
    const { state: { form: { gender, name, phone } }, props: { clients } } = this;

    return !!name && 
      /^\d{7,11}$/.test(phone.trim()) && 
      ['male', 'female'].includes(gender) && 
      clients.every((c) => c.phone !== phone.trim());
  };

  updateForm = (e) => this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });

  handleDeleteClient = (id) => {
    const { state: { localClients } } = this;

    if (! confirm('Are you sure?')) return; // eslint-disable-line no-restricted-globals

    this.props.deleteClient(id);

    this.setState({ localClients: localClients.filter((c) => c.id !== id) });
  };

  viewClient = (id) => this.props.history.push(`/clients/${id}`);

  render() {
    const { 
      state: { searchText, localClients, showModal, form, nameRef },
      openModal,
      closeModal,
      createClient,
      handleSearchTextChange,
      renderClientListItem,
      renderEmptyView,
      updateForm,
      isFormValid
    } = this;

    return (
      <Row>
        <Col sm={3} className="mb-3">
          <Button size="sm" variant="outline-primary" onClick={openModal}>Create client</Button>

          <Modal show={showModal} onHide={closeModal} animation={false}>
            <Header closeButton>
              <Title>Create client</Title>
            </Header>
            <Body>
              <Label className="mt-2">Name</Label>
              <Control ref={nameRef} name="name" type="text" placeholder="Name" value={form.name} onChange={updateForm} />

              <Label className="mt-2">Phone number</Label>
              <Control name="phone" type="text" placeholder="Phone number" value={form.phone} onChange={updateForm} />

              <Label className="mt-2">Gender</Label>
              <Control name="gender" as="select" value={form.gender} onChange={updateForm}>
                <option disabled>Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Control>
            </Body>
            <Footer>
              <Button size="sm" variant="outline-secondary" onClick={closeModal}>
                Close
              </Button>
              <Button disabled={!isFormValid()} size="sm" variant="outline-primary" onClick={createClient}>
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
      <Item key={id} className="d-flex justify-content-between align-items-center">
        <span onClick={_ => this.viewClient(id)}>{name}</span>
        <button onClick={_ => this.handleDeleteClient(id)} className="close">&times;</button>
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
