import React from "react";

import { useState,useEffect } from "react";


const CitiesContext = React.createContext()

const HOST = "http://localhost:8001"


const CitiesProvider = ({children}) => {


    const [cities,setCities] = React.useState([])

    // idle | loading | success | error
    const [status,setStatus] = React.useState("idle")

    const [currentCity,setCurrentCity] = useState(null)


    useEffect(() => {

      async function fetchData()
      {
        setStatus("loading")
        const response = await fetch(`${HOST}/cities`)
        const json = await response.json()
        setCities(json)
        setStatus("success")
      }
      fetchData()
    },[])


    async function getCity(id)
    {

        setStatus("loading")


        await new Promise((resolve,reject) => {

  
           setTimeout(() => {


             resolve()
 
           },2000) 

        })

        const response = await fetch(`${HOST}/cities/${id}`)

        const json = await response.json()

        setCurrentCity(json)

        setStatus("success")

    }

  
  
    return (


      <CitiesContext.Provider value={{cities,status,getCity,currentCity}}>
      
      
      {children}
      
      
      
      </CitiesContext.Provider>


    )


}


function useCities()
{

  const citiesContext = React.useContext(CitiesContext)

  if(!citiesContext)
    throw new Error("Outside the CitiesProvider context")


  return citiesContext


}


export {CitiesProvider,useCities}
