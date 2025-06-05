"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import {useRouter} from "next/navigation"
import axios from 'axios'
import { set } from 'mongoose'
import toast from 'react-hot-toast'
// import 'react-toastify/dist/ReactToastify.css'


const SignUp = () => {
    const router = useRouter()
    const [ButtonDisabled,setButtonDisabled] = React.useState(true)
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })

    const [loading,setLoading] = React.useState(false)

    useEffect
    (()=>{

        if(user.email.length >0 && user.password.length >0 && user.username.length >0){
            setButtonDisabled(false)
            // console.log("user",user)
            // router.push("/login")
        }

        else{
            setButtonDisabled(true)
        }

    },[user])

    const onSignUp = async ()=>{
        try {

            setLoading(true)
            const response = await axios.post("/api/users/signup",user)
            toast.success("successfull")
            router.push("/login")
            
            
        } catch (error) {
            console.log("error in signup",error)
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                toast.error("User already exists")
            } else {
                toast.error("error in signup")
            }
            
        }
        finally{}
    }
  return (
    <div className='flex flex-col items-center  jsustify-center min-h-screen py-2'>
        <h1>SignUp</h1>
        <hr />
        <label htmlFor="">username</label>
        <input type="text " id="username" value={user.username} 
        onChange={(e)=> setUser({...user,username:e.target.value})}/>
        <label htmlFor="">email</label>
        <input type="text " id="email" value={user.email} 
        onChange={(e)=> setUser({...user,email:e.target.value})}/>
        <label htmlFor="">password</label>
        <input type="text " id="password" value={user.password} 
        onChange={(e)=> setUser({...user,password:e.target.value})}/>
        <button onClick={onSignUp} className='p-2 border-gray-200 rounded-lg mb-4 focus:outline-none' >
            {ButtonDisabled ? "Please fill all fields" : "Sign Up"}
        </button>
        <Link href="/login">Login here</Link>
    </div>
  )
}

export default SignUp