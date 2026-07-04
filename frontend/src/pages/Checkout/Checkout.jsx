import { useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cartItems, setCartItems}) {

    const Navigate=useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const subtotal = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const tax = subtotal * 0.05;
    const shipping = 10;
    const total = subtotal + tax + shipping;

    const handlePlaceOrder = () => {
        if (
            !name ||
            !email ||
            !phone ||
            !address
        ) {
            alert("Please fill all fields");
            return;
        }
        setCartItems([])
        Navigate("/orderSuccess")
    };

    return (
        <div className="checkout-container">
            <h1>Order Summary</h1>

            {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="checkout-item"
                >
                    <div>
                        <h3>{item.title}</h3>
                        <p>
                            ${item.price} × {item.quantity}
                        </p>
                    </div>

                    <div>
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            ))}

            <div className="checkout-summary">
                <div>
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div>
                    <span>Tax (5%):</span>
                    <span>${tax.toFixed(2)}</span>
                </div>

                <div>
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>

                <hr />

                <div className="checkout-total">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
                <div className="customer-info">
                    <h2>Customer Information</h2>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <textarea
                        placeholder="Delivery Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="4"
                    />
                </div>
            <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
            >
                Place Order
            </button>
        </div>
    );
}