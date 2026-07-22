import supabase from "../config/supabase.js";

export const createOrder =async(req,res)=>{
    try {

        const {
        customer_name,
        email,
        phone,
        address,
        items
    } = req.body;

    if(
        !customer_name ||
        !email ||
        !phone ||
        !address
    ){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            message: "Order must contain at least one item"
        });
    }

    for(const element of items){
        if((!element.product_id ||  element.quantity <=0)){
            return res.status(400).json({
                message: "Each item must contain a valid product_id and quantity."
            });
        }
    }

    const productIds =items.map(item=>{
        return item.product_id
    })

    const {data :products ,error: productError}=await supabase
        .from("products")
        .select("*")
        .in("id",productIds)

    if(productError){
        return res.status(500).json({
            message:"Failed to find the products matching the item product_id",
            error: productError.message
        })
    }

    if (products.length !== items.length) {
        return res.status(400).json({
            message: "One or more products do not exist."
        });
    }


    let total_price =0

    for(const item of items){
        const product =products.find(singleProduct=>{
           return singleProduct.id===item.product_id
        })
        if (!product) {
            return res.status(400).json({
                message: `Product with id ${item.product_id} not found`
            });
        }

        total_price += product.price * item.quantity
    }

    const { data: order, error } = await supabase
        .from("orders")
        .insert([
            {
                customer_name,
                email,
                phone,
                address,
                total_price,
                status: "Pending"
            }
        ])
        .select()
        .single();

    if (error) {
        return res.status(500).json({
            message: "Failed to create order"
        });
    }

    const orderItems =[]

    items.forEach(item=>{
        const product =products.find(singleProduct=>{
           return singleProduct.id===item.product_id
        })

         orderItems.push({
            order_id : order.id,
            product_id : item.product_id,
            quantity: item.quantity,
            price: product.price
        })
        
    })


    const{error:orderItemsError}= await supabase
        .from("order_items")
        .insert(orderItems)


    if(orderItemsError){
        console.error("Order items insert failed", orderItemsError)

        const{error:deleteError}=await supabase
            .from("orders")
            .delete()
            .eq("id",order.id)

        if(deleteError){
            console.error("Deletion of the faulty order failed",deleteError)
        }

        return res.status(500).json({
            message:"Failed to create order items",
            error: orderItemsError.message
        })
    }


    return res.status(201).json({
        message: "Order created successfully",
    });

    } catch (error) {

        console.error(error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getOrders =async (req,res)=>{
    const{data,error}=await supabase
        .from("orders")
        .select("*")
    if(error){
        return res.status(500).json({
            message:error.message
        })
    }
    return res.json(data)
}
export const getOrdersById =async (req,res)=>{
    const orderId = req.orderId
    const{data,error}=await supabase
        .from("orders")
        .select("*")
        .eq("id",orderId)
        .maybeSingle()
    if(error){
        return res.status(500).json({
            message:error.message
        })
    }
    if(!data){
        return res.status(404).json({
            message:"order not found"
        })
    }
    return res.json(data)
}

export const updateOrdersById =async (req,res)=>{
    const orderId =req.orderId
    const {
        customer_name,
        email,
        phone,
        address,
        status
    } = req.body;


    const {data,error}= await supabase
        .from("orders")
        .update({
                customer_name,
                email,
                phone,
                address,
                status
            }
        )
        .eq("id",orderId)
        .select()
        .maybeSingle()
        
        if(error){
            return res.status(500).json({
                message:error.message
            })
        }
        if(!data){
            return res.status(404).json({
                message:"order not found"
            })
        }

        return res.status(200).json(data)

}

export const deleteOrdersById=async (req,res)=>{
    const orderId = req.orderId
    const{data,error}=await supabase
        .from("orders")
        .delete()
        .eq("id",orderId)
        .select()
        .maybeSingle()

    if(error){
        return res.status(500).json({
            message:error.message
        })
    }
    if(!data){
        return res.status(404).json({
            message:"order not found"
        })
    }

    return res.status(200).json({
        message: "order deleted successfully",
        order: data
    });
}
