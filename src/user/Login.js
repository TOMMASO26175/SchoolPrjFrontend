import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../services/Auth";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPass] = useState('')
  const auth = useAuth()


  const handleLogin =  (e) => {
    e.preventDefault();
    auth.login(user,password)
  }

  return (
    <Container className="d-flex justify-content-md-center">
      <Row>
      <Card className="text-center">
          <Card.Body>Inserisci le credenziali per il login</Card.Body>
        </Card>
        <Col>
          <form>
            <p className="h4 text-center mb-4">Sign in</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Your username
            </label>
            <input
              id="defaultFormLoginEmailEx"
              className="form-control"
              onChange={(e) => setUser(e.target.value)}
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
              <Button color="indigo" type="submit" onClick={(e) => handleLogin(e)}>
                Login
              </Button>
            </div>
          </form>
        </Col>
        <Card className="text-center">
          <Link to={"/signup"}><Card.Body>Registrati</Card.Body></Link>
        </Card>
      </Row>
    </Container>
  );
};

export default Login;