import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Card';
export default class ProductForm extends Component {
  state = {
    productImage: null,
    name: '',
    content: '',
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
  
  handleSubmit = (event) => {
    console.log(this.state.products);
    const token = localStorage.getItem('jwt')
    console.log(`Bearer ${token}`)

    const authAxios = axios.create({
    
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log(this.state);
    event.preventDefault();
    const formData = new FormData();
    formData.append('productImage', this.state.productImage);
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    formData.append('content', this.state.content);
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`
      }
    };
    // axios.defaults.headers.common['Authorization'] = response.data.auth_token;
    // dispatch({ type: AUTHENTICATED });
    axios
      .post('http://localhost:3000/products',{ headers: {"Authorization" : `Bearer ${token}`} }, formData)
      .then((res) => {
        console.log(res);
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleDelete = (event) => {
    event.preventDefault();

    axios
      .patch('http://localhost:3000/products' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          content: response.data.content,
          price: response.data.price,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  productList() {
    return this.state.products.map((currentproduct, i) => {
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
            <Button variant="primary" onClick={this.handleEdit}>
              EDIT
            </Button>{' '}
            <Button variant="danger" onClick={this.handleDelete}>
              DELETE
            </Button>
          </Card.Body>{' '}
        </Card>
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
