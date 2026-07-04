import supabase from "../config/supabase.js";

const response = await fetch(
    "https://dummyjson.com/products"
)

const data =await response.json()

const formattedProducts = data.products.map(product => ({
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    thumbnail: product.thumbnail,
    images: product.images,
    rating: product.rating,
    stock: product.stock
}));

const {error}= await supabase
    .from("products")
    .insert(formattedProducts)

if(error){
    console.log(error)
} else{
    console.log("Products imported sucessfully")
}