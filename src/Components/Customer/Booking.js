import React from 'react'
import './Booking.css';
import Nav from './Nav';
import { useState } from 'react';
import Popup_booking from './Popup_booking';
import axios from 'axios';
import {Rooms} from './Rooms';
//import { Hall } from './Hall';
import contents from './RoomContent';
import ImagesH from '../Images/Hall.jpg';

export default function Booking() {


  const[values, setValues] =useState({
    number_of_guest: '',
    room_number: '',
    date_and_time: '',
    duration: '',
})

const handleChange=(event) =>{
    setValues({...values,[event.target.name]:event.target.value})
}

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/hansavillagehotel/room_booking",values)
    .then(res=>console.log("Registration Successfully"))
    .catch(err=>console.log(err));

    
}




  const [buttonPopup, setButtonPopup] = useState(false)
  return (
    <div className='container'>
        <Nav/>

        <br/>
      <div className='head'>
        Rooms
      </div>

      <div className='Rooms'>
        {contents.map(contents =>(
          <Rooms
          key={contents.id}
          name={contents.name}
          idR={contents.idR}
          type={contents.type}
          priceR={contents.priceR}
          imageR={contents.imageR}
          />
        ))}
      </div>
      <div className='head'>
        Hall
      </div>
     
      <div>
      <div className='HallCard'>
        <img className="Hall" src={ImagesH} alt="Hall.img" />
        <div className='Hdetail'>
          <h4 className='Ava'>Availability:Yes</h4>
          <h5 className='PriceH'>Charge Per Day:Rs 1000/=</h5>
        </div>
      </div>
      </div>

      <div>
          <input
            type="submit"
            value="Make a Reservation"
            className="book"
            placeholder="book"
            onClick={()=> setButtonPopup(true)}
            required
          />
      </div>

      <Popup_booking trigger={buttonPopup} setTrigger={setButtonPopup}>

          <h2>My Form</h2>
          <form className='formb' onSubmit={handleSubmit}>

            <div>
              <label className='labelb'>Number Of Guest:</label>
              <input
                type="text"
                id="number_of_guest"
                name="number_of_guest"
                onChange={handleChange}
                className='inputb'
              />
            </div>

            <div>
              <label className='labelb'>Room Number:</label>
              <input
                type="text"
                id="room_number"
                name="room_number"
                onChange={handleChange}
                className='inputb'
              />
            </div>

            <div>
              <label className='labelb'>Arrival Date & Time:</label>
              <input
                type="text"
                id="date_and_time"
                name="date_and_time"
                onChange={handleChange}
                className='inputb'
              />
            </div>

            <div>
              <label className='labelb'>Duration:</label>
              <input
                type="text"
                id="duration"
                name="duration"
                onChange={handleChange}
                className='inputb'
              />
            </div>

            <button className='butb' type="submit">Submit</button>
          </form>


      </Popup_booking>


    </div>
  )
}
