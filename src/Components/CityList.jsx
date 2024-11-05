import React from "react"

import styles from "./CityList.module.css"
import Spinner from "./Spinner"

import CityItem from "./CityItem"

import Message from "./Message"

import { useCities } from "../Contexts/CitiesProvider"


const CityList = () => {

   
     const {cities,status} = useCities()


    if(status === "idle")
        return null

    if(status === "loading")
        return <Spinner />


    if(!cities.length)
       return (<Message message="Add your first city by clicking somewhere on the map" />)


   return (
     <ul className={styles.cityList}>
      {cities.map((city) => {
         return (<CityItem key={city.id}  city={city} />)
      })}        
     </ul>
   )


}

export default CityList