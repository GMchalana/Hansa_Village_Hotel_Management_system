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
			<nav className='txt3'>
				<a href="/InventoryManager/InventoryDetails">Inventory Details</a>
				<a href="/InventoryManager/PurchaseInventory">Purchase Inventory</a>
                <a href="/InventoryManager/UsedInventory">Used Inventory</a>
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
                    


                </Popup_reports>
				
				
			</nav>
			
		</header>
  )
}
