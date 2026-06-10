import "./Header.css";
import { Link } from "react-router-dom";

function Header({
  searchText,
  setSearchText,
  cartItems,
  darkMode,
  ToggleTheme
}) {
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="header">
      <h1 className="store-title">
        Bakas
      </h1>

      <div className="search-container">
        <input
          className="SearchBar"
          type="text"
          value={searchText}
          placeholder="🔍 Search products..."
          onChange={(e) =>
            setSearchText(e.target.value)
          }
        />
      </div>

      <div className="header-actions">
        <Link className="cart-badge" to="/cart">
          🛒 {cartCount}
        </Link>

        <button
          className="theme-btn"
          onClick={ToggleTheme}
        >
          {darkMode
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

export default Header;