import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import jsPDF from 'jspdf';
import logo from '../Images/logo.jpeg';
import 'jspdf-autotable';
import './Available_orders.css'

export default function Available_orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/meal_order')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (orderId) => {
    fetch(`http://localhost:8080/updateOrderStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Successfully updated the database');
        } else {
          console.error('Error updating order status:', res.statusText);
        }
      })
      .catch((err) => console.error('Error updating order status:', err));
  };

  const pdfGeneratorHall = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/meal_orderinvoice/${orderId}`);
      const orderDetails = await response.json();

      // Check if orderDetails is an array
      if (!Array.isArray(orderDetails)) {
        console.error('Order details is not an array:', orderDetails);
        return;
      }

      const doc = new jsPDF('portrait');
      doc.addImage(logo, 'JPEG', 12, 12, 25, 25);
      doc.setFont('helvetica', 'bold');
      doc.text(80, 20, 'Hansa Village Hotel');
      doc.setFont('helvetica', 'normal');
      doc.text(75, 40, 'Customer Invoice');

      if (orderDetails.length > 0) {
        const tableHeader = ['Order ID', 'Menu Item', 'Quantity', 'Unit Price', 'Amount'];
        const tableRows = orderDetails.map((row) => [
          row.Order_Id,
          row.Selected_Item,
          row.Quantity,
          row.Unit_Price,
          row.Amount,
        ]);

        doc.autoTable({
          startY: 50,
          head: [tableHeader],
          body: tableRows,
        });
      } else {
        doc.text(20, 50, 'No data available');
      }

      for (let i = 1; i <= doc.internal.getNumberOfPages(); i++) {
        doc.setPage(i);
      
        // Add a border to the entire page
        doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 8);
      }

      doc.setFont('Helvetica-Oblique', 'bold');
      doc.text('Thank You...! Come Again..', 13, doc.internal.pageSize.height - 50);
      doc.setLineWidth(0.5);
      doc.line(10, doc.internal.pageSize.height - 30, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 30);

      doc.setPage(doc.internal.getNumberOfPages());
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Address', 10, doc.internal.pageSize.height - 20);
      doc.setFont('helvetica', 'normal');
      doc.text('Hansa Village Hotel', 13, doc.internal.pageSize.height - 15);
      doc.text('Minuwangoda Road', 13, doc.internal.pageSize.height - 10);
      doc.text('Gampaha', 13, doc.internal.pageSize.height - 5);

      doc.setFont('helvetica', 'bold');
      doc.text('E Mail Address', 140, doc.internal.pageSize.height - 20);
      doc.setFont('helvetica', 'normal');
      doc.text('hansavillagehotel@gmail.com', 143, doc.internal.pageSize.height - 15);

      doc.save("customer_invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      <Nav />
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>View</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.Order_Id}</td>
              <td>{d.Full_Name}</td>
              <td>{d.Mobile_Number}</td>
              <td><button onClick={() => pdfGeneratorHall(d.Order_Id)}>View details</button></td>
              <td><button className="but" onClick={() => updateStatus(d.Order_Id)}>Complete</button></td>
              <td>{d.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
