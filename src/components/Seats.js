import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = (id) => `http://localhost:3000/flights/${id}.json`;

class Seats extends Component {
  constructor(props){
    super();
    this.state = {flight : {"id":0,"flight_number":"test","origin":"test","destination":"test","date":"01-01-0000","airplane":"Aaaaa A000-000","rows":1,"columns":1,"booked_seats":[["1","1"]]}};
    this.createTable = this.createTable.bind(this);
    this.fetchFlight(props.match.params.flight);
  }

  fetchFlight(id) {
    const url = SERVER_URL(id);
    axios.get(url).then( results => {
      this.setState({ flight : results.data.flights[0] });
      console.log(results.data.flights[0]);
    });
  }

  arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(let i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

  createTable = () => {
    const table = [];
    for (let i = 1; i <=this.state.flight.rows; i++) {
      const row = [];
      for (let j = 1; j <= this.state.flight.columns; j++) {
        let booked = false;
        for (let k = 0; k < this.state.flight.booked_seats.length; k++) {
          booked = this.arraysEqual([`${i}`,`${j}`], this.state.flight.booked_seats[k]);
        }
        if (!booked) {
          row.push(<td><span>Empty</span><a href="#">{`R:${i},C${j}`}</a></td>);
        }
        if (booked) {
          row.push(<td><span>Booked</span>{`R:${i},C${j}`}</td>);
          console.log(booked);
        }

      }
      table.push(<tr>{row}</tr>);
    }

    return table;
  }

  render(){

    return (
      <table>
        { this.createTable() }
      </table>
    );
  }
}

export default Seats;
