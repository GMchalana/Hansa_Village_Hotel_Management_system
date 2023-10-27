import React from 'react'
import './Popup_orders.css';

function Popup_orders(props) {
  return (props.trigger) ? (
    <div>
      
      


    <div className='popup'>
   
        <div className='popup_inner'>
        <br/>
        <br/><br/><br/><br/><br/><br/>
      <br/>
    
      
          
          <div className='new'>
          
          
            <button className='close_btn' onClick={() => props.setTrigger(false)}>Close</button>
            </div>
            <br/><br/><br/><br/><br/><br/>
      <br/>
            {props.children}
            
        </div>
        </div>

    </div>
  ): "";
}

export default Popup_orders