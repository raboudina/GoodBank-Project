import { useContext } from "react";
import { Form, Card } from "react-bootstrap";
import { UserContext } from "../context";

function Balance() {
  const { name, balance } = useContext(UserContext);

  return (
    <Card className="primary">
      <Card.Header>
        Account balance
      </Card.Header>
      <Card.Body>
      <Form>
        <Form.Label>Account holder: {name} </Form.Label><br/>        
        <Form.Label>Current balance: ${balance}</Form.Label>
      </Form>
      <br />
      <Card.Link href="#/Deposit/">Make a deposit to your account</Card.Link><br/>      
      <Card.Link href="#/Withdraw/">Withdraw money from your account</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Balance;
