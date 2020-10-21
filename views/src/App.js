import React, { Component } from 'react';
import './App.css';
// import menu from '../../uploads/2020-09-25T01-45-07.223Zmenu-1.jpg';

import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { response } from '../../app';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';

import ProductEdit from './components/ProductEdit';
import ProductList from './components/ProductList';
import Cart from './components/shopping/Cart'
import NavBar from './components/NavBar/NavBar'
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <br />
          <Route path="/" exact component={ProductList} />
          <Route path="/edit/:id" component={ProductEdit} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/cart" component={Cart} />
        </div>
      </Router>
    );
  }
}
