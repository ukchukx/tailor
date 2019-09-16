import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card, { Body, Title } from 'react-bootstrap/Card';
import ACTIONS from './store/actions';

class Client extends Component {
  static propTypes = {
    match: object.isRequired,
    client: object.isRequired
  };

  render() {
    const { props: { client: { name, gender, phone }, history } } = this,
      buttonStyles = { padding: 0, border: 0, backgroundColor: 'transparent' };

    return (
      <Row>
        <Col sm={12}>
        <Card>
          <Body>
            <Title>
              <button onClick={_ => history.replace('/clients')} style={buttonStyles}>&larr;</button>
              &emsp;
              {name}
            </Title>
            <p className="text-muted">Phone: {phone}</p>
            <p className="text-muted">Gender: {gender}</p>
          </Body>
        </Card>
        </Col>
        <Col sm={12} className="mt-3">
          <Card>
            <Body>
              Measurements will go here...
            </Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ clients }, { match: { params: { id } } }) => 
  ({ client: clients.find((c) => c.id === parseInt(id)) });

const mapDispatchToProps = (dispatch) => ({
  saveClient: (client) => dispatch(ACTIONS.saveClient(client))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client);
