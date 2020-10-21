import React from "react"
import { Link} from "react-router-dom"


export default function NavBar() {
    const logOut = () =>{
        localStorage.removeItem('user')
        window.location.reload(false);
      }
      const test = () =>{
        alert('test')
      }
    return (
        <nav className = "navbar navbar-expand-lg navbar-light bg-info">
        <div className = "container" >
        <Link to = "/"
        className = "navbar-brand" > React Shopping Cart </Link>
        <div className = "collapse navbar-collapse justify-content-end"
        id = "navbarNav" >
        < ul className = "navbar-nav" >
        < li className = "nav-item active" >
        < Link to = "/"
        className = "nav-link" > Home </Link> </li >
        < li className = "nav-item active" >
        < Link to = "/signin"
        className = "nav-link" > signin </Link> </li >
        < li className = "nav-item active" >
        < Link to = "/signup"
        className = "nav-link" > register </Link> </li >
        < li className = "nav-item active" onClick = {test}>
        < Link to = "/"
        className = "nav-link" > logout </Link> </li >
        
         <  li className = "nav-item" >
        < Link to = "/cart"
        className = "nav-link" > Cart </Link> </
        li> </ul> </ div > </div> </ nav >
    )
}
