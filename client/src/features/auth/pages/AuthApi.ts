

export const USER_URL = "https://dummyjson.com/users"

export const login = async(username:string, password:string)=>{


    const res = await fetch(`${USER_URL}`);

    if(!res.ok){
        throw new Error("fetch fail")
    }

    const data = await res.json();

    const users = data.users //get the user array

    const user = users.find((u:any)=>(username === u.username));

    if(!user){
        throw new Error("user doesn't exist")
    }

    if( user.password !== password){
        throw new Error("incorrect password")
    }
 

    return {
        id: user.id,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email
    }
}






