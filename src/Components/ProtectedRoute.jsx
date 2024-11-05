import React, { useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {

   const {isAuthenticated} = useAuth()

   const navigate = useNavigate()


   useEffect(() => {

     if(!isAuthenticated)
        navigate("/")

   },[isAuthenticated,navigate])

   if(!isAuthenticated)
    return null

    return children


}

export default ProtectedRoute