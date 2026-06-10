import "./App.css"
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import SideBar from "./components/SideBar/SideBar"
import { useState, useEffect} from "react"
import { Routes , Route} from "react-router-dom"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Cart from "./pages/Cart/Cart"
import AboutUs from "./pages/AboutUs/AboutUs"
import Privacy from "./pages/Privacy/Privacy"
import Terms from "./pages/Terms/Terms"
import ContactUs from "./pages/ContactUs/ContactUs"
import WishList from "./pages/WishList/WishList"
import Checkout from "./pages/Checkout/Checkout"
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

function App(){

    const[searchText,setSearchText]=useState("");
    const[cartItems,setCartItems]=useState(()=>{
        const savedCart = localStorage.getItem("cartItems")

        if(savedCart){
            return JSON.parse(savedCart)
        }
        return[]
    })

    useEffect(()=>{
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        )
    },[cartItems])

    const [darkMode, setDarkMode] = useState(() => {
        try {
            const savedTheme = localStorage.getItem("darkMode");

            return savedTheme
                ? JSON.parse(savedTheme)
                : false;
        } catch {
            return false;
        }
    });

    useEffect(()=>{
        localStorage.setItem(
            "darkMode",
            JSON.stringify(darkMode)
        )
    },[darkMode])

    const ToggleTheme=()=>{
        setDarkMode(prev=>!prev);
    }

    const handleAddToCart=(product)=>{
        const existingItem = cartItems.find(
            item => item.id === product.id
        );
        if(!existingItem){
            setCartItems(prev=>[...prev,{...product,quantity:1}])
        } 
        else{
            setCartItems(
                cartItems.map((item)=>{
                    if(item.id===product.id){
                        return{...item,quantity:item.quantity+1}
                    } else{
                        return item
                    }
                })
            )
        }
    }

    const increaseQuantity=(product)=>{
        setCartItems(    
            cartItems.map((item)=>{
                if(item.id===product.id){
                    return{...item,quantity:item.quantity+1}
                } else {
                    return item
                }
            })
        )
    }

    const decreaseQuantity = (product) => {
    const existingItem = cartItems.find(
        item => item.id === product.id
    );

    if (existingItem.quantity === 1) {
        setCartItems(
        cartItems.filter(
            item => item.id !== product.id
        )
        );
    } else {
        setCartItems(
        cartItems.map(item => {
            if (item.id === product.id) {
            return {
                ...item,
                quantity: item.quantity - 1
            };
            }

            return item;
        })
        );
    }
    };

    const[wishList,setWishList]=useState(()=>{
        const data =localStorage.getItem("wishList")
        if(data){
            return JSON.parse(data)
        }
        return[]
    })
    
    useEffect(()=>{
        localStorage.setItem(
            "wishList",
            JSON.stringify(wishList)
        )
    },[wishList])

    const ToggleWishList =(product)=>{
        const existWishList=wishList.find((item)=>item.id===product.id)

        if(existWishList){
            setWishList(
                wishList.filter((item)=>item.id!==product.id)
            )
        } else{
            setWishList(
                [...wishList,product]
            )
        }
    }



    return(
        <div className={darkMode ? "dark-theme" : "light-theme"}>
            <div className="app">
                <SideBar/>
                
                <div className="main-content">
                    <Header
                        searchText={searchText}
                        setSearchText={setSearchText}
                        cartItems={cartItems}
                        darkMode={darkMode}
                        ToggleTheme={ToggleTheme}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={<Home 
                                searchText={searchText}  
                                setCartItems={setCartItems} 
                                handleAddToCart={handleAddToCart}
                                ToggleWishList={ToggleWishList}
                                wishList={wishList}/>}
                        />
                        <Route 
                            path="/products/:id"
                            element={<ProductDetails 
                            handleAddToCart={handleAddToCart}
                            ToggleWishList={ToggleWishList}
                            wishList={wishList}/>}
                        />
                        <Route
                            path="/cart"
                            element={
                            <ProtectedRoute>
                                <Cart
                                    cartItems={cartItems}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity} />
                            </ProtectedRoute>}
                        />
                        <Route
                        path="/aboutUs"
                        element={<AboutUs/>} />
                        <Route
                        path="/Privacy"
                        element={<Privacy/>} />
                        <Route
                        path="/terms"
                        element={<Terms/>} />
                        <Route
                        path="/contactUs"
                        element={<ContactUs/>}/>
                        <Route
                            path="/wishList"
                            element={
                            <ProtectedRoute>
                                <WishList
                                    wishList={wishList}
                                    ToggleWishList={ToggleWishList}
                                    handleAddToCart={handleAddToCart}
                                />
                            </ProtectedRoute>}
                        />
                        <Route
                            path="/checkout"
                            element={
                            <ProtectedRoute>
                                <Checkout
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                />
                            </ProtectedRoute>}
                        />

                        <Route
                            path="/orderSuccess"
                            element={<OrderSuccess />}
                        />
                    </Routes>
                    
                </div>
            </div>
        </div>
    )
}

export default App;