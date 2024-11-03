import React,{useState,useEffect} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./Components/CityList";


const HOST = "http://localhost:8001"

const App = () => {

 
    const [cities,setCities] = React.useState([])

    
    // idle | loading | success | error
    const [status,setStatus] = React.useState("idle")


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


  return (
  
    <div>
      
      <BrowserRouter>
      
      <Routes>
      
      <Route path="/" element = {<HomePage />} />
      <Route path="pricing" element= {<Pricing />} />
      <Route path="product" element = {<Product />}  />
      <Route path = "/app" element = {<AppLayout />}>
      
       <Route index element = {<CityList cities = {cities} status = {status}/>} />

        <Route path="cities" element = {<CityList cities = {cities} status = {status} />} />
 
        <Route path = "countries" element = {<p>Countries</p>} />

        <Route path = "form" element = {<p>Login</p>} />
      
      </Route>
      <Route path  = "/login" element = {<Login />} />

      <Route path = "*" element = {<PageNotFound />} />
      </Routes>
      </BrowserRouter>
     </div>
  )

}

export default App