"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import {useRouter} from "next/navigation"
import  axios  from 'axios'
import toast from 'react-hot-toast'


const LoginPage= () => {
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        
    })

    const onLogin = async ()=>{

      try {
        setLoading(true);
        // const response =  axios: any.post("/api/users/login", user)
        const response = await axios.post("/api/users/login", user);
        console.log("Login response:", response.data);
        toast.success("Login successful");
        router.push("/profile");
        
      } catch (error: any) {
        toast.error("Login failed: " + error.message);
        console.error("Login failed:", error.message);
        // Handle error, e.g., show a notification or alert
        
      }
      finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      if(user.email.length>0 && user.password.length){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }

    },[user])
  return (
    <div className='flex flex-col items-center  jsustify-center min-h-screen py-2'>
        <h1>Login</h1>
        <hr />
        <label htmlFor="">email</label>
        <input type="text " id="email" value={user.email} 
        onChange={(e)=> setUser({...user,email:e.target.value})}/>
        <label htmlFor="">password</label>
        <input type="text " id="password" value={user.password} 
        onChange={(e)=> setUser({...user,password:e.target.value})}/>
        <button onClick={onLogin} className='p-2 border-gray-200 rounded-lg mb-4 focus:outline-none' >
          {loading ? "Loading..." : "Login"}
        </button>
        <Link href="/signup">VISIT SIGNU UP </Link>
    </div>
  )
}

export default  LoginPage