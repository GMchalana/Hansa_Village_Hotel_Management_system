import React from 'react'
import nav_logo from '../Images/nav_logo.jpeg';
import './Nav.css';

import { useState } from 'react';


export default function 
() {

    

  return (
    <header>
			<div><img className="nav_logo" src={nav_logo} alt="Form" /></div>
			<nav className='txt4'>
				<a href="/KitchenManager/AvailableOrders">Available Orders</a>
				<a href="/KitchenManager/AddMeal">Add Meal</a>
				
				

                
				
				
			</nav>
			
		</header>
  )
}
