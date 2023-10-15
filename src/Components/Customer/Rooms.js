import './Booking.css';

export function Rooms(props){
    return(
        <div className='RoomList'>
            <div key={props.id} className='RoomCard'>
                <img src={props.imageR} alt='Room.img' className='RoomImage'></img>
                <div className='RoomCard_Content'></div>
                <div className='RoomID'>Room ID:{props.idR}</div>
                <div className='Availability'>Availability:{props.availability}</div>
                <div className='Type'>Type:{props.type}</div>
                <div className='RoomPrice'>Rs:{props.priceR}</div>
            </div>
        </div>
    );
}