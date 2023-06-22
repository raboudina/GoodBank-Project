import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { UserContext } from "../context";
import { updateBalance } from "../api";
import React from "react";

function Deposit() {
  const currentUser = React.useContext(UserContext); 
  const {name,email,balance,setBalance}=currentUser;
  const [first, setFirst] = React.useState(true);
  const [deposit, setDeposit] = React.useState(""); 
  const [show, setShow] = React.useState(true);
 
  var errorMessage = "";

  function isValidDeposit() {
    if (isNaN(deposit)){
      errorMessage = "** Amount has to be a number";
      return false;
    } 
    if (deposit <= 0) {
      errorMessage = "Amount cannot be negative or zero";
      return false;
    }
    return true;
  }
  
  function handleSubmit() {
    setFirst(false);
    if(!isValidDeposit()) {
      alert(errorMessage);
      return;
    }
    const newBalance = Number(balance) + Number(deposit);
    let res = updateBalance(email, newBalance);
    res.then(()=> {
      setBalance (newBalance);
      //Hide form fields and display success message
      setShow(false);
      })
  }

  function clearForm() {
    setFirst(true);
    setDeposit("");
    setShow(true);
  }

  return (
    <>
      <Card className="primary">
        <Card.Header> Deposit Form</Card.Header>
        <Card.Body>
          <Form.Label>Account holder: {name} </Form.Label>
          <br/>
          <Form.Label>Current balance: ${balance}</Form.Label>
          <br/><br/>
          {show ? (
            <Form>
              <Form.Label>Deposit amount</Form.Label>
              <InputGroup >
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter amount to deposit"
                  defaultValue={deposit}
                  onChange={(e) => {
                    setDeposit(e.currentTarget.value)
                  }}
                ></Form.Control>
              </InputGroup>
                {!first && !isValidDeposit() &&(     
                  <>       
                  <Form.Text >
                    {errorMessage}
                  </Form.Text>
                  <br/>
                  </>
                )}
              <br /><br/>
              <Button
                type="submit"
                variant="light"
                disabled={!deposit}
                onClick={(e)=>{
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Submit Deposit
              </Button>
            </Form>
          ) : (
            <Form>
              <Card.Text>Success</Card.Text>
              <Button type="submit" variant="light" onClick={clearForm}>
                Make another deposit
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Deposit;
