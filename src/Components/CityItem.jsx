import React from "react"
import styles from "./CityItem.module.css"

import {Link} from "react-router-dom"
import { useCities } from "../Contexts/CitiesProvider";


const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  

const CityItem = ({city}) => {

  const {currentCity,deleteCity} = useCities()
 
  const {cityName,emoji,date,id,position} = city

  return (

     <li>
     <Link className={`${styles.cityItem} ${(id === currentCity?.id)?styles["cityItem--active"]:undefined}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
     <span className={styles.emoji}>{emoji}</span>
     <h3 className={styles.name}>{cityName}</h3>
     <time className={styles.date}>{formatDate(date)}</time>
     <button onClick={(e) => {
         e.stopPropagation()
         e.preventDefault()
         deleteCity(id)  
      }} className={styles.deleteBtn}>&times;</button>
     </Link>
     </li>   
  )

}

export default CityItem