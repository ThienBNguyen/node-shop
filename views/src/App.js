import React, { Component } from 'react';
import './App.css';
// import menu from '../../uploads/2020-09-25T01-45-07.223Zmenu-1.jpg';
import axios from 'axios';
// import { response } from '../../app';

export default class App extends Component {
  state = {
    productImage: null,
    name: '',
    price: 0,
    products: [],
  };
  handleGetProduct = () => {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        console.log(response.data);
        this.setState({ products: response.data.products });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.handleGetProduct();
  }
  // componentDidUpdate() {
  //   this.handleGetProduct();
  // }
  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      productImage: event.target.files[0],
    });
  };
  handleSubmit = (event) => {
    console.log(this.state.products);

    console.log(this.state);
    event.preventDefault();
    const formData = new FormData();
    formData.append('productImage', this.state.productImage);
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    axios
      .post('http://localhost:3000/products', formData)
      .then((res) => {
        console.log(res);
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  productList() {
    return this.state.products.map((currentproduct) => {
      return (
        <div>
          <h1>{currentproduct.name}</h1>
          <h1>{currentproduct.price}</h1>
          <h1>{currentproduct.productImage}</h1>
          <img
            src={'http://localhost:3000/' + currentproduct.productImage}
            alt="asdfsdf"
          ></img>
          {/* <img src={menu} alt="asdfsdf"></img> */}
        </div>
      );
    });
  }
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
                  name="img"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.fileSelectedHandler}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <input
              type="submit"
              value="Submit"
              onClick={this.handleGetProduct}
            />
          </form>
        </div>
        {this.productList()}
      </div>
    );
  }
}
