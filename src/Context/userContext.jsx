import { createContext, useEffect, useState } from "react";


export let userContext = createContext();

export default function UserContextProvider(props) {
    const [userLogin, setuserLogin] = useState(null)

    useEffect (()=>{
        if(localStorage.getItem("userToken")){
            setuserLogin(localStorage.getItem("userToken"))
        }
    } , [])




    return (
        <>

            <userContext.Provider value={{ userLogin, setuserLogin }}>
                {props.children}
            </userContext.Provider>
        </>
    )
}