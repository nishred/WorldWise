import React from "react"
import styles from "./CityItem.module.css"


const CityItem = ({city}) => {


  const {cityName,emoji,date} = city

  return (

     <li className={styles.CityItem}>
     
     <span className={styles.emoji}>{emoji}</span>
     
     </li>   
     

  )



}

export default CityItem