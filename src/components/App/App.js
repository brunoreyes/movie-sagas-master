import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList';
import {
  HashRouter as Router,
  Route,
  // Link
} from 'react-router-dom';
import Detail from '../Detail/Detail.js';
import Edit from '../Edit/Edit.js';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <nav>{/* <Link to="/">Home</Link> */}</nav>
          <Route exact path="/" component={MovieList} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/edit/:id" component={Edit} />
        </Router>
      </div>
    );
  }
}

export default App;
