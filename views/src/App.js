import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', price: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.name + this.state.price);
    event.preventDefault();
    const file = document.getElementById('inputGroupFile01').files;
    const formData = new FormData();

    formData.append('img', file[0]);

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData,
    }).then((r) => {
      console.log(r);
    });
    console.log(file[0]);
    // document
    //   .getElementById('img')
    //   .setAttribute('src', `http://localhost:5000/${file[0].name}`);
  }
  Post = (e) => {
    e.preventDefault();
    const file = document.getElementById('inputGroupFile01').files;
    const formData = new FormData();

    formData.append('img', file[0]);

    fetch('http://localhost:5000/products', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: formData,
    }).then((r) => {
      console.log(r);
    });
    console.log(file[0]);
    // document
    //   .getElementById('img')
    //   .setAttribute('src', `http://localhost:5000/${file[0].name}`);
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">Product upload</h1>
            <p className="lead">
              This is a simple application to upload and retrieve images from a
              database
            </p>
            <hr className="my-4" />
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Product:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                name="price"
                type="number"
                value={this.state.price}
                onChange={this.handleInputChange}
              />
            </label>
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        {/* <img
          id="img"
          style={{
            display: 'block',
          }}
        ></img> */}
        {/* <img src={`/uploads/${img.img.path}`} /> */}
      </div>
    );
  }
}
{
  /* <div>
  <h3>Create New Product</h3>
  <form onSubmit={this.onSubmit}>
    <div className="form-group">
      <label>Username: </label>
      <input
        type="text"
        required
        className="form-control"
        value={this.state.username}
        onChange={this.onChangeUsername}
      />
    </div>
    <div className="form-group">
      <input type="submit" value="Create User" className="btn btn-primary" />
    </div>
  </form>
</div>; */
}
