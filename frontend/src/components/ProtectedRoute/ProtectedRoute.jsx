import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({children}){

    const{user}=useAuth();

    if(!user){
        return(
            <div>
                <h1>Please login with your google account</h1>
            </div>
        )
    }

    return children;
}