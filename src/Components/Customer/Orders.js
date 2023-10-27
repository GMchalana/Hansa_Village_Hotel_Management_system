import React from 'react'
import Nav from './Nav';
import './Orders.css';
import Popup_orders from './Popup_orders';
import { useState } from 'react';
import axios from 'axios';

//this importings are for Card Component
import {Product} from './Product';
import contents from './Content';

export default function Orders() {

  const[values, setValues] =useState({
    item: '',
    selected_item: '',
    order_type: '',
    required_time: '',
    table_number: '',
   
})

const [selectedCardName, setSelectedCardName] = useState('');

const handleChange=(event) =>{
    setValues({...values,[event.target.name]:event.target.value})
}

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/hansavillagehotel/meal_order",values)
    .then(res=>console.log("Registration Successfully"))
    .catch(err=>console.log(err));

    
}



const [cardsData, setCardsData] = useState([]);

  const [buttonPopup, setButtonPopup] = useState(false)

  return (
    <div className='container'>

      <Nav/>
      <br/>

      
      



      <div className='head'>
        Food Items
      </div>

      <div className='Orders' >
        {contents.map((contents, index) =>(
          <div
          onClick={() => {
            setSelectedCardName(contents.name); // Set the selected card's name
            setButtonPopup(true);
          }}
          key={index}
        >
          <div onClick={()=> setButtonPopup(true)}> 
          <Product
          key={contents.id}
          name={contents.name}
          ids={contents.ids}
          size={contents.size}
          price={contents.price}
          image={contents.image}
          />
          </div>
          </div>
        ))}
      </div>

      <div>
          {/* <input
            type="submit"
            value="Place Order"
            className="place_order"
            placeholder="Order Your Meal"
            onClick={()=> setButtonPopup(true)}
            required
          /> */}
          <div>
            
            <Popup_orders trigger={buttonPopup} setTrigger={setButtonPopup}>

<h2>Order Your Meal</h2>

<form className='formo' onSubmit={handleSubmit}>

  <div>
    <label className='labelo'>Item:</label>
    <input 
      type="text"
      id="item"
      name="item"
      onChange={handleChange}
      className='inputo'
      value={selectedCardName}
      
    />
  </div>

  <div>
    <label className='labelo'>Selected Items:</label>
    <input
      type="text"
      id="selected_item"
      name="selected_item"
      onChange={handleChange}
      className='inputo'
      //value={selectedCardName}
    />
  </div>

  <div>
    <label className='labelo'>Order Type:</label>
    <select className='inputo' name='Order Type'>
    <option value={"Take Away"}>Take Away</option>
    <option value={"Take Away"}>Dine In</option> 
    </select>
      
  </div>

  <div>
    <label className='labelo'>required time:</label>
    <input
      type="text"
      id="required_time"
      name="required_time"
      onChange={handleChange}
      className='inputo'
    />
  </div>

  <div>
    <label className='labelo'>Table Number(If Dine-in):</label>
    <input
      type="text"
      id="table_number"
      name="table_number"
      onChange={handleChange}
      className='inputo'
    />
  </div>

  <button className='buto' type="submit">Submit</button>
</form>


</Popup_orders>
</div>
      </div>

      
  

    </div>
  )
}