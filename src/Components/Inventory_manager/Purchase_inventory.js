import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import './Purchase_inventory.css';

export default function Purchase_inventory() {
  const [product_name, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date_of_purchase, setDate_of_purchase] = useState('');
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    // Fetch product names from the backend when the component mounts
    const fetchProductNames = async () => {
      try {
        const response = await axios.get('http://localhost:8080/get-product-names');
        if (response.data.success) {
          setProductOptions(response.data.data);
        } else {
          console.error('Error fetching product names:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching product names:', error);
      }
    };

    fetchProductNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/update-inventory', {
        product_name,
        quantity,
        date_of_purchase,
      });

      alert("Successfully update the database"); // Display success message to the user
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





    const[values, setValues] =useState({
      product_name: '',
      product_category: '',
      supplier_name: '',
      supplier_id: '',
      purchase_price: '',
      lead_time: '',
      sup_con: ''
  })

  const handleChange=(event) =>{
      setValues({...values,[event.target.name]:event.target.value})
  }

  const handleSubmit1 = (event) => {
      event.preventDefault();
     
      axios.post("http://localhost:8080/hansavillagehotel/addinventory",values)
      .then(res=>alert("Successfully add inventory"))
      
      .catch(err=>console.log(err));
      

      
  }



  return (
    <div>
      <Nav />
      <br /><br />

      <div>
        <form onSubmit={handleSubmit} className='formpi'>
          <h>Purchase Inventory</h>
          <br /><br />
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
<br/><br/><br/><br/><br/>

      <form onSubmit={handleSubmit1} className='formpi'>
          <h>Add new Inventory</h>
          <br /><br />
          

          <div>
            <label className='labelpi'>Product Name:</label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              onChange={handleChange}
              className='inputpi'
              //value={quantity}
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
              //value={date_of_purchase}
            />
          </div>

          <div>
            <label className='labelpi'>Supplier Name:</label>
            <input
              type="text"
              id="supplier_name"
              name="supplier_name"
              onChange={handleChange}
              className='inputpi'
              //value={date_of_purchase}
            />
          </div>

          <div>
            <label className='labelpi'>Supplier ID:</label>
            <input
              type="number"
              id="supplier_id"
              name="supplier_id"
              onChange={handleChange}
              className='inputpi'
              //value={date_of_purchase}
            />
          </div>

          <div>
            <label className='labelpi'>Purchase Price (Rs):</label>
            <input
              type="number"
              id="purchase_price"
              name="purchase_price"
              onChange={handleChange}
              className='inputpi'
              //value={date_of_purchase}
            />
          </div>

          <div>
            <label className='labelpi'>Lead Time (Days):</label>
            <input
              type="number"
              id="lead_time"
              name="lead_time"
              onChange={handleChange}
              className='inputpi'
              //value={date_of_purchase}
            />
          </div>

          <div>
            <label className='labelpi'>Supplier Contact Number:</label>
            <input
              type="number"
              id="sup_con"
              name="sup_con"
              onChange={handleChange}
              className='inputpi'
              //value={date_of_purchase}
            />
          </div>

          <button className='butpi' type="submit">Submit</button>
        </form>
      
    </div>
  );
}
