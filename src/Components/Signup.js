import React from 'react'
import './Signup.css';
import logo from './Images/logo.jpeg';
import background from './Images/background.png';
import {useNavigate} from "react-router-dom";
import Login from './Login';
import { useState } from 'react';
import axios from 'axios';



export default function Signup() {
    
    const[values, setValues] =useState({
        full_name: '',
        user_name: '',
        mobile_number: '',
        address: '',
        password: '',
        conform_password: ''
    })

    const handleChange=(event) =>{
        setValues({...values,[event.target.name]:event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(values.password !== values.conform_password){
            alert("Password does not match");}
        else if (!isValidMobileNumber(values.mobile_number)) {
            alert("Invalid mobile number format");
        }
        else if(!values.full_name || !values.user_name || !values.mobile_number || !values.address || !values.password || !values.conform_password){
           alert("Enter data for all fields");
        }
         
        else{
        axios.post("http://localhost:8080/hansavillagehotel/signu",values)
        .then(res=>alert("Successfully Registered"))
        .then(res=>navigate('/'))
        .catch(err=>console.log(err));
        }

        
    }

    function isValidMobileNumber(number) {
        // Define a regular expression pattern for a common mobile number format.
        // Modify this pattern to match the specific format you require.
        const pattern = /^\+\d{11}$/; // Example: +1-1234567890
    
        return pattern.test(number);
    }
      


      




    let navigate= useNavigate();

  return (
    <div>
            
                <div className='leftpanel'>
                  
                    <br/>
                    <div>
                        <img className="logo" src={logo} alt="Form" />
                    </div>
                
                 
                        <p className='topic'>Welcome to Hansa Village Hotel</p>
                    <form onSubmit={handleSubmit}>

                    <div className='pad'>
                        <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        //value={full_name}
                        onChange={handleChange}
                        className="inputBx1"
                        placeholder="Full Name"
                        required
                        />
                    </div>
                 <br/>

                    <div className='pad'>
                        <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        //value={user_name}
                        onChange={handleChange}
                        className="inputBx1"
                        placeholder="User Name"
                        required
                        />
                    </div>
                    <br/>

                    <div className='pad'>
                        <input
                        type="text"
                        id="mobile_number"
                        name="mobile_number"
                        //value={mobile_number}
                        onChange={handleChange}
                        className="inputBx1"
                        placeholder="Mobile Number"
                        required
                        />
                    </div>
                    <br/>

                    <div className='pad'>
                        <input
                        type="text"
                        id="address"
                        name="address"
                        //value={address}
                        onChange={handleChange}
                        className="inputBx1"
                        placeholder="Address"
                        required
                        />
                    </div>
                    <br/>

                    <div className='pad'>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        //value={password}
                        onChange={handleChange}
                        className="inputBx1"
                        placeholder="Password"
                        required
                        />
                    </div>
                    <br/>

                    <div className='pad'>
                        <input
                        type="password"
                        id="conform_password"
                        name="conform_password"
                        //value={conform_password}
                        onChange={handleChange}
                        className="inputBx1"
                        placeholder="Conform Password"
                        required
                        />
                    </div>
                    <br/>
                   

                    <div className='pad'>
                        <input
                        type="submit"
                        name="submit-btn"
                        value="Signup"
                        className="inputBxL"
                        />
                    </div>

                    </form>

                    <div className='lastword'>
                        Already have an account?
                        <div styles="text-color:blue" onClick={()=>{navigate("/")}}>
                            Login
                        </div>
                    </div>

                   <br/>
              
                </div>


                <div>
                    <img className="back" src={background} alt="Form" />
                </div>

                 
        </div>
  )
}
