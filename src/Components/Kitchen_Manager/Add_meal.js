// App.js

import React, { useState } from 'react';
import axios from 'axios';
import './Add_meal.css';
import Nav from './Nav';

export default function App() {
  const [formValues, setFormValues] = useState({
    meal_name: '',
    size: '',
    price: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('meal_name', formValues.meal_name);
    formData.append('size', formValues.size);
    formData.append('price', formValues.price);
    formData.append('image', formValues.image);

    try {
      const response = await axios.post(
        'http://localhost:8080/submit_form',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      alert('Form submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Error submitting form');
    }
  };

  return (
    <div>
      <Nav/>
      <form onSubmit={handleSubmit} className='formam'>
        <h>Add your meal</h>
      <label className='labelam'>Meal Name:</label>
          <input
            type="text"
            name="meal_name"
            value={formValues.meal_name}
            onChange={handleInputChange}
            className='inputam'
          />
        
        <br />
        <label className='labelam'>Size:</label>
          <input
            type="text"
            name="size"
            value={formValues.size}
            onChange={handleInputChange}
            className='inputam'
          />

        <br/>
        <label className='labelam'>Price:</label>
          <input
            type="text"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            className='inputam'
          />

        <br/>
        

        <label className='labelam'>
          Image:
          </label>
          <input type="file" name="image" onChange={handleFileChange} className='inputam'/>
        
        <br />
        <button type="submit" className='butam'>Submit</button>
      </form>
    </div>
  );
}
