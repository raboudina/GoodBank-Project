import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { UserContext } from "../context";
import { updateBalance } from "../api";
import React from "react";

function Withdraw() {
  const currentUser = React.useContext(UserContext);
  const { name, email, balance, setBalance } = currentUser;
  const [first, setFirst] = React.useState(true);
  const [withdrawal, setWithdrawal] = React.useState("");
  const [show, setShow] = React.useState(true);

  var errorMessage = "";

  function isValidWithdrawal() {
    if (isNaN(withdrawal)) {
      errorMessage = "** Amount has to be a number";
      return false;
    }
    if (Number(withdrawal) <= 0) {
      errorMessage = "** Amount cannot be negative or zero";
      return false;
    }

    if (Number(withdrawal) > Number(balance)) {
      errorMessage = "** Amount cannot be higher than current balance";
      return false;
    }
    return true;
  }

  function handleSubmit() {
    setFirst(false);
    if (!isValidWithdrawal()) {
      alert(errorMessage);
      return;
    }
    const newBalance = Number(balance) - Number(withdrawal);
    let res = updateBalance(email,newBalance);
    res.then(() => {
      setBalance(newBalance);
      //Hide form fields and display success message
      setShow(false);
    });
  }

  function clearForm() {
    setFirst(true);
    setWithdrawal("");
    setShow(true);
  }
  
  return (
    <>
      <Card className="primary">
        <Card.Header> Withdrawal Form</Card.Header>
        <Card.Body>
          <Form.Label> Account holder: {name}</Form.Label>
          <br />
          <Form.Label>Current balance: ${balance}</Form.Label>
          <br />
          <br />
          {show ? (
            <Form>
              <Form.Label>Withdrawal amount</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter amount to withdraw"
                  defaultValue={withdrawal}
                  onChange={(e) => {
                    setWithdrawal(e.currentTarget.value);
                  }}
                ></Form.Control>
              </InputGroup>
              {!isValidWithdrawal() && !first && (
                <Form.Text>
                  {errorMessage} <br />
                </Form.Text>
              )}
              <br />
              <br />
              <Button
                type="submit"
                variant="light"
                disabled={!withdrawal}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Withdraw
              </Button>
            </Form>
          ) : (
            <Form>
              <Card.Text>Success</Card.Text>
              <Button type="submit" variant="light" onClick={clearForm}>
                Make another withdrawal
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Withdraw;
