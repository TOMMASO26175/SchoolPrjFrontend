import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { apiPath} from "../Config";
import { Card } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setUser] = useState('')
  const [password, setPass] = useState('')
  const [role, setRole] = useState('')
  const [name, setName] = useState('')

  

  const registerUser = (email,password,name,role) => {
    fetch(apiPath + "/api/user/register",{
        method: "POST",
        body: JSON.stringify({
        email: email,
        password: password,
        fullName: name,
        role: role
        }),
        headers: {
        "Content-type": "application/json"
        }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

  const handleSignup = () => {
    registerUser(email,password,name,role)
    navigate('/login',{replace: true})
  }

  return (
    <Container className="d-flex justify-content-md-center">
      <Row>
      <Card className="text-center">
          <Card.Body>Inserisci le credenziali per la registrazione di un nuovo utente</Card.Body>
        </Card>
        <Col>
          <form>
            <p className="h4 text-center mb-4">Sign up</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Your email
            </label>
            <input
              id="defaultFormLoginEmailEx"
              className="form-control"
              onChange={(e) => setUser(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Your Name
            </label>
            <input
              id="defaultFormLoginEmailEx"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Your Role
            </label>
            <input
              id="defaultFormLoginEmailEx"
              className="form-control"
              onChange={(e) => setRole(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
              Your password
            </label>
            <input
              type="password"
              id="defaultFormLoginPasswordEx"
              className="form-control"
              onChange={(e) => setPass(e.target.value)}
            />
            <div className="text-center mt-4">
              <Button color="indigo" type="submit" onClick={handleSignup}>
                Register
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;