import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Signupravin() {

  const[values, setValues] =useState({
    name: '',
    email: '',
    password: '',
    conform_password: ''
})
console.log(values)
const handleChange=(event) =>{
  setValues({...values,[event.target.name]:event.target.value})
}
const handleSubmit = (event) => {
  event.preventDefault();
  if(values.password !== values.conform_password){
      alert("Password does not match");}
  else if(!values.name || !values.email || !values.password || !values.conform_password){
     alert("Enter data for all fields");
  }
   
  else{
  axios.post("http://localhost:8080/hansavillagehotel/newsign",values)
  .then(res=>alert("Successfully Registered"))
  .then(res=>navigate('/'))
  .catch(err=>console.log(err));
  }

  
}
let navigate= useNavigate();
  return (
    <div>
      <h2>Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Name</strong>
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          id="name"
          //value={values.name}
          onChange={handleChange}
          required
        ></input>
        <label>
          <strong>Email</strong>
        </label>
        <input
          type="email"
          placeholder ="Enter Email"
          name="email"
          id="email"
          //value={values.email}
          onChange={handleChange}
          required
        ></input>
        <label>
          <strong>Password</strong>
        </label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          id="password"
          //value={values.password}
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          placeholder="Conform Password"
          name="conform_password"
          id="conform_password"
          //value={values.conform_password}
          onChange={handleChange}
          required
        ></input>
        <input type="submit" value="Signup" name="submit-btn" />
      </form>
      <div className='lastword'>
                       
                        <div styles="text-color:blue" onClick={()=>{navigate("/parent")}}>
                        
                        </div>
                    </div>
    </div>
  );
}

export default Signupravin;
