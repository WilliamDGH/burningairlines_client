import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



  const SERVER_URL = (query, value) => `http://localhost:3000/flights/search/${query}/${value}.json`;

class Search extends Component {
  constructor(){
    super();
    this.state = { flights : [] };
    this.fetchFlights = this.fetchFlights.bind(this);
  }

  fetchFlights(){
    axios.get(SERVER_URL("origin", "Sydney")).then( results => {this.setState({ flights : results.data.flights });
    console.log(results);});
  }

  render(){
    return(
      <div>
        <Form onSubmit={ this.fetchFlights }/>
        <FlightsIndex flights={ this.state.flights }/>
      </div>
    );
  }
}

class FlightsIndex extends Component {
  render(){
    return(
      <table>
      <tbody>
          <tr>
          <th>Date</th>
          <th>Flight</th>
          <th>From</th>
          <th>To</th>
          <th>Airplane</th>
          <th>Seats</th>
          <th>Book</th>
          </tr>
        { this.props.flights.map( f =>
          <tr key={f.id}>
          <td>{f.date}</td>
          <td>{f.flight_number}</td>
          <td>{f.origin}</td>
          <td>{f.destination}</td>
          <td>{f.airplane}</td>
          <td>{f.rows * f.columns - f.booked_seats.length}</td>
          <td><Link to={`/seats/${f.id}`}>Book</Link></td>
          </tr>
         ) }
      </tbody>
      </table>
    );
  }
}

class Form extends Component {
  constructor(){
    super();
    this.state = { origin : "", destination : "" };
    this._handleChangeOrigin = this._handleChangeOrigin.bind(this);
    this._handleChangeDestination = this._handleChangeDestination.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
  }

  _handleChangeOrigin(e){
    this.setState({origin : e.target.value});
  }

  _handleChangeDestination(e){
    this.setState({destination : e.target.value});
  }

  _handleSearch (e) {
    e.preventDefault();
    this.props.onSubmit("origin", this.state.origin);
  }

  render(){
    return(
      <form onSubmit={this._handleSearch}>
      <input placeholder="from" name="origin" onChange={ this._handleChangeOrigin } vaule={ this.state.origin } />
      <input placeholder="to" name="destination" onChange={ this._handleChangeDestination } vaule={ this.state.destination } />
      <input type="submit" value="Search" />
      </form>
    );
  }
}

export default Search;
