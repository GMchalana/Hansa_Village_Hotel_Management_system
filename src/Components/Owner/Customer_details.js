import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import './Customer_details.css';

export default function Customer_details() {
    const[data,setData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/signup")
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
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>User Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                </tr>
            </thead>

            <tbody>
                {data.map((d,i) =>
                (
                    <tr key={i}>
                        <td>{d.User_Id}</td>
                        <td>{d.Full_Name}</td>
                        <td>{d.User_Name}</td>
                        <td>{d.Mobile_Number}</td>
                        <td>{d.Address}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
}
