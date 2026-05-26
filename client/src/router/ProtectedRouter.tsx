import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectRouter({children}:ProtectedRouteProps){

    console.log("ProtectRouter running");
const isAuth =!!localStorage.getItem("token")

if(!isAuth){
    return <Navigate to="/login" replace />
    
}
return <>{children}</>
}


