import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {apiPath} from "../Config";
const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()

    const login = (email,password) => {
        fetch(apiPath + "/api/user/login",{
            method: "POST",
            body: JSON.stringify({
            email: email,
            password: password,
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
            if(res){
                sessionStorage.setItem('token',res.accessToken)
            }else{
                console.log("username o password non corrette")
            }
            navigate('/',{replace: true})
        })
        .catch((err) => {
          console.log(err);
        });
    }


    const logout = () => {
        sessionStorage.removeItem('token')
    }

    return(
        <AuthContext.Provider value={{login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= () => {
    return useContext(AuthContext)
}