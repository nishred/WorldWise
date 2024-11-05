
import styles from "./AppLayout.module.css";

import AppNav from "../Components/AppNav";

import Sidebar from "../Components/Sidebar";

import Map from "../Components/Map";

import User from "../Components/User";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";

function AppLayout() {

   const navigate = useNavigate()
   const {isAuthenticated} = useAuth()


   useEffect(() => {

     if(!isAuthenticated)
      navigate("/login")


   },[isAuthenticated])


   if(!isAuthenticated)
      return null

  return (
     <div className={styles.app}>
     <Sidebar />
     <Map />
     <User />
     </div>
  )
}

export default AppLayout;
