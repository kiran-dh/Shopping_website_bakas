import "./ProductDetails.css"
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import WishList from "../WishList/WishList";

function ProductDetails({handleAddToCart,ToggleWishList,wishList}) {
    const[product,setProduct]=useState(null)
    const {id}=useParams();
    const[isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        const fetchProduct =async()=>{
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`)
                const data = await response.json();
                setProduct(data)
            } catch (error) {
                console.log("Error Fetching Data")
            } finally{
                setIsLoading(false)
            }
        }
        fetchProduct();
    },[id])

    console.log("wishList", wishList);
console.log("product", product);

    const inWishList =
        wishList?.some(
            (item) => item?.id === product?.id
        ) || false;

    if(isLoading) return <h1>Loading Content Please Wait....</h1>

    return (
    <div className="product-details">
        <img
        className="product-detais-image"
        src={product.thumbnail}
        alt={product.title}
        />

        <div className="product-info">
        <h1 className="product-title">
            {product.title}
        </h1>

        <p className="product-rating">
            ⭐ Rating: {product.rating}
        </p>

        <p className="product-stock">
            📦 Stock: {product.stock}
        </p>

        <p className="product-price">
            ${product.price}
        </p>

        <p className="product-description">
            {product.description}
        </p>

        <button 
            className="add-wishlist-btn"
            onClick={()=>ToggleWishList(product)}
        >
            {inWishList? "❤️":"🤍"}
        </button>

        <button className="add-cart-btn" onClick={()=>handleAddToCart(product)}>
            Add To Cart
        </button>
        </div>
    </div>
    );
}

export default ProductDetails;