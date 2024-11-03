import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";


const App = () => {


  return (
  
    <div>

          
      <BrowserRouter>
      
      <Routes>
      
      <Route path="/" element = {<HomePage />} />
      <Route path="pricing" element= {<Pricing />} />
      <Route path="product" element = {<Product />}  />
      <Route path = "/app" element = {<AppLayout />} />
      <Route path  = "/login" element = {<Login />} />

      <Route path = "*" element = {<PageNotFound />} />
 
      </Routes>
      </BrowserRouter>
     </div>

  )


}

export default App