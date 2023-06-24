import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserContext } from "../context";
import { deleteAccount } from "../api";

function DeleteAccount() {
  const currentUser = useContext(UserContext);
  const [password, setPassword] = useState("");

  function emptyFields() {
    if (currentUser.isGoogleAccount || password) return false;
    return true;
  }

  function resetCurrentUser() {
    currentUser.setLoggedIn(false);
    currentUser.setIsGoogleAccount(false);
    currentUser.setName("");
    currentUser.setEmail("");
    currentUser.setBalance("");
  }

  function handleDelete() {
    var userPassword = password;
    if (currentUser.isGoogleAccount) userPassword = "google";
    let res = deleteAccount(currentUser.email, userPassword);
    res.then((resolve) => {
      if (resolve.data.success) {
        resetCurrentUser();
        document.location.assign('#/');
      } else {
        alert(resolve.data.message);
      }
    });
  }

  return (
    <Card className="primary">
      <Card.Header>Delete Account</Card.Header>
      <Card.Body>
        <Form>
          <Form.Label>Account holder: {currentUser.name} </Form.Label>
          <br />
          <Form.Label>Email: {currentUser.email}</Form.Label>
          <br />

          {!currentUser.isGoogleAccount ? (
            <>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                defaultValue={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              ></Form.Control>
            </>
          ) : (
            <></>
          )}
          <br />
          <Button
            type="submit"
            variant="light"
            disabled={emptyFields()}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Delete account
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default DeleteAccount;
