import { useContext } from "react";
import { Form, Card } from "react-bootstrap";
import { UserContext } from "../context";

function Info() {
  const { name, email } = useContext(UserContext);

  return (
    <Card className="primary">
      <Card.Header>
        Account information
      </Card.Header>
      <Card.Body>
      <Form>
        <Form.Label>Account holder: {name} </Form.Label><br/>        
        <Form.Label>Email: {email}</Form.Label><br/>      
      </Form>
      <br />
      <Card.Link href="#/Deposit/">Make a deposit to your account</Card.Link><br/>      
      <Card.Link href="#/Withdraw/">Withdraw money from your account</Card.Link><br/>
      <Card.Link href="#/Balance/">Check your balance</Card.Link>

      </Card.Body>
    </Card>
  );
}

export default Info;
