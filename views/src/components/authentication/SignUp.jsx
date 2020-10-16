import axios from 'axios';
import React, { Component } from 'react';
import style from './signUp.css'
const headerAuxios = axios.create({
  // baseURL: 'http://localhost:3000',
  headers: {
    // 'auth-token': accessToken,
    'Content-Type': 'application/json'
  }
})
export default class SignUp extends Component {
  state ={
    firstName: 'test',
    lastName: 'test',
    email: '',
    password: 'tester',
    retype: 'tester'
  }
onChangeFirstName = (event) =>{
  this.setState({firstName: event.target.value})
}
onChangeLastName = (event) =>{
  this.setState({lastName: event.target.value})
}
onChangeUserEmail = (event) =>{
  this.setState({email: event.target.value})
}
onChangePassWord = (event) =>{
  this.setState({password: event.target.value})
}
onChangeRetypePassWord = (event) =>{
  this.setState({retype: event.target.value})
}
  handleSubmit = (event) =>{
    event.preventDefault();
const userObject = {
  firstname: this.state.firstName,
    lastname: this.state.lastName,
    email: this.state.email,
    password: this.state.password,
}
// console.log(userObject)
// let axiosConfig = {
//   headers: {
//       'Content-Type': 'application/json'
//   }
// };
// let data = JSON.stringify(userObject)
    headerAuxios.post('http://localhost:3000/user/signup', userObject).then((res) => {
      console.log(res.data)
    }).catch((error) =>{
      console.log(error)
    })
    // this.setState({ firstName: '',
    // lastName: '',
    // email: '',
    // password: '',})
  }
  render() {
    return  (
    <div className="signup">
    <div className="social"><button><i className="fab fa-facebook-square"></i>Connect with Facebook</button><button><i className="fab fa-twitter"></i>Connect with Twitter</button><button><i className="fab fa-google"></i>Connect with Google</button></div>
    <p>Or sign up with</p>
     <div className="register">
    
     <form action="" className="form">
       
     <div className="test">
            <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.onChangeFirstName} />
            
            <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.onChangeLastName}/>
        </div>
         <input type="text" placeholder="E-mail" value={this.state.email} onChange={this.onChangeUserEmail}/>
         <input type="text" placeholder="Password" value={this.state.password} onChange={this.onChangePassWord}/>
        
        <input type="text" placeholder="Retype password" value={this.state.retype} onChange={this.onChangeRetypePassWord}/>
        <p>By creating account,
            you agree to our 
        </p>
            <button className="submit" onClick={this.handleSubmit}>Sign up</button> 

    </form>

</div>
</div>
)
  }
}
