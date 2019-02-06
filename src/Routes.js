import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Search from './components/Search';
import Seats from './components/Seats';


const Routes = (
  <Router>
    <div>
    <Route exact path="/" component={ Search } />
    <Route path="/seats/:flight" component={ Seats } />
    </div>
  </Router>
);

export default Routes;
