import React from 'react'
import Nav from './Nav';
import './Used_inventory.css';
import { useState } from 'react';
import axios from 'axios';

export default function Used_inventory() {


  const [data, setData] = useState({
    product_id: '',
    product_name: '',
    product_category: '',
    reducing_inventory: '',
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/inventoty_details/get",data)
    .then(res=>console.log("Registration Successfully"))
    .catch(err=>console.log(err));

  };




  return (
    <div>
        <Nav/>
        <div>
            <form className='formui' onSubmit={handleSubmit}>
            <div>
              <label className='labelui'>Product ID:</label>
              <input
                type="text"
                id="product_id"
                name="product_id"
                onChange={handleChange}
                className='inputui'
                value={data.product_id}
                
              />
            </div>

            <div>
              <label className='labelui'>Product Name:</label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                onChange={handleChange}
                className='inputui'
                //value={data.product_name}
              />
            </div>

            <div>
              <label className='labelui'>Product Category:</label>
              <input
                type="text"
                id="product_category"
                name="product_category"
                onChange={handleChange}
                className='inputui'
                value={data.product_category}
              />
            </div>

            <div>
              <label className='labelui'>Reducing Inventory:</label>
              <input
                type="text"
                id="reducing_inventory"
                name="reducing_inventory"
                onChange={handleChange}
                className='inputui'
                value={data.reducing_inventory}
              />
            </div>

            <button className='butui' type="submit">Submit</button>

            </form>
        </div>
    </div>
  )
}
