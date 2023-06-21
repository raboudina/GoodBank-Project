import { createContext, useState } from 'react';

const UserContext=createContext({loggedIn:null,setLoggedIn:()=>{},name:null,setName:()=>{},email:null,setEmail:()=>{},balance:null,setBalance:()=>{}});
const URL = 'http://localhost:8080/';
function Context ({children}){
   
    const [loggedIn,setLoggedIn]=useState(false);
    const [name,setName]= useState("");
    const [email,setEmail] = useState("");
    const [balance,setBalance] = useState(0);
    
    return (

        <UserContext.Provider value={{loggedIn,setLoggedIn,name,setName,email,setEmail,balance,setBalance}}>
            {children}
        </UserContext.Provider>
        
    );
}

export { Context, UserContext, URL}