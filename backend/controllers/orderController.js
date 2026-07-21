import supabase from "../config/supabase";

export const createOrder =async(req,res)=>{
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
                message: "Order is not in acceptable format"
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
    
    const orderItems =items.map(item=>{
        return{
            order_id : order.id,
            product_id : item.product_id,
            quantity: item.quantity,
            price: item.price
        }
    })

    const{error:orderItemsError}= await supabase
        .from("order_item")
        .insert(orderItems)

    return res.status(201).json({
        message: "Order created successfully",
        order
    });


}
