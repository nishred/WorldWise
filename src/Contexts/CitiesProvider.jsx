import React, { useReducer } from "react";

import { useState,useEffect } from "react";


const CitiesContext = React.createContext()

const HOST = "http://localhost:8001"


const initialState = {

   cities : [],
   isLoading : false,
   currentCity : {},
   error : ""

}


function reducer(state,action)
{

    switch(action.type)
    {
  
       case "loading":

       return {...state,isLoading:true}

       case "rejected":
       return {...state,error : action.payload,isLoading : false}


       case "cities/loaded":

       return {...state,cities:action.payload,isLoading:false}

       case "city/loaded":

       return {...state,currentCity : action.payload,isLoading : false}


       case "city/created":

       return {...state,cities : [...state.cities,action.payload],isLoading : false}


       case "city/deleted":

       return {...state,isLoading : false,cities : state.cities.filter((city) => {

            return city.id !== action.payload

       })}


       default :
       throw new Error("Unknown action type")
        
    
    }
  
}



const CitiesProvider = ({children}) => {

    // const [cities,setCities] = React.useState([])

    // const [isLoading,setIsLoading] = React.useState(false)

    // const [error,setError] = React.useState("")

    // const [currentCity,setCurrentCity] = useState(null)


    const [{cities,currentCity,error,isLoading},dispatch] = useReducer(reducer,initialState)



    useEffect(() => {

      

      async function fetchData()
      {
        dispatch({type : "loading"})

        try{
        const response = await fetch(`${HOST}/cities`)
        const json = await response.json()

        dispatch({type : "cities/loaded",payload : json})
      }
        catch(err)
        {
           dispatch({type : "rejected",payload : "There was a problem while loading cities"})
        }
      
      }

      fetchData()
    },[])


    async function getCity(id)
    {
      dispatch({type : "loading"})

      try{

        const response = await fetch(`${HOST}/cities/${id}`)

        const json = await response.json()
        
        dispatch({type : "city/loaded",payload : json})

      }
      catch(err)
      {
         dispatch({type : "rejected",payload : "There was a problem while loading the city"})

      }
    

    }



    async function createCity(newCity)
    {
        dispatch({type : "loading"})

        try{

         const res = await fetch(`${HOST}/cities`,{


           method : "POST",
           body : JSON.stringify(newCity),
           headers : {

             "Content-Type" : "application/json"

           }


         })

         const data = await res.json()

          dispatch({type : "city/created",payload : data})

        }  
        catch(err)
        {
 
           dispatch({type:"rejected",payload : "Something went wrong"})
        }  

    }



    async function deleteCity(id)
    {

      dispatch({type : "loading"})

      try{


       const response = await fetch(`${HOST}/cities/${id}`,{

         method : "DELETE"

       }) 

       const json = await response.json()

       console.log(json)

       if(currentCity === id)
       {
         dispatch({type : "city/loaded",payload : {}})
          
       }

       dispatch({type: "city/deleted",payload : id})

      }
      catch(err)
      {

        dispatch({type : "rejected",payload : "Something went wrong"})

      }
      

    }



    return (


      <CitiesContext.Provider value={{cities,isLoading,error,getCity,currentCity,createCity,deleteCity}}>
      
      
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
