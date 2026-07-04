import WishList from "../../pages/WishList/WishList";
import "./ProductCard.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product , setCartItems , handleAddToCart, ToggleWishList, wishList}) {

  const navigate=useNavigate()

  const inWishList=wishList.some((item)=>
    item.id===product.id
  )||false

  const handleclick =()=>{
    console.log("clicked on product card")
    navigate(`/products/${product.id}`)
  }

  return(
    <div className="productCard">
    
      <div onClick={()=>handleclick()}>
          <img className="product-card-image" src={product.thumbnail} alt={product.title} />
          <div className="product-content">
          <h2 className="product-title" >{product.title}</h2>
          </div>
      </div>
      <h3>Price: ${product.price}</h3>
      <button
        className="add-wishlist-btn"
        onClick={()=>ToggleWishList(product)}
      >
        {inWishList? "❤️":"🤍"}
      </button>
      <button 
        className="add-cart-btn"
        onClick={()=>handleAddToCart(product)}
      >
        Add to Cart
      </button>
      
    </div>
  );
}