import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserContext } from "../context";
import { useGoogleLogin } from "@react-oauth/google";
import { login, getGoogleUser } from "../api";

function Login() {
  const currentUser = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emptyFields() {
    if (email && password) return false;
    return true;
  }

  function setCurrentUser(user) {
    currentUser.setLoggedIn(true);
    currentUser.setName(user.name);
    currentUser.setEmail(user.email);
    currentUser.setBalance(user.balance);
  }

  function handleGoogleLoginSuccess(tokenResponse) {
    const googleAccessToken = tokenResponse.access_token;
    //Retrieve email from google account
    let response = getGoogleUser(googleAccessToken);
    response.then((resolve) => {
      //Login
      let res = login(resolve.data.email, "google");
      res.then((resolve) => {
        if (resolve.data.success) {
          setCurrentUser(resolve.data.user);
          currentUser.setIsGoogleAccount(true);
          document.location.assign("#/");
        } else {
          alert(resolve.data.message);
        }
      });
    });
  }

  async function handleLogin() {
    let res = login(email, password);
    res.then((resolve) => {
      if (resolve.data.success) {
        setCurrentUser(resolve.data.user);
        document.location.assign("#/");
      } else {
        alert(resolve.data.message);
      }
    });
  }

  const signin = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  
  return (
    <Card className="primary">
      <Card.Header>Login</Card.Header>
      <Card.Body>
        <Form>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          ></Form.Control>
          <br />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            defaultValue={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          ></Form.Control>
          <br />
          <br />
          <Button
            type="submit"
            variant="light"
            disabled={emptyFields()}
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Login
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => signin()}
            style={{ marginLeft: "0.8rem" }}
          >
            <img
              src="../imgs/google.png"
              width="20"              
              alt = "Google icon"
              style={{ marginRight: "0.8rem" }}
            />
            Login with Google
          </Button>
          <br />
          <br />
          <a href="#/CreateAccount/">Create a new account</a>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
