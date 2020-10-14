import React, { Component } from 'react'
import axios from 'axios'
export default class SignIn extends Component {
    state={
        email: '',
        password: '',
        token: ''
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
    console.log(res.data)

    localStorage.setItem('jwt', res.data.token)
    // axios.defaults.headers.common['Authorization'] = res.data.token;
    // dispatch({ type: AUTHENTICATED });

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
                <i className="fas fa-user "></i><input type="text" placeholder="  Type your email" value={this.state.value} onChange={this.onChangeEmail}/>
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

        <form action="">
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
            <a href="#">SIGN UP</a>
        </div>

    </div>
            </div>
        )
    }
}
