import { Navigate } from "react-router-dom"
//import { useAuth } from "./Auth"
export const ReqAuth = ({children}) => {
    //const auth = useAuth()

  if (!sessionStorage.getItem('token')) {
        return <Navigate to="/login"/>
    }

    return children
}