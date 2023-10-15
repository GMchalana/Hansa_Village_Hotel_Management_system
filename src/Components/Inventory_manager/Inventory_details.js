import React, { useEffect, useState } from 'react'
import Nav from './Nav';

export default function Inventory_details() {

    const[data,setData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/inventoty_details")
        .then(res => res.json())
        .then(data=>setData(data))
        .catch(err => console.log(err));
    },[])

  return (
    <div>
        <Nav/>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Available Quantity</th>
                    <th>Data of last stock recieve</th>
                    <th>Lead Time (Days)</th>
                    <th>Supplier ID</th>
                    
                </tr>
            </thead>

            <tbody>
                {data.map((d,i) =>
                (
                    <tr key={i}>
                        <td>{d.Product_ID }</td>
                        <td>{d.Product_Name}</td>
                        <td>{d.Available_Quentity}</td>
                        <td>{d.Date_of_Purchase}</td>
                        <td>{d.Lead_Time}</td>
                        <td>{d.Supplier_Id}</td>
                        
                        
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}
