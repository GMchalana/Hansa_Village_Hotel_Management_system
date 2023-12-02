import React, { useState, useEffect } from 'react';
import './Booking.css';
import Nav from './Nav';
import Popup_booking from './Popup_booking';
import Popup_booking_hall from './Popup_booking_hall';
import axios from 'axios';
import { Rooms } from './Rooms';
import contents from './RoomContent';
import ImagesH from '../Images/Hall.jpg';

export default function Booking() {
  const [roomValues, setRoomValues] = useState({
    customer_id: localStorage.getItem('userId'),
    number_of_guest: '',
    room_number: '',
    date_and_time: '',
    duration: '',
    room_type:'',
    Availability:'',
  });

  const [hallValues, setHallValues] = useState({
    customer_id: localStorage.getItem('userId'),
    number_of_guest: '',
    requirements: '',
    date_and_time: '',
    details: '',
    
  });

  const orderId = roomValues.room_number;

  const updateStatus = (orderId) => {
    fetch(`http://localhost:8080/updateRoomStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Successfully updated the database');
        } else {
          console.error('Error updating order status:', res.statusText);
        }
      })
      .catch((err) => console.error('Error updating order status:', err));
  };

  
  const handleRoomChange = (event) => {
    setRoomValues({ ...roomValues, [event.target.name]: event.target.value });
  };

  const handleHallChange = (event) => {
    setHallValues({ ...hallValues, [event.target.name]: event.target.value });
  };

  const handleRoomSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/hansavillagehotel/room_booking', roomValues)
      .then((res) => {
        if (res.data === 'Error') {
          alert('Error');
        } else {
          alert('Room Booking Successful');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('An error occurred while booking the room.');
      });
  };

  const handleHallSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/hansavillagehotel/hall_booking', hallValues)
      .then((res) => {
        if (res.data === 'Error') {
          alert('Error');
        } else {
          alert('Hall Booking Successful');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('An error occurred while booking the hall.');
      });
  };

  const handleHallSubmitn = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/updateBookingStatus', hallValues)
      .then((res) => {
        if (res.data === 'Error') {
          alert('Error');
        } else {
          alert('Hall status update Successful');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('An error occurred while booking the hall.');
      });
  };


  const [buttonPopup, setButtonPopup] = useState(false)

  const [buttonPopup1, setButtonPopup1] = useState(false)

  const[data,setData]=useState([])
  useEffect(()=>{
      fetch("http://localhost:8080/hansavillagehotel/add_room")
      .then(res => res.json())
      .then(data=>setData(data))
      .catch(err => console.log(err));
  },[])


  const[datah,setDatah]=useState([])
  useEffect(()=>{
      fetch("http://localhost:8080/hansavillagehotel/hall_status")
      .then(res => res.json())
      .then(data=>setDatah(data))
      .catch(err => console.log(err));
  },[])


  return (
    <div className='container'>
      <Nav />
      <br />
      <div className='head'>Rooms</div>
      <div className='Rooms'>
        {data.map((content, index) => (
          <div key={content.idR} onClick={() => setButtonPopup(true)}> 
            <div onClick={() => setRoomValues({ ...roomValues, room_number: content.Room_Id , room_type: content.Type, Availability:content.Availability, category:content.Category})}>
              <Rooms
                id={content.Room_Id}
                idR={content.idR}
                type={content.Type}
                category={content.Category}
                Availability={content.Availability}
                price={content.Charge_per_Day}
                imageR={'http://localhost:8080/hansavillagehotel/'+ content.Image}
              />
            </div>
          </div>
        ))}
      </div>




      <div className='head'>Hall</div>
      <div >
      {datah.map((content1, index) => (
          <div className='HallCard' onClick={() => setButtonPopup1(true)}> 
            <img className='Hall' src={ImagesH} alt='Hall.img' />
              <div className='Hdetail'> 
                <h4 className='Ava'>Availability:{content1.Availability}</h4>
              </div>
            </div>
        ))}
      </div>



      <Popup_booking trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2>Book Your Room</h2>
        <form className='formb' onSubmit={handleRoomSubmit}>
          {/* <div>
            <label className='labelb'>Customer ID:</label>
            <input
              type='text'
              id='customer_id'
              name='customer_id'
              onChange={handleRoomChange}
              className='inputb'
            />
          </div> */}
          <div>
            <label className='labelb'>Room Number:</label>
            <input
              type='text'
              id='room_number'
              name='room_number'
              onChange={handleRoomChange}
              className='inputb'
              value={roomValues.room_number}
            />
          </div>

          <div>
            <label className='labelb'>Room type:</label>
            <input
              type='text'
              id='room_type'
              name='room_type'
              onChange={handleRoomChange}
              className='inputb'
              value={roomValues.room_type}
            />
          </div>


          <div>
            <label className='labelb'>Number Of Guest:</label>
            <input
              type='text'
              id='number_of_guest'
              name='number_of_guest'
              onChange={handleRoomChange}
              className='inputb'
            />
          </div>
          <div>
            <label className='labelb'>Arrival Date & Time:</label>
            <input
              type='date'
              id='date_and_time'
              name='date_and_time'
              onChange={handleRoomChange}
              className='inputb'
            />
          </div>
          <div>
            <label className='labelb'>Duration:</label>
            <input
              type='text'
              id='duration'
              name='duration'
              onChange={handleRoomChange}
              className='inputb'
            />
          </div>
          <button className='butb' type='submit' onClick={() => updateStatus(orderId)}>
            Submit
          </button>
        </form>
      </Popup_booking>

      <Popup_booking_hall trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <h2>Book Your Hall</h2>
        <form className='formb' onSubmit={(event) => { handleHallSubmit(event); handleHallSubmitn(event); }}>
          {/* <div>
            <label className='labelb'>Customer ID:</label>
            <input
              type='text'
              id='customer_id'
              name='customer_id'
              onChange={handleHallChange}
              className='inputb'
            />
          </div> */}
          <div>
            <label className='labelb'>Number Of Guest:</label>
            <input
              type='text'
              id='number_of_guest'
              name='number_of_guest'
              onChange={handleHallChange}
              className='inputb'
            />
          </div>
          <div>
            <label className='labelb'>Requirements:</label>
            <input
              type='text'
              id='requirements'
              name='requirements'
              onChange={handleHallChange}
              className='inputb'
            />
          </div>
          <div>
            <label className='labelb'>Arrival Date & Time:</label>
            <input
              type='date'
              id='date_and_time'
              name='date_and_time'
              onChange={handleHallChange}
              className='inputb'
            />
          </div>
          <div>
            <label className='labelb'>Event Details:</label>
            <input
              type='text'
              id='details'
              name='details'
              onChange={handleHallChange}
              className='inputb'
            />
          </div>
          <button className='butb' type='submit'>
            Submit
          </button>
        </form>
      </Popup_booking_hall>
    </div>
  );
}
