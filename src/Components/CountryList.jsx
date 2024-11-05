import React from "react"

import styles from "./CountryList.module.css"
import Spinner from "./Spinner"

import CountryItem from "./CountryItem"

import Message from "./Message"

import { useCities } from "../Contexts/CitiesProvider"


const CountriesList = () => {


    const {cities,status} = useCities()

    if(status === "idle")
        return null

    if(status === "loading")
        return <Spinner />


    if(!cities.length)
       return (<Message message="Add your first city by clicking somewhere on the map" />)


   const countries = cities.reduce((arr,city) => {

       if(!arr.map(el => el.coutnry).includes(city.country))
        return [...arr,{country:city.country, emoji : city.emoji}]
    else
    return arr

   },[])

   


   return (
     <ul className={styles.countryList}>
      {countries.map((country) => {
         return (<CountryItem key={country.id} country={country} />)
      })}        
     </ul>
   )


}

export default CountriesList