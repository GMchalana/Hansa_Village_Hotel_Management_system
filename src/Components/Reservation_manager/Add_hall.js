import './Add_hall.css';
import Nav from './Nav';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Add_hall() {

  const[data,setData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/booking")
        .then(res => res.json())
        .then(data=>setData(data))
        .catch(err => console.log(err));
    },[])

    const updateStatus = (orderId) => {
      fetch(`http://localhost:8080/updateRoomStatusYes`, {
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

    const updateStatus2 = (orderId) => {
      fetch(`http://localhost:8080/updateRoomStatus2`, {
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
  
  

  return (
    <div>
      <Nav />
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Number of guests</th>
            <th>Room Number</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Room Type</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
                {data.map((d,i) =>
                (
                    <tr key={i}>
                        <td>{d.Book_Id }</td>
                        <td>{d.Num_of_Guests}</td>
                        <td>{d.Room_Number}</td>
                        <td>{d.Arrival_Date_Time}</td>
                        <td>{d.Customer_Id}</td>
                        <td>{d.Room_Type}</td>
                        <td><button className="but" onClick={() => {updateStatus(d.Room_Number);updateStatus2(d.Book_Id);}}>finish</button></td>
                        <td>{d.Status}</td>
                        
                        
                    </tr>
                ))}
            </tbody>


      </table>
    </div>
  );
}
