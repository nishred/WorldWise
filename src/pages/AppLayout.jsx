
import styles from "./AppLayout.module.css";

import AppNav from "../Components/AppNav";

import Sidebar from "../Components/Sidebar";

import Map from "../Components/Map";

import { useNavigate } from "react-router-dom";

function AppLayout() {

   const navigate = useNavigate()


  return (
     <div className={styles.app}>
     <Sidebar />
     <Map />
     </div>
  )
}

export default AppLayout;
