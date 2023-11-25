import React from 'react'
import './Nav.css';
import nav_logo from '../Images/nav_logo.jpeg';
import logout from "../Images/logout.png";
import {useNavigate} from "react-router-dom";

export default function Nav() {

	let navigate= useNavigate();

  return (
    <header>
			<div><img className="nav_logo" src={nav_logo} alt="Form" /></div>
			<nav className='txt3'>
				<a href="/CustomerHome" className="nav-link">Home</a>
				<a href="/CustomerOrders" className="nav-link">Orders</a>
				<a href="/CustomerBooking" className="nav-link">Booking</a>

				<img
          className="logout"
          onClick={()=>{navigate("/")}}
          src={logout}
          alt="Form"
        />
				
				
			</nav>
			
		</header>
  )
}
