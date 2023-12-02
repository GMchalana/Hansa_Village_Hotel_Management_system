import React from 'react'
import Nav from './Nav';
import { useState } from 'react';
import axios from 'axios';
import './Reservation_manager.css';



export default function Reservation_manager() {

  const [formValues, setFormValues] = useState({
    charge: '',
    type: '',
    image: null,
    availability:'yes',
    category:'',
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
    formData.append('charge', formValues.charge);
    formData.append('type', formValues.type);
    formData.append('image', formValues.image);
    formData.append('category', formValues.category);

    try {
      const response = await axios.post(
        'http://localhost:8080/submit_formr',
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

<form className='formrm' onSubmit={handleSubmit}>


    <div>
      <label className='lablerm'>Charge per day:</label>
      <input
        type="text"
        id="charge"
        name="charge"
        onChange={handleInputChange}
        className='inputrm'
      />
    </div>

    <div>
      <label className='lablerm'>Type:</label>
      <input
        type="text"
        id="type"
        name="type"
        onChange={handleInputChange}
        className='inputrm'
      />
    </div>

    <div>
      <label className='lablerm'>Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        onChange={handleInputChange}
        className='inputrm'
      />
    </div>

    

    <div>
      <label className='lablerm'>Add Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleFileChange}
        className='inputrm'
      />
    </div>

    <button className='butrm' type="submit">Submit</button>


</form>
    </div>
  )
}
