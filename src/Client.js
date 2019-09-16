import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, array } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card, { Body, Title } from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal, { Header, Footer, Body as ModalBody, Title as ModalTitle } from 'react-bootstrap/Modal';
import { Control, Label } from 'react-bootstrap/Form';
import ACTIONS from './store/actions';
import Measurements from './Measurements';

class Client extends Component {
  static propTypes = {
    match: object.isRequired,
    client: object.isRequired,
    clients: array.isRequired
  };

  state = {
    clientForm: {},
    showClientModal: false,
    clientNameRef: React.createRef()
  };

  openClientUpdateModal = () => {
    const updatedState = {
      clientForm: { ...this.props.client },
      showClientModal: true
    };

    this.setState(updatedState, () => this.state.clientNameRef.current.focus());
  };

  closeClientModal = () => this.setState({ showClientModal: false, clientForm: {} });

  updateClient = () => {
    const form = this.state.clientForm;
    form.phone = form.phone.trim();
    form.name = form.name.trim();

    this.props.saveClient(form);
    this.closeClientModal();
  };

  isClientFormValid = () => {
    const { state: { clientForm: { gender, id, name, phone } }, props: { clients } } = this;

    return !!name && 
      /^\d{7,11}$/.test(phone.trim()) && 
      ['male', 'female'].includes(gender) && 
      clients.filter((c) => c.id !== id).every((c) => c.phone !== phone.trim());
  };

  updateClientForm = (e) => this.setState({ clientForm: { ...this.state.clientForm, [e.target.name]: e.target.value } });

  deleteMeasurement = (index) => {
    const client = this.props.client;
    client.measurements.splice(index, 1);
    this.props.saveClient(client);
  };

  saveMeasurement = (m, index) => {
    const client = this.props.client;

    if (index !== -1) {
      client.measurements[index] = m;
    } else {
      client.measurements.push(m);
    }

    this.props.saveClient(client);
  };

  render() {
    const { 
      props: { client, history },
      state: { showClientModal, clientForm, clientNameRef },
      openClientUpdateModal,
      closeClientModal,
      updateClientForm,
      updateClient,
      isClientFormValid,
      saveMeasurement,
      deleteMeasurement
    } = this,
      buttonStyles = { padding: 0, border: 0, backgroundColor: 'transparent' };

    return (
      <Row>
        <Col sm={12}>
        <Card>
          <Body>
            <Title>
              <button onClick={_ => history.replace('/clients')} style={buttonStyles}>&larr;</button>
              &emsp;
              {client.name}
            </Title>
            <p className="text-muted">Phone: {client.phone}</p>
            <p className="text-muted">Gender: {client.gender}</p>

            <Button size="sm" variant="outline-primary" onClick={openClientUpdateModal}>Update</Button>

            <Modal show={showClientModal} onHide={closeClientModal} animation={false}>
              <Header closeButton>
                <ModalTitle>Update {client.name}</ModalTitle>
              </Header>
              <ModalBody>
                <Label className="mt-2">Name</Label>
                <Control ref={clientNameRef} name="name" type="text" placeholder="Name" value={clientForm.name} onChange={updateClientForm} />

                <Label className="mt-2">Phone number</Label>
                <Control name="phone" type="text" placeholder="Phone number" value={clientForm.phone} onChange={updateClientForm} />

                <Label className="mt-2">Gender</Label>
                <Control name="gender" as="select" value={clientForm.gender} onChange={updateClientForm}>
                  <option disabled>Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </Control>
              </ModalBody>
              <Footer>
                <Button size="sm" variant="outline-secondary" onClick={closeClientModal}>
                  Close
                </Button>
                <Button disabled={!isClientFormValid()} size="sm" variant="outline-primary" onClick={updateClient}>
                  Update
                </Button>
              </Footer>
            </Modal>
          </Body>
        </Card>
        </Col>
        <Col sm={12} className="mt-3">
          <Card>
            <Body>
              <Measurements 
                client={client}
                deleteMeasurement={deleteMeasurement}
                saveMeasurement={saveMeasurement}
                />
            </Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ clients }, { match: { params: { id } } }) => 
  ({ client: clients.find((c) => c.id === parseInt(id)), clients });

const mapDispatchToProps = (dispatch) => ({
  saveClient: (client) => dispatch(ACTIONS.saveClient(client))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client);
