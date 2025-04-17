import  { createContext, useEffect, useState } from 'react'

export const authContext  = createContext(0) ;
const AuthContextProvider = ({children} ) => {

const [isLogged, setIsLogged] = useState(false) 

useEffect(()=>{
  if (localStorage.getItem("token") != null) {
    setIsLogged(false)
  }else{
    setIsLogged(true)
  }
} , [])
    
  return (
    <>
        <authContext.Provider value={{isLogged , setIsLogged}} > 
        {children}
        </authContext.Provider>
    </>
  )
}

export default AuthContextProvider