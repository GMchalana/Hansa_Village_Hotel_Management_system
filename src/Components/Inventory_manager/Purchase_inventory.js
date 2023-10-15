import React from 'react'
import Nav from './Nav'
import { useState } from 'react';
import axios from 'axios';
import './Purchase_inventory.css';

export default function Purchase_inventory() {

  const[values, setValues] =useState({
    supplier_name: '',
    supplier_id: '',
    product_id: '',
    product_name: '',
    product_category: '',
    available_quantity: '',
    date_of_purchase: '',
    purchase_price: '',
    lead_time: '',
    sup_con_number: '',
   
})

const handleChange=(event) =>{
    setValues({...values,[event.target.name]:event.target.value})
}

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/hansavillagehotel/inventoty_details",values)
    .then(res=>console.log("Registration Successfully"))
    .catch(err=>console.log(err));

    
}



  return (
    <div>
        <Nav/>

        <div>
        <form onSubmit={handleSubmit} className='formpi'>
        <div>
              <label className='labelpi'>Supplier Name:</label>
              <input
                type="text"
                id="supplier_name"
                name="supplier_name"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Supplier ID:</label>
              <input
                type="text"
                id="supplier_id"
                name="supplier_id"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Product ID:</label>
              <input
                type="text"
                id="product_id"
                name="product_id"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Product Name:</label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Product Category:</label>
              <input
                type="text"
                id="product_category"
                name="product_category"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Available Quantity:</label>
              <input
                type="text"
                id="available_quantity"
                name="available_quantity"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Date of Purchase:</label>
              <input
                type="date"
                id="date_of_purchase"
                name="date_of_purchase"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Purchase Price:</label>
              <input
                type="text"
                id="purchase_price"
                name="purchase_price"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Lead Time:</label>
              <input
                type="text"
                id="lead_time"
                name="lead_time"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <div>
              <label className='labelpi'>Supplier Contact Number:</label>
              <input
                type="text"
                id="sup_con_number"
                name="sup_con_number"
                onChange={handleChange}
                className='inputpi'
              />
            </div>

            <button className='butpi' type="submit">Submit</button>


        </form>
        </div>
    </div>
  )
}
