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
        if((!element.product_id || element.price <=0 || element.quantity <=0)){
            return res.status(400).json({
                message: "Each item must contain a valid product_id, quantity and price."
            });
        }
    }

    const total_price = items.reduce((sum,item)=>{
        return sum+item.price*item.quantity;
    },0)

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
    
    const orderItems =items.map(item=>{
        return{
            order_id : order.id,
            product_id : item.product_id,
            quantity: item.quantity,
            price: item.price
        }
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
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
