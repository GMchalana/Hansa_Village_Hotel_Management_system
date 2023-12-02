// Nav.js

import React, { useState } from "react";
import nav_logo from "../Images/nav_logo.jpeg";
import download from "../Images/downloadwhite.png";
import "./Nav.css";
import Popup_reports from "./Popup_reports";
import jsPDF from "jspdf";
import logo from '../Images/logo.jpeg';
import "jspdf-autotable";
import logout from "../Images/logout.png";
import {useNavigate} from "react-router-dom";

async function fetchInventoryDetails() {
  try {
    const response = await fetch("http://localhost:8080/meal_order");
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
        const tableHeader = ["Order Number", "Menu Item", "Quantity", "Unit Price", "Amount"];
  
        // Map data to rows
        const tableRows = databaseTableData.map(row => [
          row.Order_Id,
          row.Selected_Item,
          row.Quantity,
          row.Unit_Price,
          row.Amount
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

      doc.save("Sales_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }

  async function fetchInventoryDetailsHall() {
    try {
      const response = await fetch("http://localhost:8080/hall");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching inventory details:", error);
      return [];
    }
  }

  async function pdfGeneratorHall() {
    try {
      const databaseTableDataHall = await fetchInventoryDetailsHall();

      const doc = new jsPDF("portrait");
      doc.addImage(logo, "JPEG", 12, 12, 25, 25);
      doc.setFont("helvetica", "bold");
      doc.text(80, 20, "Hansa Village Hotel");
      doc.setFont("helvetica", "normal");
      doc.text(75, 40, "Hall Utilization Report");

      if (databaseTableDataHall.length > 0) {
        // Create a table header
        const tableHeader = ["Event Details", "Date", "Number of Guests", "Other Requirments"];
  
        // Map data to rows
        const tableRows = databaseTableDataHall.map(row => [
          row.Event_Detail,
          row.Planning_Date,
          row.Num_of_Guests,
          row.Decorations,
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

      for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
        doc.setPage(i);
      
        // Add a border to the entire page
        doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 8);
      }

      doc.setLineWidth(0.5);
      doc.line(10, doc.internal.pageSize.height - 30, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 30);
      // Add footer
    //const totalPagesExp = "{total_pages_count_string}";
    doc.setPage(doc.internal.getNumberOfPages());
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Address ", 10, doc.internal.pageSize.height - 20);
    doc.setFont("helvetica", "normal");
    doc.text("Hansa Village Hotel ", 13, doc.internal.pageSize.height - 15);
    doc.text("Minuwangoda Road ", 13, doc.internal.pageSize.height - 10);
    doc.text("Gampaha ", 13, doc.internal.pageSize.height - 5);

    doc.setFont("helvetica", "bold");
    doc.text("E Mail Address ", 140, doc.internal.pageSize.height - 20);
    doc.setFont("helvetica", "normal");
    doc.text("hansavillagehotel@gmail.com", 143, doc.internal.pageSize.height - 15);

      doc.save("Hall_Utilization_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }


  async function fetchInventoryDetailsRoom() {
    try {
      const response = await fetch("http://localhost:8080/room");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching inventory details:", error);
      return [];
    }
  }


  async function pdfGeneratorRoom() {
    try {
      const databaseTableDataRoom = await fetchInventoryDetailsRoom();

      const doc = new jsPDF("portrait");
      doc.addImage(logo, "JPEG", 12, 12, 25, 25);
      doc.setFont("helvetica", "bold");
      doc.text(80, 20, "Hansa Village Hotel");
      doc.setFont("helvetica", "normal");
      doc.text(70, 40, "Room Utilization Report");

      if (databaseTableDataRoom.length > 0) {
        // Create a table header
        const tableHeader = ["Room Number", "Date", "Room Type", "Customer ID", "Number of Guests"];
  
        // Map data to rows
        const tableRows = databaseTableDataRoom.map(row => [
          row.Room_Number,
          row.Arrival_Date_Time,
          row.Room_Type,
          row.Customer_Id,
          row.Num_of_Guests,
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

      for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
        doc.setPage(i);
      
        // Add a border to the entire page
        doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 8);
      }

      doc.setLineWidth(0.5);
      doc.line(10, doc.internal.pageSize.height - 30, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 30);
      // Add footer
    //const totalPagesExp = "{total_pages_count_string}";
    doc.setPage(doc.internal.getNumberOfPages());
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Address ", 10, doc.internal.pageSize.height - 20);
    doc.setFont("helvetica", "normal");
    doc.text("Hansa Village Hotel ", 13, doc.internal.pageSize.height - 15);
    doc.text("Minuwangoda Road ", 13, doc.internal.pageSize.height - 10);
    doc.text("Gampaha ", 13, doc.internal.pageSize.height - 5);

    doc.setFont("helvetica", "bold");
    doc.text("E Mail Address ", 140, doc.internal.pageSize.height - 20);
    doc.setFont("helvetica", "normal");
    doc.text("hansavillagehotel@gmail.com", 143, doc.internal.pageSize.height - 15);
    
      doc.save("Room_Utilization_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }

  let navigate= useNavigate();
  return (
    <header>
      <div>
        <img className="nav_logo" src={nav_logo} alt="Form" />
      </div>
      <nav className="txt3">
        <a href="/ReservationManager/Reservations">Add Room</a>
        <a href="/ReservationManager/Addhall">Booking Details</a>
        
        
        <img
          className="download"
          onClick={() => setButtonPopup(true)}
          src={download}
          alt="Form"
        />
        <img
          className="logout"
          onClick={()=>{navigate("/")}}
          src={logout}
          alt="Form"
        />
        <Popup_reports trigger={buttonPopup} setTrigger={setButtonPopup} className='popup'>
          {/* <input
            type="submit"
            value="Sales Report"
            className="report_btn"
            onClick={pdfGenerator}
          /> */}
          {/* <br />
          <br /> */}
          <input type="submit" value="Hall Utilization Report" className="report_btn" onClick={pdfGeneratorHall}/>
          <br/>
          <br/>
          <input type="submit" value="Room Utilization Report" className="report_btn" onClick={pdfGeneratorRoom}/>
          <br/>
        </Popup_reports>
      </nav>
    </header>
  );
}

export default Nav;
