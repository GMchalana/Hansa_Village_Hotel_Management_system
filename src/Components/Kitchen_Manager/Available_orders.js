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

  return (
    <div>
        <Nav/>
        <table>
            <thead>
                <tr>
                    <th>Meal ID</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    
                </tr>
            </thead>

            <tbody>
                {data.map((d,i) =>
                (
                    <tr key={i}>
                        <td>{d.Selected_Item }</td>
                        <td>{d.Full_Name}</td>
                        <td>{d.Mobile_Number}</td>
                        
                        
                        
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
