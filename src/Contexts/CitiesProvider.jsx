import React from "react";

import { useState,useEffect } from "react";


const CitiesContext = React.createContext()

const HOST = "http://localhost:8001"


const CitiesProvider = ({children}) => {

    const [cities,setCities] = React.useState([])

    const [isLoading,setIsLoading] = React.useState(false)

    const [error,setError] = React.useState("")

    const [currentCity,setCurrentCity] = useState(null)


    useEffect(() => {

      async function fetchData()
      {
        try{

        setIsLoading(true)
        const response = await fetch(`${HOST}/cities`)
        const json = await response.json()
        setCities(json)

        }
        catch(err)
        {
 
           setError(err.message)

        }
        finally{
  
            setIsLoading(false)

        }
      }
      fetchData()
    },[])


    async function getCity(id)
    {

      try{
        setIsLoading(true)

        const response = await fetch(`${HOST}/cities/${id}`)

        const json = await response.json()

        setCurrentCity(json)

      }
      catch(err)
      {
          setError(err.message)

      }
      finally
      {
        setIsLoading(false)
      }

    }



    async function createCity(newCity)
    {

        try{


         setIsLoading(true)

         const res = await fetch(`${HOST}/cities`,{


           method : "POST",
           body : JSON.stringify(newCity),
           headers : {

             "Content-Type" : "application/json"

           }


         })

         const data = await res.json()

         setCities((cities) => {

             return [...cities,data]

         }) 
 

        }  
        catch(err)
        {
           alert("There was an issue with loading the data")

        } 
        finally
        {

            setIsLoading(false)


        }     
      

    }

  
  
    return (


      <CitiesContext.Provider value={{cities,isLoading,error,getCity,currentCity,createCity}}>
      
      
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
