import React, { useContext, useState } from "react";
import {createContext} from "react"
import {login as AuthApi} from './pages/AuthApi'

console.log("AUTH CONTEXT LOADED");
console.log("AUTH CONTEXT FILE:", Math.random());
export const AuthContext = createContext<AuthContexts| null>(null);

//create context set default is null
interface AuthContexts{
    user:any|null,
    isAuthenticated: boolean,
    login: (username:string, password:string )=> Promise<void>,
    logout:()=>void
    updateUser: (date:any)=>void
}

export const AuthProvider = ({children}:{children: React.ReactNode}) =>{
 
   // state 
const [user, setUser] = useState<any|null>(null)
const [isAuthenticated, setIsAuthenticated] = useState(false) //start value be false

    // login 
 const login = async(username:string, password:string)=>{

    try{
        //get the fetch data
        const userData = await AuthApi(username, password)
        setUser(userData);
        setIsAuthenticated(true)
    }catch(err){
        setUser(null);
        setIsAuthenticated(false)
        throw err;
    }
 }  
 

 const logout = ()=>{
    setUser(null)
    setIsAuthenticated(false)
 }

 const updateUser = (data:any)=>{
    setUser((prev:any)=>({
     ...prev,
     ...data,   
    })            
    )
 }


return (
    <AuthContext.Provider 
    value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
    }}
    >
        {children}
    </AuthContext.Provider>
)
}
export const useAuth=()=>{
    const context = useContext(AuthContext)
   if(!context){
    throw new Error("useAuth must be used witnin AuthProvider")
   }
   return context;
}