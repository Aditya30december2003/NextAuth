"use client"
import Link from 'next/link'
import axios from 'axios'
import React, {useEffect} from 'react'
import {useRouter} from 'next/navigation'

export default function SignUp(){
  const router = useRouter();
  const [buttonDisabled , setButtonDisabled] = React.useState(false)
  const [user , setUser] = React.useState({
      email:"",
      password:"",
      username:"",
  })

  const onSignUp = async()=>{
  try{
   const response = await axios.post("/api/users/signup" , user)
   console.log("Signup success" , response.data)
   alert("Signup success");
   router.push("/login")
   
  }catch(error : any){

  console.log(error);
  alert("Failed to signup");
  }finally{

  }
  }

  useEffect(()=>{
  if(user.password.length>0 &&user.username.length>0 && user.email.length>0 ){
   setButtonDisabled(false)
   console.log("user enabled")
  }else{
      setButtonDisabled(true);
  }
  },[user])


    return (
    <>
      <div className=''>
      </div>
      <div className='absolute top-0 left-0 bg-black/40 w-full h-full'>
        <div className='p-4'><h1 className='text-white font-bold text-[2.5rem]'>Signup</h1></div>
       {/* card */}
       <div className='bg-white w-[80%] lg:w-[40%] mx-auto my-[1%] p-8 rounded-sm'>
        <div className='flex flex-col gap-3 mt-4'>
          <input id='username' value={user.username} onChange={(e)=>setUser({...user ,username : e.target.value})}  className='border-gray-300 text-black border-2 w-[90%] p-2 outline-none rounded-sm mx-auto' type="text" placeholder='Name' />
          <input id='email' value={user.email} onChange={(e)=>setUser({...user , email : e.target.value})} className='border-gray-300 text-black border-2 w-[90%] p-2 outline-none rounded-sm mx-auto' type="text" placeholder='Email' />
          <input id='password' value={user.password} onChange={(e)=>setUser({...user ,password : e.target.value})} className='border-gray-300 text-black border-2 w-[90%] p-2 outline-none rounded-sm mx-auto'type="password" placeholder='Password' />
          <button onClick={onSignUp} className='w-[90%] bg-blue-500 py-1 rounded-sm mx-auto'>{!buttonDisabled ?'Join Now' :'Cant Join'}</button>
        </div>
        <p className='p-2 mx-auto text-center mt-1 text-black'>Already have an account? <Link href='/login' className='cursor-pointer hover:underline-3'> Log in</Link></p>
       </div>
      </div>
    </>
    )
}