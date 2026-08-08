import supabase from "../config/supabase.js";

export const getOrCreateUser = async (req,res)=>{
    try {
        const{
            uid,
            picture,
            email,
            name
        } = req.user;

        const{data:existingUser ,error:findError}= await supabase
            .from("users")
            .select("*")
            .eq("firebase_uid",uid)
            .maybeSingle()

        if(findError){
            return res.status(500).json({
                message:error.message
            })
        }

        if(existingUser){
            return res.staus(200).json(existingUser)
        }

        const {data:newUser,error:createError} = await supabase
            .from("users")
            .insert({
                firebase_uid:uid,
                name,
                email,
                picture
            })
            .select()
            .single()

        if (createError) {
            return res.status(500).json({
                message: createError.message
            });
        }

        return res.status(201).json(newUser);

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};