import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Card';

const accessToken = JSON.parse(localStorage.getItem('user'))


const authAxios = axios.create({
  // baseURL: 'http://localhost:3000',
  headers: {
    'auth-token': accessToken,
    'Content-Type': 'application/json'
  }
})
export default class Cart extends Component {
    state = {
       cartList: [],
        totalPrice: 0,
      quantity: 0
      };
    
      increaseItem = (id) => {
          this.state.cartList.map((item) => {
              if (item._id == id){
                  
                  item.quantity += 1
                  this.setState({quantity: item.quantity})
              }
          })
        this.setState({ clicks: this.state.clicks + 1 });
      }
  
    DecreaseItem = (id) => {
        this.state.cartList.map((item) => {
            if (item._id == id){
                if(item.quantity > 1){
                    item.quantity -= 1
                  this.setState({quantity: item.quantity})

                }
            }
        })}
  handleGetCartProducts = async() => {
    await authAxios
      .get('http://localhost:3000/orders')
      .then((response) => {
        this.setState({ cartList: response.data.orders });
      })
      .catch((error) => {
        console.log(error);
      });
  };  

handleEditCartProduct = async(itemId) => {
    const currentItems = this.state.cartList

let currentQuantity = 0

currentItems.map((item) => {
    if(item._id == itemId){
        currentQuantity = item.quantity
    }
})
    await authAxios.patch(`http://localhost:3000/orders/${itemId}`, {quantity: currentQuantity} ).then((res) =>{
        console.log( res, 'item edit')
    }).catch((err) => {
        console.log(err)
    })
}

  handleDeleteCartProduct = async(itemId) => {
      const currentItems = this.state.cartList
  
  this.setState({
      cartList: currentItems.filter(item => item._id !== itemId)
  })
  
      await authAxios.delete(`http://localhost:3000/orders/` + itemId)
      .then((res)=>{
          console.log(res, 'item deleteed')
      }).catch((err) => {
          console.log(err)
      })
  

  }


  componentDidMount() {
        this.handleGetCartProducts();

      }
     
    addToDisplay = ()=> {
        let displayedList = this.state.cartList;
        const price = displayedList.reduce((itemPrice, eachPrice) => itemPrice + (eachPrice.product.price * eachPrice.quantity), 0);
        return(
            <div>
                <h1>
                {price}
            </h1>
            </div>
            
        )

    
    }
    incrementItem(id) {
     {this.increaseItem(id)}
     {this.handleEditCartProduct(id)}
    }
    decrementItem(id) {
        {this.DecreaseItem(id)}
        {this.handleEditCartProduct(id)}
       }
     cartList() {
        return this.state.cartList.map((currentproduct, i) => {
       
          return (
            <Card
              key={i}
              style={{ width: '18rem' }}
              className="bg-transparent border-transparent"
            >
              <Card.Img
                variant="top"
                src={'http://localhost:3000/' + currentproduct.product.productImage}
                alt={'http://localhost:3000/' + currentproduct.product.productImage}
                width={300}
                height={300}
              />
              <Card.Body>
                <Card.Title>{currentproduct.product.name}</Card.Title>
                <Card.Text>{currentproduct.quantity}</Card.Text>
                <p>{currentproduct.product.price} $</p>
                <button onClick={(e)=> {this.incrementItem(currentproduct._id)}}>Click to increment by 1</button>
        <button onClick={(e) => {this.decrementItem(currentproduct._id) }}>Click to decrease by 1</button>

        
      
                {/* <Button variant="primary" onClick={(e) => this.addToCard(currentproduct._id)}>
                  Add Item 
                </Button>{' '}*/}
                {/* <Button variant="primary" onClick={(e) => this.handleEditCartProduct(currentproduct._id)}>
                  EDIT
                </Button>{' '} */}
                <Button variant="danger" onClick={(e) => this.handleDeleteCartProduct(currentproduct._id)}>
                  DELETE
                </Button> 
                {/* <h1>{this.state.quantity}</h1> */}
              </Card.Body>{' '}
            </Card>
          );
        });
        


      }
    


    render() {
        return (
            <div>
             <NavBar />
          

             {this.cartList()}
             <div>
                 <h1>test price</h1>
                {this.addToDisplay()}
             </div>
            </div>

        )
    }
}
