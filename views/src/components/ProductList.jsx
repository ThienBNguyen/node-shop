import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Card';
import NavBar from './NavBar/NavBar'
import {Link } from "react-router-dom";
const accessToken = JSON.parse(localStorage.getItem('user'))

const authAxios = axios.create({
  // baseURL: 'http://localhost:3000',
  headers: {
    'auth-token': accessToken,
    'Content-Type': 'application/json'
  }
})
export default class ProductForm extends Component {
  state = {
    productImage: null,
    name: 'test',
    content: 'test',
    price: 2,
    products: [],
    cart: []

  };



  handleGetProduct = () => {
    authAxios
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

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleChangeContent = (event) => {
    this.setState({ content: event.target.value });
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
  
  handleSubmit = async(event) => {
    event.preventDefault();
    

    const formData = new FormData();
    formData.append('productImage', this.state.productImage);
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    formData.append('content', this.state.content);
    

    await authAxios
      .post('http://localhost:3000/products',  formData)
      .then((res) => {
        console.log(res);
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleDelete = async(productId) => {

    const currentProducts = this.state.products
    this.setState({
      products: currentProducts.filter(product => product._id !== productId)
    })
      await authAxios.delete('http://localhost:3000/products/' + productId)
      .then((res) => {
       console.log(res, 'item deleted')
      })
      .catch( (error) => {
        console.log(error);
      });
  };
  productList() {
    return this.state.products.map((currentproduct, i) => {
      console.log(currentproduct)

      return (
        <Card
          key={i}
          style={{ width: '18rem' }}
          className="bg-transparent border-transparent"
        >
          <Card.Img
            variant="top"
            src={'http://localhost:3000/' + currentproduct.productImage}
            alt={'http://localhost:3000/' + currentproduct.productImage}
            width={300}
            height={300}
          />
          <Card.Body>
            <Card.Title>{currentproduct.name}</Card.Title>
            <Card.Text>{currentproduct.content}</Card.Text>
            <p>{currentproduct.price}</p>
            <Button variant="primary" onClick={(e) => this.addToCard(currentproduct._id)}>
              Add Item 
            </Button>{' '}
            <Button variant="primary" onClick={this.handleEdit}>
              EDIT
            </Button>{' '}
            <Button variant="danger" onClick={(e) => {this.handleDelete(currentproduct._id)}}>
              DELETE
            </Button>
          </Card.Body>{' '}
        </Card>
      );
    });
  }

  addToCard = async (id, quantity) => {
try {
  const response = await fetch('http://localhost:3000/orders', {
    method: "POST",
    body: JSON.stringify({
      productId: id,
      quantity: quantity,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'auth-token': accessToken,
    },
  });
  console.log(id)
  let data = await response.json();

  console.log("Item Added To Cart");
  console.log(data);
} catch (err) {
  alert("Something Went Wrong");
  console.log(err);
}


  }
  render() {
    return (
      <div>
          <NavBar />

   
        
        <input
              type="submit"
              value="logout"
              onClick={this.logOut}
            />
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
              content:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChangeContent}
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
