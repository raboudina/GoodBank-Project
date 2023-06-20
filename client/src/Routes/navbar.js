import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context";

//This function sets status of all links in navbar to inactive
const resetNavigation = (e) => {
  var elems = document.querySelectorAll(".active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
};

function NavBar() {
  const currentUser = useContext(UserContext);
  const {name} = currentUser;
  console.log("Current user"+JSON.stringify(currentUser));
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand onClick={resetNavigation} href="#/">
        <img
          src="../imgs/bank-logo-small.png"
          alt="logo"
          width="50px"
          heigh="50px"
        ></img>{" "}
        GoodBank
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav variant="pills">          
          <Nav.Link href="#/deposit/">Deposit</Nav.Link>
          <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
          <Nav.Link href="#/logout/">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav variant="pill">
        <Navbar.Text style={{color:"white",  marginRight: '0.8rem'}}>Logged-in as: {name}   </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
function NoAuthNavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand onClick={resetNavigation} href="#/">
        <img
          src="../imgs/bank-logo-small.png"
          alt="logo"
          width="50px"
          heigh="50px"
        ></img>{" "}
        GoodBank
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav variant="pills">
          <Nav.Link href="#/login/" className="justify-content-end">
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export { NavBar, NoAuthNavBar };
