import React from 'react'
import Nav from './Nav';
import { useState } from 'react';
import axios from 'axios';
import './Add_meal.css';

export default function Add_meal() {

  const[values, setValues] =useState({
    meal_id: '',
    meal_name: '',
    size: '',
    price: '',
    add_image: '',
   
})

const handleChange=(event) =>{
    setValues({...values,[event.target.name]:event.target.value})
}

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/hansavillagehotel/add_meals",values)
    .then(res=>alert("Successfully updated"))
    .catch(err=>console.log(err));

    
}



  return (

    <div>
        <Nav/>

        <form className='formam' onSubmit={handleSubmit}>
        

            <div>
              <label className='labelam'>Meal Name:</label>
              <input
                type="text"
                id="meal_name"
                name="meal_name"
                onChange={handleChange}
                className='inputam'
              />
            </div>

            <div>
              <label className='labelam'>Size:</label>
              <input
                type="text"
                id="size"
                name="size"
                onChange={handleChange}
                className='inputam'
              />
            </div>

            <div>
              <label className='labelam'>Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                onChange={handleChange}
                className='inputam'
              />
            </div>

            <div>
              <label className='labelam'>Add Image:</label>
              <input
                type="file"
                id="add_image"
                name="add_image"
                onChange={handleChange}
                className='inputam'
              />
            </div>

            <button className='butam' type="submit">Submit</button>


        </form>
    </div>
  )
}
