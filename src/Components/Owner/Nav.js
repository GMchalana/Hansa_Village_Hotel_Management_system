import React from 'react'
import nav_logo from '../Images/nav_logo.jpeg';
import download from '../Images/download.png';
import './Nav.css';
import Popup_reports from './Popup_reports';
import { useState } from 'react';


export default function 
() {

    const [buttonPopup, setButtonPopup] = useState(false)

  return (
    <header>
			<div><img className="nav_logo" src={nav_logo} alt="Form" /></div>
			<nav className='txt2'>
				<a href="/Owner/CustomerDetails">Customer Details</a>
				<a href="/Owner/Inventory">Inventory</a>
				<img className="download" onClick={()=> setButtonPopup(true)} src={download} alt="Form" />

                <Popup_reports trigger={buttonPopup} setTrigger={setButtonPopup}>

                    <input
                        type="submit"
                        value="Raw Material Cost Report"
                        className="report_btn"
                        placeholder="rmc_report"
                        required
                    />
                    <br/>
                    <br/>
                    <input
                        type="submit"
                        value="Stores Report"
                        className="report_btn"
                        placeholder="stores_report"
                        required
                    />
                    <br/>
                    <br/>
                    <input
                        type="submit"
                        value="Sales Report"
                        className="report_btn"
                        placeholder="sales_report"
                        required
                    />


                </Popup_reports>
				
				
			</nav>
			
		</header>
  )
}
