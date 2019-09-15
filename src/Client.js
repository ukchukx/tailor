import React, { Component } from 'react';
import { object } from 'prop-types';

class Client extends Component {
  static propTypes = {
    match: object.isRequired
  };

  state = {
    client: {}
  };

  componentDidMount() {
    const { props: { match: { params: { id } } } } = this;

    this.setState({ client: { id } });
  }

  render() {
    const { state: { client: { id } } } = this;
    
    return (<p>Client {id}</p>);
  }
}

export default Client;
