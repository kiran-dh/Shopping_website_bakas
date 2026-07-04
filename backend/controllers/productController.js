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
    const productId =Number(req.params.id);
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
