
import styles from "./AppLayout.module.css";

import AppNav from "../Components/AppNav";

import Sidebar from "../Components/Sidebar";

import Map from "../Components/Map";


function AppLayout() {
  return (
     <div className={styles.app}>
     <Sidebar />
     <Map />
     </div>
  )
}

export default AppLayout;
