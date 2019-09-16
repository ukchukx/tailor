import React, { Component } from 'react';
import { func, object } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card, { Body, Link, Text, Title } from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal, { Header, Footer, Body as ModalBody, Title as ModalTitle } from 'react-bootstrap/Modal';
import { Control, Label } from 'react-bootstrap/Form';
import ListGroup, { Item } from 'react-bootstrap/ListGroup';

class Measurements extends Component {
  static propTypes = {
    client: object.isRequired,
    deleteMeasurement: func.isRequired,
    saveMeasurement: func.isRequired
  };

  state = {
    form: {},
    showModal: false,
    index: -1
  };

  openModal = (index = -1) => 
    this.setState({
      form: index !== -1 ? 
        { ...this.props.client.measurements[index] } : 
        { unit: 'cm', key: 'Neck', value: 0 },
      showModal: true,
      index
    });

  closeModal = () => this.setState({ showModal: false, form: {}, index: -1 });

  save = () => {
    this.props.saveMeasurement(this.state.form, this.state.index);
    this.closeModal();
  };

  remove = (index) => {
    if (!confirm('Are you sure?')) return; // eslint-disable-line no-restricted-globals

    this.props.deleteMeasurement(index);
    this.forceUpdate();
  }

  isFormValid = () => {
    const { state: { form: { unit, key, value } } } = this;

    return !!unit && !!key && !!value;;
  };

  updateForm = (e) => this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });

  render() {
    const { 
      props: { client: { measurements } },
      state: { showModal, form, index },
      openModal,
      closeModal,
      updateForm,
      save,
      isFormValid,
      measurementOptions,
      renderMeasurement,
      renderEmptyView
    } = this;

    return (
      <>
        <Button size="sm" variant="outline-primary" onClick={_ => openModal(-1)}>Add</Button>

        <Modal show={showModal} onHide={closeModal} animation={false}>
          <Header closeButton>
            <ModalTitle>{index === -1 ? 'Create' : 'Update'} measurement</ModalTitle>
          </Header>
          <ModalBody>
            <Label className="mt-2">Measurement</Label>
            <Control name="key" as="select" value={form.key} onChange={updateForm}>
              <option disabled>Select measurement</option>
              {measurementOptions().map((a, i) => <option key={i} value={a}>{a}</option>)}
            </Control>

            <Label className="mt-2">Value</Label>
            <Control name="value" type="number" value={form.value} onChange={updateForm} />

            <Label className="mt-2">Unit</Label>
            <Control name="unit" as="select" value={form.unit} onChange={updateForm}>
              <option disabled>Select unit</option>
              <option value="in">Inch</option>
              <option value="cm">Centimeter</option>
              <option value="ft">Foot</option>
            </Control>
          </ModalBody>
          <Footer>
            <Button size="sm" variant="outline-secondary" onClick={closeModal}>
              Close
            </Button>
            <Button disabled={!isFormValid()} size="sm" variant="outline-primary" onClick={save}>
              Save
            </Button>
          </Footer>
        </Modal>
        <Row className="mt-3">
          <Col>
            <ListGroup variant="flush">
            {measurements.length ?  measurements.map((m, i) => renderMeasurement(m, i)) : renderEmptyView()}
            </ListGroup>
          </Col>
        </Row>
      </>
    );
  }

  renderMeasurement = ({ key, value, unit }, index) => 
  (
    <Card className="mb-2" key={index}>
      <Body>
        <Title>{key}</Title>
        <Text>
          {value} {unit}.
        </Text>
        <Link onClick={_ => this.openModal(index)}>Update</Link>
        <Link onClick={_ => this.remove(index)}>Delete</Link>
      </Body>
    </Card>
  );

  renderEmptyView = () => 
    (
      <Item>
        <h3 className="text-muted text-center">No measurements</h3>
      </Item>
    );

  measurementOptions = () =>
    [
      'Neck',
      'Chest',
      'Waist',
      'Seat',
      'Shirt length',
      'Shoulder width',
      'Arm length',
      'Wrist',
      'Biceps',
      'Hip',
      'Inseam',
      'Sleeve length (jacket)'
    ];
}

export default Measurements;
