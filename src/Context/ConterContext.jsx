import { createContext } from "react";
import { useState } from "react";

let ConterContext = createContext()

export default function ConterContextProvider(props) {
    const [Conter, setConter] = useState(0)

    function Cont() {
        setConter(Math.random() * 10)
        
    }


    return <ConterContext.Provider value={{ Conter, Cont }}>
        {props.children}
    </ConterContext.Provider>

}


export { ConterContext }