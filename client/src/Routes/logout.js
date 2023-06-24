
import { useContext } from "react";
import { UserContext } from "../context";

function Logout() {
const currentUser=useContext(UserContext);
currentUser.setLoggedIn(false);
currentUser.setIsGoogleAccount(false);
currentUser.setName("");
currentUser.setEmail("");
currentUser.setBalance("");  
document.location.assign('#/');
return(<></>)
}

export default Logout



