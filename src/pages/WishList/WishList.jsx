import "./WishList.css"

export default function WishList({wishList,ToggleWishList,handleAddToCart}){

    if (wishList.length === 0) {
        return (
            <div className="empty-wishlist">
                ❤️ Your wishlist is empty
            </div>
        );
    }

    return(
            <div className="wishlist">
                {wishList.map((product)=>
                <div key={product.id}>
                    <img className="product-card-image" src={product.thumbnail} alt={product.title} />
                    <div className="product-content">
                    <h2 className="product-title" >{product.title}</h2>
                    </div>
                <h3>Price: ${product.price}</h3>
                <button
                    className="add-wishlist-btn"
                    onClick={()=>ToggleWishList(product)}
                >
                    Remove ❤️
                </button>
                <button 
                    className="add-cart-btn"
                    onClick={()=>handleAddToCart(product)}
                >
                    Add to Cart
                </button>
                </div>
                )}
            </div>
    )
}