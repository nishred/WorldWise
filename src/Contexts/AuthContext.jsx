import React, { useReducer } from "react";


const AuthContext = React.createContext()

const initialState = {

   user : null,
   isAuthenticated : false

}


const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };


function reducer(state,action)
{


   switch(action.type)
   {


    case "login":

    return {user:action.payload,isAuthenticated : true}


    case "logout":

    return {user : null,isAuthenticated : false}


   }
}



export const AuthProvider = ({children}) => {


    const [{user,isAuthenticated},dispatch] = useReducer(reducer,initialState)


    function login(email,password)
    {

       if(email === FAKE_USER.email && password === FAKE_USER.password)
       {
        dispatch({type : "login",payload : FAKE_USER})
        return true
       }
       else
       return false
       
    }


    function logout()
    {

      dispatch({type : "logout"})

    }
     

   return (

     <AuthContext.Provider value = {{user,isAuthenticated,login,logout}}>
      {children}   
     </AuthContext.Provider>
  
   )

}


export function useAuth()
{
 
   const context = React.useContext(AuthContext)

   return context


}


