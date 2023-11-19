import React, { useState , useEffect} from 'react';
import Nav from './Nav';
import './Orders.css';
import Popup_orders from './Popup_orders';
import axios from 'axios';

import { Product } from './Product';
import contents from './Content';

export default function Orders() {
  const [values, setValues] = useState({
    item: '',
    quantity: '',
    order_type: 'Take Away', // Set default value
    required_time: '',
    table_number: '',
    customer_name:'',
    customer_id:'',
    mobile_number:'',
  });

  const [selectedCardName, setSelectedCardName] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/hansavillagehotel/meal_ordercus', values)
      .then((res) => {
        if (res.data === 'Success') {
          alert('Order placed successfully');
        } else {
          alert('Error: ' + res.data);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('An error occurred while placing the order.');
      });
  };

  const [buttonPopup, setButtonPopup] = useState(false)







  const[data,setData]=useState([])
  useEffect(()=>{
      fetch("http://localhost:8080/hansavillagehotel/add_meals")
      .then(res => res.json())
      .then(data=>setData(data))
      .catch(err => console.log(err));
  },[])

  return (
    <div className='container'>
      <Nav />
      <br />
      <div className='head'>Food Items</div>
      <div className='Orders' >
        {data.map((contents, index) =>(
          <div
          onClick={() => {
            setSelectedCardName(contents.Name); // Set the selected card's name
            setButtonPopup(true);
          }}
          key={index}
        >
          <div onClick={()=> setButtonPopup(true)}> 
          <Product
          key={contents.id}
          name={contents.Name}
          ids={contents.ids}
          size={contents.Size}
          price={contents.Price}
          image={'http://localhost:8080/hansavillagehotel/'+contents.Image}
          />
          </div>
          </div>
        ))}
      </div>
      <div>
        <Popup_orders trigger={buttonPopup} setTrigger={setButtonPopup} className='popup'>

          <h2>Order Your Meal</h2>
          <form className='formo' onSubmit={handleSubmit}>
            <div>
              <label className='labelo'>Item:</label>
              <input
                type='text'
                id='item'
                name='item'
                onChange={handleChange}
                className='inputo'
                value={selectedCardName}
              />
            </div>
            <div>
              <label className='labelo'>Quantity:</label>
              <input
                type='text'
                id='quantity'
                name='quantity'
                onChange={handleChange}
                className='inputo'
              />
            </div>
            <div>
              <label className='labelo'>Order Type:</label>
              <select
                className='inputo'
                name='order_type'
                onChange={handleChange}
                value={values.order_type}
              >
                <option value='Take Away'>Take Away</option>
                <option value='Dine In'>Dine In</option>
              </select>
            </div>
            <div>
              <label className='labelo'>Required Time:</label>
              <input
                type='text'
                id='required_time'
                name='required_time'
                onChange={handleChange}
                className='inputo'
              />
            </div>
            <div>
              <label className='labelo'>Table Number (If Dine-in):</label>
              <input
                type='text'
                id='table_number'
                name='table_number'
                onChange={handleChange}
                className='inputo'
              />
            </div>

            <div>
              <label className='labelo'>Customer Name (If Dine-in):</label>
              <input
                type='text'
                id='customer_name'
                name='customer_name'
                onChange={handleChange}
                className='inputo'
              />
            </div>

            <div>
              <label className='labelo'>Customer ID (If Dine-in):</label>
              <input
                type='text'
                id='customer_id'
                name='customer_id'
                onChange={handleChange}
                className='inputo'
              />
            </div>

            <div>
              <label className='labelo'>Mobile Number (If Dine-in):</label>
              <input
                type='text'
                id='mobile_number'
                name='mobile_number'
                onChange={handleChange}
                className='inputo'
              />
            </div>

            <button className='buto' type='submit'>
              Submit
            </button>
          </form>
        </Popup_orders>
      </div>
    </div>
  );
}
