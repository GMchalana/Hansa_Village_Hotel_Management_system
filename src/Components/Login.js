import React, { useState } from 'react'
import './Login.css';
import logo from './Images/logo.jpeg';
import background from './Images/background.png';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Validation from './LoginValidation';

function Login() {

    const[values, setValues] = useState({
        User_Name:'',
        password:''
    })

    const [errors, setErrors] = useState({})

    const handleSubmit = (event) =>{
        event.preventDefault();
        //setErrors(Validation(values));

        //if(errors.User_Name ==="" && errors.password === ""){
            axios.post("http://localhost:8080/hansavillagehotel", values)
            .then(res => {
                console.log(res.data.data.otherDetails[0]['Full_Name']);
                if(res.data.success){
                    localStorage.setItem('userRole', res.data.data.role);
                    localStorage.setItem('userId', res.data.data.otherDetails[0]['User_Id']);
                    localStorage.setItem('userName', res.data.data.otherDetails[0]['Full_Name']);
                    localStorage.setItem('userMobile', res.data.data.otherDetails[0]['Mobile_Number']);
                }

                if(res.data.data.role === "customer"){
                    navigate('/CustomerHome');
                }else if(res.data.data.role === "owner"){
                    navigate('/Owner/CustomerDetails')
                }else if(res.data.data.role === "kitchen_manager"){
                    navigate('/KitchenManager/AvailableOrders')
                }else if(res.data.data.role === "inventory_manager"){
                    navigate('/InventoryManager/InventoryDetails')
                }else if(res.data.data.role === "reservation_manager"){
                    navigate('/ReservationManager/Reservations')
                }
                else{
                    alert("No record exist")
                }
            })
            .catch(err => console.log(err));
        //}
    }


    const handleInput = (event) =>{
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    }

   

    let navigate= useNavigate();
    
    return (
        <div>
            <section>
                <div className='leftpanel'>
                    <br/>

                    <div>
                        <img className="logo" src={logo} alt="Form" />
                    </div>
                
                    <br/>
                        <p className='topic'>Welcome to Hansa Village Hotel</p>
                    <br/>




                    <form onSubmit={handleSubmit}>
                    <div>
                        

                        
                        <input
                        type="text"
                        id="User_Name"
                        name="User_Name"
                        //value={userCredentials.User_Name}
                        onChange={handleInput}
                        className="inputBx1"
                        placeholder="username"
                        required
                        />
                        {errors.User_Name && <span>{errors.User_Name}</span>}
                    </div>
                    <br/>

                    <div>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        //value={userCredentials.Password}
                        onChange={handleInput}
                        className="inputBx2"
                        placeholder="password"
                        required
                        />
                        {errors.password && <span>{errors.password}</span>}
                    </div>
                    <br/>

                    <div>
                        <input
                        type="submit"
                        name="submit-btn"
                        value="Login"
                        className="inputBxL"
                        />
                    </div>
                    </form>
                    
                    <br/>

                    <div className='lastword'>
                        New Customer?
                        <div styles="text-color:blue" onClick={()=>{navigate("/Signup")}}>
                            Sign up
                        </div>

                    </div>
                    
                    
                </div>


                <div>
                    <img className="back" src={background} alt="Form" />
                </div>

            </section>      
        </div>

    );
}

export default Login;