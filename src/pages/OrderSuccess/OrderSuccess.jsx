import { Link } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
    return (
        <div className="success-page">
            <div className="success-icon">
                🎉
            </div>

            <h1>
                Order Placed Successfully!
            </h1>

            <p>
                Thank you for shopping with us.
                Your order has been received and is being processed.
            </p>

            <Link
                to="/"
                className="continue-shopping-btn"
            >
                Continue Shopping
            </Link>
        </div>
    );
}