import React, { useEffect, useState } from "react";
import { Container,Card,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/Auth";
import {apiPath} from "../Config";
const Home = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const [user, setUser] = useState('')

    const handleSignOut = () => {
        auth.logout()
        navigate("/login",{replace:true})
    }

    const handleUser = () => {
        fetch(apiPath + "/api/user/data",{
            method: "POST",
            body: JSON.stringify({
            authorization: sessionStorage.getItem("token"),
            }),
            headers: {
            "Content-type": "application/json"
            }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
            setUser(res.user)
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(() => {
        handleUser()
    },[])

    return(
        <Container className="vh-100 d-flex flex-column ">
            <Card className="text-center">
                <Card.Body>Benvenuto {user.fullName}</Card.Body>
            </Card>
            <Button color="indigo" type="submit" onClick={handleSignOut}>
                Logout
              </Button>
        </Container>
    )
}

export default Home;