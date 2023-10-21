import React from 'react'
import { useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import './Purchase_inventory.css';

export default function Purchase_inventory() {
  const [product_name, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date_of_purchase, setDate_of_purchase] = useState('');

  // const handleDropdownChange = (event) => {
  //   // Update the product_name when an option is selected
  //   setData({ ...data, product_name: event.target.value });
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/update-inventory', {
        product_name,
        quantity,
        date_of_purchase,
      });
      
      console.log(response.data); // Display success message to the user
    } catch (error) {
      console.error(error); // Handle errors
    }
  };

  return (
    <div>
      <Nav />

      <div>
        <form onSubmit={handleSubmit} className='formpi'>
        <h>Purchase Inventry</h>
          <br/><br/>
          <div>
            <label className='labelpi'>Product Name:</label>
            <select
              id="product_name"
              name="product_name"
              onChange={(e) => setProductName(e.target.value)}
              className='inputpi'
              value={product_name}
            >
              <option value="">Select an option</option>
              <option value="sugar">Sugar</option>
              <option value="carrot">Carrot</option>
              <option value="chili">Chili</option>
              <option value="karapincha">Karapincha</option>
            </select>
          </div>
          

          <div>
            <label className='labelpi'>Quantity:</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              className='inputpi'
              value={quantity}
            />
          </div>

          <div>
            <label className='labelpi'>Date of Purchase:</label>
            <input
              type="date"
              id="date_of_purchase"
              name="date_of_purchase"
              onChange={(e) => setDate_of_purchase(e.target.value)}
              className='inputpi'
              value={date_of_purchase}
            />
          </div>

          <button className='butpi' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
