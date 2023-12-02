import React from 'react'
import Nav from './Nav';
import './Used_inventory.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Used_inventory() {

  const [product_name, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  

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
      const response = await axios.post('http://localhost:8080/inventoty_details/get', {
        product_name,
        quantity,
        
      });
      
      alert("Successfully update the database");  // Display success message to the user
    } catch (error) {
      alert("There is an error when you entering the data"); // Handle errors
    }
  };


  const[data,setData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/inventoty_details")
        .then(res => res.json())
        .then(data=>setData(data))
        .catch(err => console.log(err));
    },[])

  return (
    <div>
      <Nav />
      <br/><br/>
      <div>
        <form onSubmit={handleSubmit} className='formpi'>
          <h>Used Inventry</h>
          <br/><br/>
          
          <div>
            <label className='labelpi'>Product Name:</label>
            <select
              id="product_name"
              name="product_name"
              onChange={(e) => setProductName(e.target.value)}
              className='inputpi'
              // value={product.Product_Name}
            >
              <option value="">Select an option</option>

              {/* Dynamically populate options based on productList data */}
              {data.map((product) => (
                <option key={product.id} value={product.Product_Name}>
                  {product.Product_Name}
                </option>
              ))}
            </select>
          </div>
          

          <div>
            <label className='labelpi'>Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              className='inputpi'
              value={quantity}
            />
          </div>

          

          <button className='butpi' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
