import React from 'react'
import './Nav.css';
import nav_logo from '../Images/nav_logo.jpeg';

export default function Nav() {
  return (
    <header>
			<div><img className="nav_logo" src={nav_logo} alt="Form" /></div>
			<nav className='txt1'>
				<a href="/CustomerHome" className="nav-link">Home</a>
				<a href="/CustomerOrders" className="nav-link">Orders</a>
				<a href="/CustomerBooking" className="nav-link">Booking</a>
				
				
			</nav>
			
		</header>
  )
}
