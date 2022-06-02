import { Navigate } from "react-router-dom"
//import { useAuth } from "./Auth"
export const ReqAuth = ({children}) => {
    //const auth = useAuth()

  if (!sessionStorage.getItem('user')) {
        return <Navigate to="/login"/>
    }

    return children
}