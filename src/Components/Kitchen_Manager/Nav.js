import React from 'react'
import nav_logo from '../Images/nav_logo.jpeg';
import './Nav.css';
import logout from "../Images/logout.png";
import {useNavigate} from "react-router-dom";

import { useState } from 'react';


export default function 
() {

    
	let navigate= useNavigate();
  return (
    <header>
			<div><img className="nav_logo" src={nav_logo} alt="Form" /></div>
			<nav className='txt3'>
				<a href="/KitchenManager/AvailableOrders">Available Orders</a>
				<a href="/KitchenManager/AddMeal">Add Meal</a>
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
