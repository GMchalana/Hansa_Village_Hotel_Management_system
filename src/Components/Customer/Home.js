import React from 'react'
import './Home.css';
import logo from '../Images/logo.jpeg';
import background from '../Images/background.png';
import {useNavigate} from "react-router-dom";
import Nav from './Nav';

export default function Home() {

    let navigate= useNavigate();

  return (
    <div>
           <Nav/>
                <div className='leftpanel'>
                  
                    <br/>
                    <div>
                        <img className="logo" src={logo} alt="Form" />
                    </div>
                
                 
                        <p className='topic'>Welcome to Hansa Village Hotel</p>
                        <br/>
                        <br/>

                        <p className='paragraph'>Indulge in a culinary journey with a delightful blend of flavors and impeccable service. 
                            From mouthwatering dishes to a cozy ambiance, we strive to create a memorable dining 
                            experience for you. Join us for an unforgettable culinary adventure that will satisfy 
                            your senses and leave you craving for more.</p>

                    
                    <div>
                        <input
                        type="submit"
                        id="username_or_Email"
                        name="Full Name"
                        value="Order Your Meal"
                        //value={formData.username_or_Email}
                        //onChange={handleChange}
                        className="meal"
                        placeholder="Order Your Meal"
                        required
                        />
                    </div>
                    <br/>
                    <div>
                        <input
                        type="submit"
                        id="username_or_Email"
                        name="Full Name"
                        value="Book Your Room or Hall"
                        //value={formData.username_or_Email}
                        //onChange={handleChange}
                        className="room"
                        placeholder="Book Your Room or Hall"
                        required
                        />
                    </div>
                

                    
                </div>

                 
              
               


                <div>
                    <img className="back2" src={background} alt="Form" />
                </div>

                 
        </div>
  )
}
