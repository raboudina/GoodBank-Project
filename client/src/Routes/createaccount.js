import React from "react";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { UserContext } from "../context";
import { useGoogleLogin } from "@react-oauth/google";
import { createUser, getGoogleUser } from "../api";

function CreateAccount() {
  const [first, setFrist] = React.useState(true); //First attempt to fill the form
  const [show, setShow] = React.useState(true); //Show form fields
  const [name, setName] = React.useState(""); //Input name value
  const [email, setEmail] = React.useState(""); // Input email value
  const [balance, setBalance] = React.useState(100); // Input email value
  const [password, setPassword] = React.useState(""); //Input password value
  const [passwordConfirmation, setPasswordConfirmation] = React.useState(""); //Input password confirmation value
  const currentUser = React.useContext(UserContext); //Current user context
  var errorMessage = "";

  //error messgaes per field
  const error = {
    name: "** Name cannot be empty",
    email: "** Email cannot be empty",
    email2: "** Invalid email",
    password: "** Password cannot be empty",
    password2: "** Password cannot be less than 8 characters",
    password3: "** Password confirmation cannot be empty",
    password4: "** Passwords do not match",
    balance: "** Balance cannot be empty",
    balance1: "** Initial balance cannot be less than $100",
    balance2: "** Balance has to be a number",
  };

  //Checks if all fields are empty to disable the Create Account button
  function emptyFields() {
    if (name && email && balance && password && passwordConfirmation)
      return false;
    return true;
  }

  //Function capitalizeName turns a text into proper noun capitalized form
  function capitalizeName(nameValue) {
    return nameValue
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  //Function isValidEmail is called to check if email value is in proper email format
  function isValidName() {
    if (!name) {
      errorMessage = error["name"];
      return false;
    }
    return true;
  }

  function isValidEmail() {
    if (!email) {
      errorMessage = error["email"];
      return false;
    }
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      errorMessage = error["email2"];
      return false;
    }
  }

  function isValidBalance() {
    if (!balance) {
      errorMessage = error["balance"];
      return false;
    }
    if (isNaN(balance)) {
      errorMessage = error["balance2"];
      return false;
    }
    if (balance < 100) {
      errorMessage = error["balance1"];
      return false;
    }

    return true;
  }

  function isValidPassword() {
    if (!password) {
      errorMessage = error["password"];
      return false;
    }
    if (password.length >= 8) {
      return true;
    } else {
      errorMessage = error["password2"];
      return false;
    }
  }

  function isValidPasswordConfirmation() {
    if (!passwordConfirmation) {
      errorMessage = error["password3"];
      return false;
    }
    if (password === passwordConfirmation) {
      return true;
    } else {
      errorMessage = error["password4"];
      return false;
    }
  }

  //Function addAccount adds to account to the list of allUsers and set the current user to the new created account
  function setCurrentUser(user) {
    console.log(user);
    currentUser.setLoggedIn(true);
    currentUser.setName(user.name);
    currentUser.setEmail(user.email);
    currentUser.setBalance(user.balance);
  }
  function handleGoogleLoginSuccess(tokenResponse) {
    const googleAccessToken = tokenResponse.access_token;
    let response = getGoogleUser(googleAccessToken);
    response.then((resolve) => {
      //Retrieve name and email from google account
      const googleName =
        resolve.data.given_name + " " + resolve.data.family_name;
      const googleEmail = resolve.data.email;
      const googlePassword = "google";

      //Add new account
      let res = createUser(googleName, googleEmail, googlePassword, balance);
      res.then((resolve) => {
        if (!resolve.data.success) alert("User already exists!");
        else {
          setCurrentUser(resolve.data.user);
          currentUser.setIsGoogleAccount(true);
          //Hide form fields and display success message
          setShow(false);
        }
      });
    });
  }

  //Function handleCreate called when the "Create account button is clicked"
  function handleCreate() {
    //Set the first to false indicating that it is no longer the user's first attempt to submit the form
    setFrist(false);
    //validate name field
    if (!isValidName()) {
      alert(errorMessage);
      return;
    }
    //validate email field
    if (!isValidEmail()) {
      alert(errorMessage);
      return;
    }
    //validate balance field
    if (!isValidBalance()) {
      alert(errorMessage);
      return;
    }
    //validate password field
    if (!isValidPassword()) {
      alert(errorMessage);
      return;
    }
    //validate password field
    if (!isValidPasswordConfirmation()) {
      alert(errorMessage);
      return;
    }

    //Add new account
    let res = createUser(name, email, password, balance);
    res.then((resolve) => {
      if (!resolve.data.success) alert("User already exists!");
      else {
        setCurrentUser(resolve.data.user);
        //Hide form fields and display success message
        setShow(false);
      }
    });
  }
  const signup = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    <Card className="primary">
      <Card.Header>Create Account</Card.Header>
      <Card.Body>
        {show ? (
          <Form>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              defaultValue={name}
              onChange={(e) => {
                setName(capitalizeName(e.currentTarget.value));
              }}
            ></Form.Control>
            {!first && !isValidName() && (
              <Form.Text>
                {errorMessage}
                <br />
              </Form.Text>
            )}
            <br />
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value.toLocaleLowerCase());
              }}
            ></Form.Control>
            {!first && !isValidEmail() && (
              <Form.Text>
                {errorMessage}
                <br />
              </Form.Text>
            )}
            <br />
            <Form.Label>Starting balance</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="Number"
                placeholder="Enter starting balance"
                defaultValue={balance}
                min="100"
                onChange={(e) => {
                  setBalance(e.currentTarget.value);
                }}
              ></Form.Control>
            </InputGroup>
            {!first && !isValidBalance() && (
              <Form.Text>
                {errorMessage}
                <br />
              </Form.Text>
            )}
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
            {!first && !isValidPassword() && (
              <Form.Text>{errorMessage}</Form.Text>
            )}
            <br />
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              defaultValue={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.currentTarget.value);
              }}
            ></Form.Control>
            {!first && !isValidPasswordConfirmation() && (
              <Form.Text>{errorMessage}</Form.Text>
            )}
            <br />

            <Button
              type="submit"
              variant="light"
              disabled={emptyFields()}
              onClick={(e) => {
                e.preventDefault();
                handleCreate();
              }}
            >
              Create Account
            </Button>

            <Button
              type="submit"
              variant="primary"
              onClick={() => signup()}
              style={{ marginLeft: "0.8rem" }}
            >
              <img
                src="../imgs/google.png"
                width="20"
                alt = "Google icon"
                style={{ marginRight: "0.8rem" }}
              />
              Signup with Google
            </Button>
            <br />
            <br />
            <a href="#/Login/">Login to an existing account</a>
          </Form>
        ) : (
          <Form>
            <Card.Text>Account created successfully!</Card.Text>
            <Card.Link href="#/Deposit/">
              Make a deposit to your account
            </Card.Link>
            <br />
            <Card.Link href="#/Withdraw/">
              Withdraw money from your account
            </Card.Link>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default CreateAccount;
