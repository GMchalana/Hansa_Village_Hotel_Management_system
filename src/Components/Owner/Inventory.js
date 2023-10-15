import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import './Inventory.css';

export default function Inventory() {

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

        <table>
            <thead>
                <tr>
                    <th>Suplier Name</th>
                    <th>Supplying Product</th>
                    <th>Date</th>
                    <th>Lead time(Days)</th>
                </tr>
            </thead>

            <tbody>
                {data.map((d,i) =>
                (
                    <tr key={i}>
                        <td>{d.Supplier_Name}</td>
                        <td>{d.Product_Name}</td>
                        <td>{d.Date_of_Purchase}</td>
                        <td>{d.Lead_Time}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
