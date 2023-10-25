import React, { useEffect, useState } from 'react'
import Nav from './Nav';

export default function Available_orders() {

    const[data,setData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/users")
        .then(res => res.json())
        .then(data=>setData(data))
        .catch(err => console.log(err));
    },[])

    const[data2,setData2]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/meal_order")
        .then(res => res.json())
        .then(data=>setData(data))
        .catch(err => console.log(err));
    },[])

    




    const updateStatus = (orderId) => {
        
      
        fetch("http://localhost:8080/updateOrderStatus", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId }),
        })
          .then((res) => {
            if (res.status === 200) {
                alert("Successfully update the database");
              // Status updated successfully, you can also update the UI if needed
              // Reload the data if necessary
            } else {
              console.error('Error updating order status:', res.statusText);
            }
          })
          .catch((err) => console.error('Error updating order status:', err));
      };






  return (
    <div>
        <Nav/>
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>View</th>
                    <th>Action</th>
                    <th>status</th>
                    
                </tr>
            </thead>

            <tbody>
                {data.map((d,i) =>
                (
                    <tr key={i}>
                        <td>{d.Order_Id }</td>
                        <td>{d.Full_Name}</td>
                        <td>{d.Mobile_Number}</td>
                        <td><button>View details</button></td>
                        <td><button onClick={() => updateStatus(d.Order_Id)}>Complete</button></td>
                        <td>{d.Status}</td>
                        
                        
                        
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
