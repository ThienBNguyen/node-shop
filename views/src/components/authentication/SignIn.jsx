import React, { Component } from 'react'
import axios from 'axios'
import {Link } from "react-router-dom";
export default class SignIn extends Component {
    state={
        email: 'test@test.com',
        password: 'tester',
    }
    onChangeEmail = (event) =>{
        this.setState({email: event.target.value})
    }
    onChangePassword = (event) =>{
        this.setState({password: event.target.value})
    }

    handleSubmit = async(event) =>{
        event.preventDefault()
const userData = {
    email: this.state.email,
    password: this.state.password
}
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };
await axios.post('http://localhost:3000/user/login', userData, axiosConfig).then((res) =>{

    localStorage.setItem('user', JSON.stringify(res.data.token))
    window.location.href = "/"

}).catch((error) =>{
    console.log(error)
})

    }
    render() {
        return (
            <div>
                 <div className="container">
        <h1>login</h1>
        <div className="user form">
            <h3>Username</h3>
            <p>
                <i className="fas fa-user "></i><input type="text" placeholder="  Type your email" value={this.state.email} onChange={this.onChangeEmail}/>
            </p>

            <hr/>

        </div>


        <div className="password form">
            <h3>Password</h3>
            <div>
                <i className="fas fa-lock "></i><input type="text" placeholder="   Type your password" value = {this.state.password} onChange={this.onChangePassword}/>
            </div>

            <hr/>
            <p  className="forgot">Forgot password?</p>
        </div>

        <form>
          
                <button className="login" onClick={this.handleSubmit}>Login</button>
            
            

        </form>
        <div className="sign-up">
            <p>or Sign Up Using</p>
            <p className="social "><i className="fab fa-facebook-square"></i><i className="fab fa-twitter"></i><i className="fab fa-google"></i>
            </p>
        </div>

        <div className="account">
            <p>
                have not account yet?
            </p>
            <Link to="/signup"> <a href="#">SIGN UP</a></Link>
           
           
        </div>

    </div>
            </div>
        )
    }
}
