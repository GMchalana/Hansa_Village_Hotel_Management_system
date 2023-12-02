import React, { useState , useEffect} from 'react';
import Nav from './Nav';
import './Orders.css';
import Popup_orders from './Popup_orders';
import axios from 'axios';

import { Product } from './Product';
import contents from './Content';

export default function Orders() {

  const [selectedCardName, setSelectedCardName] = useState('');
  const [selectedCardPrice, setSelectedCardPrice] = useState('');
  // console.log("jjj"+selectedCardName);


  const [values, setValues] = useState({
    item: '',
    quantity: '',
    unit_price:'',
    order_type: 'Take Away', // Set default value
    required_time: '',
    table_number: '',
    customer_name: localStorage.getItem('userName'),
    customer_id: localStorage.getItem('userId'),
    mobile_number: localStorage.getItem('userMobile'),
  });

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("Item value:", values.item);
    axios
      .post('http://localhost:8080/hansavillagehotel/meal_ordercus', values)
      .then((res) => {
        if (res.data === 'An error occurred') {
          alert('Error: ' + res.data);
        } else {
          alert('Order placed successfull');
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
            // console.log(contents.Name);
            setSelectedCardName(contents.Name);
            setSelectedCardPrice(contents.Price); // Set the selected card's name
            setValues({
              ...values,
              item: contents.Name,
              unit_price: contents.Price,
            });
            // setValues({
            //   ...values,
            //   unit_price: contents.Price,
            // });
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
              <label className='labelo'>Unit Price:</label>
              <input
                type='text'
                id='unit_price'
                name='unit_price'
                onChange={handleChange}
                className='inputo'
                value={selectedCardPrice}
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
              <label className='labelo'>Waiting Time:</label>
              <input
                type='text'
                id='required_time'
                name='required_time'
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
