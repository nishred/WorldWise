import React,{useState,useEffect} from "react";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./Components/CityList";

import City from "./Components/City";

import CountryList from "./Components/CountryList";

import { CitiesProvider } from "./Contexts/CitiesProvider";

import Form from "./Components/Form"
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";


const App = () => {


  return (
  
    <AuthProvider>
    <CitiesProvider>
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element = {<HomePage />} />
      <Route path="pricing" element= {<Pricing />} />
      <Route path="product" element = {<Product />}  />
      <Route path = "/app" element = { <ProtectedRoute>
                                      <AppLayout />
                                      </ProtectedRoute>}>
      
       <Route index element = {<Navigate replace to = "cities" />} /> 

        <Route path="cities" element = {<CityList />} />

        <Route path="cities/:id" element = {<City />} />
 
        <Route path = "countries" element = {<CountryList />} />

        <Route path = "form" element = {<Form />} />
      
      </Route>
      <Route path  = "/login" element = {<Login />} />

      <Route path = "*" element = {<PageNotFound />} />
      </Routes>
      </BrowserRouter>
     </div>
     </CitiesProvider>
     </AuthProvider>
  )

}

export default App