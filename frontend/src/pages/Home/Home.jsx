import "./Home.css"
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api.js";

function Home({searchText,setCartItems,handleAddToCart,ToggleWishList,wishList}){

  const[products,setProducts]=useState([])
  const[isLoading,setIsLoading]=useState(true)
  const[selectedCategory,setSelectedCategory]=useState("All")
  const[sortOption,setSortOption]=useState("default")
  const[rating,setRating]=useState("all")

  const categories = [
    "All",
    ...new Set(
      products.map(product=>product.category)
    )
  ]
  const filteredlist = products.filter((product)=>{
    const matchSearch =
      product.title
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const matchCategory =
      selectedCategory === "All"
      || product.category === selectedCategory

    const matchRating =
      rating==="all"||
      (rating==="4star"&&product.rating>=4)||
      (rating==="3star"&&product.rating>=3)||
      (rating==="2star"&&product.rating>=2)

    return (matchCategory && matchSearch && matchRating);
  })

  const sortedList=[...filteredlist]

  if(sortOption==="lowToHigh"){
    sortedList.sort(
      (a,b)=>a.price-b.price
    )
  }

  if(sortOption==="highToLow"){
    sortedList.sort(
      (a,b)=>b.price-a.price
    )
  }

  if(sortOption==="rating"){
    sortedList.sort(
      (a,b)=>b.rating-a.rating
    )
  }



  useEffect(()=>{
    const fetchProducts=async()=>{
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.log("Error Fetching Data")
      } finally{
        setIsLoading(false)
      }
    }
    fetchProducts()
  },[])



    if(isLoading) return <h1>Loading Content Please Wait....</h1>

    if(sortedList.length===0) return <h1>No Result Found</h1>

    return(
      <div className="home">
        <div className="filters">
            <select
              value={selectedCategory}
              onChange={(e)=>setSelectedCategory(e.target.value)}
            >
              {categories.map((category)=>(
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortOption}
              onChange={(e)=>setSortOption(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="lowToHigh">Price Low → High</option>
                <option value="highToLow">Price High → Low</option>
                <option value="rating">Highest Rated</option>
            </select>

            <select
              value={rating}
              onChange={(e)=>setRating(e.target.value)}
            >
                <option value="all">All Rating</option>
                <option value="4star">4★ & Above</option>
                <option value="3star">3★ & Above</option>
                <option value="2star">2★ & Above</option>
            </select>
        </div>
          <div className="products-container">
              {sortedList.map((product)=>(
                  <ProductCard
                      key={product.id}
                      product={product}
                      setCartItems={setCartItems}
                      handleAddToCart={handleAddToCart}
                      ToggleWishList={ToggleWishList}
                      wishList={wishList}
                  />
              ))}
          </div>
      </div>
    )

}

export default Home;
