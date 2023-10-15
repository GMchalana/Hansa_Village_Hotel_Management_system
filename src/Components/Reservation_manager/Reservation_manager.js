import React from 'react'
import Nav from './Nav';
import { useState } from 'react';
import axios from 'axios';
import './Reservation_manager.css';



export default function Reservation_manager() {

  const[values, setValues] =useState({
    room_id: '',
    charge: '',
    type: '',
    add_image: '',
   
})

const handleChange=(event) =>{
    setValues({...values,[event.target.name]:event.target.value})
}

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/hansavillagehotel/add_room",values)
    .then(res=>console.log("Registration Successfully"))
    .catch(err=>console.log(err));

    
}





  return (
    <div>
         <Nav/>

<form className='formrm' onSubmit={handleSubmit}>
<div>
      <label className='lablerm'>Room ID:</label>
      <input
        type="text"
        id="room_id"
        name="room_id"
        onChange={handleChange}
        className='inputrm'
      />
    </div>

    <div>
      <label className='lablerm'>Charge per day:</label>
      <input
        type="text"
        id="charge"
        name="charge"
        onChange={handleChange}
        className='inputrm'
      />
    </div>

    <div>
      <label className='lablerm'>Type:</label>
      <input
        type="text"
        id="type"
        name="type"
        onChange={handleChange}
        className='inputrm'
      />
    </div>

    

    <div>
      <label className='lablerm'>Add Image:</label>
      <input
        type="file"
        id="add_image"
        name="add_image"
        onChange={handleChange}
        className='inputrm'
      />
    </div>

    <button className='butrm' type="submit">Submit</button>


</form>
    </div>
  )
}
