import React from "react"

import styles from "./CityList.module.css"
import Spinner from "./Spinner"

const CityList = ({cities,status}) => {


    if(status === "idle")
        return null

    if(status === "loading")
        return <Spinner />


   return (

     <ul className={styles.cityList}>
     
      
      {cities.map((city) => {

        

      })}        

     </ul>
 


   )



}

export default CityList