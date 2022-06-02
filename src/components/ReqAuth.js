import { Navigate } from "react-router-dom"
export const ReqAuth = ({children}) => {

  if (!sessionStorage.getItem('token')) {
        return <Navigate to="/login"/>
    }

    return children
}