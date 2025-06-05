"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
const ProfilePage = () => {
  const [data,setData] = React.useState<any>("nothing");
  const router = useRouter()

  const logout = async () => {
    try {
      const logout = await axios.get("/api/users/logout")
      toast.success("Logout successful");
      router.push("/login");

    } catch (error: any) {
      toast.error("Logout failed: " + error.message);
      console.error("Logout failed:", error.message);
      // Handle error, e.g., show a notification or alert
      
    }
 
  }

  const getuserDetails = async ()=>{
    const resp = await axios.get("/api/users/me")
    setData(resp.data.data._id)
  }
  return (
    <div className='flex flex-col '>
      <p>Profile</p>
      <h2>{data === 'nothing'?"Nothing":<Link href={`/profile/${data}`}>
      </Link>}</h2>
      <div>hi</div>
      <hr/>
      <button
      onClick={logout}
       className='rounded-lg px-4 bg-blue-300'>Logout</button>
      
       <button
      onClick={getuserDetails}
       className='rounded-lg px-4 bg-blue-300'>get user details</button>
      </div>
    
  )
}

export default ProfilePage