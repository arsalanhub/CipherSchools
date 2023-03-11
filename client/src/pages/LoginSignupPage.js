import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function LoginSignUpPage() {
  const navigate=useNavigate();
  const [isLogInPage, setIsLogInPage]=useState(false);

  const loginSignUpText = (val) => {
    if(val) return "Login";
    return "Signup"
  }

  useEffect(() => {
    let userData=localStorage.getItem("userData");
    if(userData) navigate("/dashboard");
    else setIsLogInPage(true);
  }, [])
  return (
    <>
       <div>{loginSignUpText(isLogInPage)} Page</div>
       {!isLogInPage && <input type="name" placeholder='Enter Name' /> }
       <input type="email" placeholder='Enter Email' />
       <input type="password" placeholder='Enter Password' />
       <button>{loginSignUpText(isLogInPage)}</button>
       <a href="#" onClick={()=>setIsLogInPage(!isLogInPage)}>{loginSignUpText(!isLogInPage)}</a>
    </>
  )
}
