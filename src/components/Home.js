import React, { useEffect, useState } from "react";
import { Container, Card, Button, Nav, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Auth";
import { apiPath } from "../Config";
const Home = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = useState("");
  const [sub, setSub] = useState();

  const handleSignOut = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  const handleUser = () => {
    fetch(apiPath + "/api/user/data", {
      method: "POST",
      body: JSON.stringify({
        authorization: sessionStorage.getItem("token"),
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSub = () => {
    fetch(apiPath + "/api/user/home", {
      method: "POST",
      body: JSON.stringify({
        authorization: sessionStorage.getItem("token"),
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        if (res.data) {
          setSub(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleUser();
    handleSub();
  }, []);

  const handleRedirect = () => {
    navigate("/subscription");
  };

  return (
    <Container className="vh-100 d-flex flex-column ">
      <Card className="text-center">
        <Card.Body>Benvenuto {user.fullName}</Card.Body>
      </Card>
      <div className="mt-3 col-md-12"></div>
      {sub && (
        <div>
          <Card className="text-center">
            <Card.Body>Il tuo abbonamento:</Card.Body>
          </Card>
          <Table>
            <thead>
              <tr>
                <th>Renewal date</th>
                <th>Subscription type</th>
                <th>Pool accesses left</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{sub.renewalDate}</td>
                <td>{sub.type.sub}</td>
                <td>{sub.type.poolAccess}</td>
              </tr>
            </tbody>
          </Table>
          <div className="text-center">
            <Button onClick={handleRedirect}>
                Modifica il tuo abbonamento
          </Button>
          </div>
        </div>
      )}
      {!sub && (
        <div className="text-center">
          <Button onClick={handleRedirect}>
            Non hai ancora un abbonamento: ISCRIVITI ORA!
          </Button>
        </div>
      )}
      <div className="mt-3 col-md-12"></div>
      <Button color="indigo" type="submit" onClick={handleSignOut}>
        Logout
      </Button>
    </Container>
  );
};

export default Home;
