import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Search from './Search'
import Routes from './../Routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
