import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = (query, value) => `http://localhost:3000/flights/search/${query}/${value}.json`;

class Seats extends Component {
  constructor(){
    super();
  }

  fetchFlight() {

  }

  render(){
    return(
      <h1>Seats View for {this.props.match.params.flight}</h1>
    );
  }
}

export default Seats;
