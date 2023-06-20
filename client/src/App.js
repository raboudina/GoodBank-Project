import "./App.css";
import AllData from "./Routes/alldata";
import {NavBar,NoAuthNavBar} from "./Routes/navbar";
import Deposit from "./Routes/deposit";
import Login from "./Routes/login";
import Logout from "./Routes/logout";
import CreateAccount from "./Routes/createaccount";
import Withdraw from "./Routes/withdraw";
import Home from "./Routes/home";
import { Route, Routes, HashRouter } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context"

function App() {
   const currentUser = useContext(UserContext);
   const {loggedIn} = currentUser;
 
  return (
    <HashRouter>      
      {loggedIn?<NavBar />:<NoAuthNavBar/>}          
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/login/" element={<Login/>} />
          <Route path="/logout/" element={<Logout/>} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/alldata/" element={<AllData />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
