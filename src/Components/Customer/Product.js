import{FaShoppingCart,FaRegBookmark,FaStar,FaFireAlt} from 'react-icons/fa';
import './Orders.css';


export function Product(props){
    return(
        <div className='ProductList'>
            <div key={props.id} className='ProductCard'>
                <img src={props.image} alt='Product.img' className='ProductImage'></img>

                {/* <FaShoppingCart className='{ProductCard_Cart}'></FaShoppingCart>
                <FaRegBookmark className='{ProductCard_Wishlist}'/>
                <FaFireAlt className='{ProductCart_fastSelling}'/> */}

                {/* <div className='displayStack_2'>
                    <div className='ProductRating'>
                        {[...Array(props.rating)].map((index)=>(
                            <FaStar id ={index+1} key={index}/>
                        ))}
                    </div>
                </div> */}
                <div className='ProductCard_Content'></div>
                <div className='ProductName'>{props.name}</div>
                
                
                
                <div className='Size'>Size:{props.size}</div>
                <div className='ProductPrice'>Rs:{props.price}</div>
            </div>
        </div>
    );
}