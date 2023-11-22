// Nav.js

import React, { useState } from "react";
import nav_logo from "../Images/nav_logo.jpeg";
import download from "../Images/download.png";
import "./Nav.css";
import Popup_reports from "./Popup_reports";
import jsPDF from "jspdf";
import logo from '../Images/logo.jpeg';
import "jspdf-autotable";

async function fetchInventoryDetails() {
  try {
    const response = await fetch("http://localhost:8080/inventoty_details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching inventory details:", error);
    return [];
  }
}

function Nav() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [databaseTableData, setDatabaseTableData] = useState([]);

  async function pdfGenerator() {
    try {
      const databaseTableData = await fetchInventoryDetails();

      const doc = new jsPDF("portrait");
      doc.addImage(logo, "JPEG", 10, 7, 25, 25);
      doc.setFont("helvetica", "bold");
      doc.text(80, 20, "Hansa Village Hotel");
      doc.setFont("helvetica", "normal");
      doc.text(90, 40, "Sales Report");

      if (databaseTableData.length > 0) {
        // Create a table header
        const tableHeader = ["Product Name", "Available Quantity", "Date of Purchase"];
  
        // Map data to rows
        const tableRows = databaseTableData.map(row => [
          row.Product_Name,
          row.Available_Quentity,
          row.Date_of_Purchase
        ]);
  
        // Add the table to the PDF
        doc.autoTable({
          startY: 50,
          head: [tableHeader],
          body: tableRows
        });
      } else {
        // Handle case where there is no data
        doc.text(20, 50, "No data available");
      }

      doc.save("Raw_Material_Cost_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }

  return (
    <header>
      <div>
        <img className="nav_logo" src={nav_logo} alt="Form" />
      </div>
      <nav className="txt3">
        <a href="/InventoryManager/InventoryDetails">Inventory Details</a>
        <a href="/InventoryManager/PurchaseInventory">Purchase Inventory</a>
        <a href="/InventoryManager/UsedInventory">Used Inventory</a>
        {/* <img
          className="download"
          onClick={() => setButtonPopup(true)}
          src={download}
          alt="Form"
        />
        <Popup_reports trigger={buttonPopup} setTrigger={setButtonPopup} className='popup'>
          <input
            type="submit"
            value="Raw Material Cost Report"
            className="report_btn"
            onClick={pdfGenerator}
          />
          <br />
          <br />
          <input type="submit" value="Stores Report" className="report_btn" />
          <br />
        </Popup_reports> */}
      </nav>
    </header>
  );
}

export default Nav;
