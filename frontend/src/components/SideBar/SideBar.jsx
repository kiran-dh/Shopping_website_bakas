import "./SideBar.css"
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {

  const{user,loginWithGoogle,logout}=useAuth();

  return (
    <aside className="sidebar">
      <Link to="/">Home</Link>
      <hr />
      <Link to="/cart">Cart</Link>
      <hr />
      <Link to="/wishList">WishList</Link>
      <hr />
      <Link to="/aboutUs">About Us</Link>
      <hr />
      <Link to="/privacy">Privacy Policy</Link>
      <hr />
      <Link to="/terms">Terms & Conditions</Link>
      <hr />
      <Link to="/contactUs">Contact Us</Link>
      <div className="user-section">
        {user ?
          (
            <div>
              <div className="user-name">👤{user.displayName}</div>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          ):(
            <button className="login-btn" onClick={loginWithGoogle}>Login With Google</button>
            
          )
        }
      </div>
    </aside>
  );
}