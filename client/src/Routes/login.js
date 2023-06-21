import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import {URL, UserContext } from "../context";
import axios from "axios";

const apiUrl = URL + `login`;

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

  async function login() {
    let res = await axios.get(apiUrl + "/" + email + "/" + password);
    return res;
  }

  async function handleLogin() {
    let res = login();
    res.then((resolve) => {
      if (resolve.data.success) {
        setCurrentUser(resolve.data.user);
        document.location.assign("#/");
      } else {
        alert(resolve.data.message);
      }
    });
  }

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
          <br />
          <a href="#/CreateAccount/">Create a new account</a>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
