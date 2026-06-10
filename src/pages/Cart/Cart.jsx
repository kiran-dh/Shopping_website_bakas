import "./Cart.css"
import { Link } from "react-router-dom";



export default function Cart({cartItems, increaseQuantity , decreaseQuantity}){

    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
            🛒 Your cart is empty
            </div>
        );
    }
    
    return(
        <div className="cart-container">
            {cartItems.map((item) => (
                <div
                key={item.id}
                className="cart-item"
                >
                <img
                    className="cart-image"
                    src={item.thumbnail}
                    alt={item.title}
                />

                <div className="cart-details">
                    <h3 className="cart-title">
                    {item.title}
                    </h3>

                    <p className="cart-price">
                    ${item.price}
                    </p>
                    <p className="cart-subtotal">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>

                <div className="quantity-controls">
                    <button
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item)}
                    >
                    -
                    </button>

                    <span className="quantity">
                    {item.quantity}
                    </span>

                    <button
                    className="quantity-btn"
                    onClick={() => increaseQuantity(item)}
                    >
                    +
                    </button>
                    
                </div>
                </div>
                
            ))}
            <div className="cart-total">
                Total: ${total.toFixed(2)}
            </div>
            <Link
                to="/checkout"
                className="checkout-btn"
            >
                Checkout
            </Link>
        </div>
    )
}