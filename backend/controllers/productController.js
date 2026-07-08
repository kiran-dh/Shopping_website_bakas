import supabase from "../config/supabase.js";

export const getProducts =async (req,res)=>{
    const{data,error}=await supabase
        .from("products")
        .select("*")
    if(error){
        return res.status(500).json({
            message:error
        })
    }
    return res.json(data)
}
export const getProductsById =async (req,res)=>{
    const productId = req.productId
    const{data,error}=await supabase
        .from("products")
        .select("*")
        .eq("id",productId)
        .maybeSingle()
    if(error){
        return res.status(500).json({
            message:error
        })
    }
    if(!data){
        return res.status(404).json({
            message:"Product not found"
        })
    }
    return res.json(data)
}

export const createProducts=async(req,res)=>{
    const {
        title,
        description,
        price,
        category,
        thumbnail,
        images,
        rating,
        stock
    } = req.body;

    if(
        !title||
        !price||
        !category||
        !description
    ){
        return(res.status(400).json({
            message:"Please fil out the required fields"
        }))
    }

    const {data,error}= await supabase
        .from("products")
        .insert([
            {
                title,
                description,
                price,
                category,
                thumbnail,
                images,
                rating,
                stock
            }
        ])
        .select()
        .maybeSingle()

    if(error){
        return res.status(500).json({
            message:error
        })
    }
    return res.status(201).json(data)
}

export const updateProductsById =async (req,res)=>{
    const productId =req.productId
    const {
        title,
        description,
        price,
        category,
        thumbnail,
        images,
        rating,
        stock
    } = req.body;


    const {data,error}= await supabase
        .from("products")
        .update([
            {
                title,
                description,
                price,
                category,
                thumbnail,
                images,
                rating,
                stock
            }
        ])
        .eq("id",productId)
        .select()
        .maybeSingle()
        
        if(error){
            return res.status(500).json({
                message:error
            })
        }
        if(!data){
            return res.status(404).json({
                message:"Product not found"
            })
        }

        return res.status(201).json(data)

}

export const deleteProductsById=async (req,res)=>{
    const productId = req.productId
    const{data,error}=await supabase
        .from("products")
        .delete()
        .eq("id",productId)
        .select()
        .maybeSingle()

    if(error){
        return res.status(500).json({
            message:error.message
        })
    }
    if(!data){
        return res.status(404).json({
            message:"Product not found"
        })
    }

    return res.status(200).json({
        message: "Product deleted successfully",
        product: data
    });
}