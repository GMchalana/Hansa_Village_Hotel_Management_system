import './Booking.css';

export function Rooms(props){
    return(
        <div className='RoomList'>
            <div key={props.id} className='RoomCard'>
                <img src={props.imageR} alt='Room.img' className='RoomImage'></img>
                <div className='RoomCard_Content'></div>
                <div className='RoomID'>Room ID:{props.id}</div>
                {/* <div className='Availability'>Availability:{props.availability}</div> */}
                <div className='Type'>Type:{props.type}</div>
                <div className='RoomPrice'>Charge per hours:Rs{props.price}</div>
            </div>
        </div>
    );
}