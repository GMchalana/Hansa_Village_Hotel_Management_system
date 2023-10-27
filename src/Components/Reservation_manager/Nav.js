import React from 'react'
import nav_logo from '../Images/nav_logo.jpeg';
import './Nav.css';
import download from '../Images/download.png';
import { useState } from 'react';
import Popup_reports from './Popup_reports';

export default function 
() {

    
	const [buttonPopup, setButtonPopup] = useState(false)
  return (
    <header>
			<div><img className="nav_logo" src={nav_logo} alt="Form" /></div>
			<nav className='txt5'>
				<a href="/ReservationManager/Reservations">Add Rooms</a>
				<img className="download" onClick={()=> setButtonPopup(true)} src={download} alt="Form" />
				
				<Popup_reports trigger={buttonPopup} setTrigger={setButtonPopup}>

                  
                    <input
                        type="submit"
                        value="Hall Utilization Report"
                        className="report_btn"
                        placeholder="stores_report"
                        required
                    />
                    <br/>
                    <br/>
                    <input
                        type="submit"
                        value="Room Utilization Report"
                        className="report_btn"
                        placeholder="sales_report"
                        required
                    />


                </Popup_reports>
				

                
				
				
			</nav>
			
		</header>
  )
}
