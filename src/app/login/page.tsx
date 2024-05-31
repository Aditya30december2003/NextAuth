"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React , {useEffect} from 'react'
import axios from 'axios'

export default function Login(){
  const router = useRouter();
  const[disable , setDisable] = React.useState(false);
  const [user , setUser] = React.useState({
    email:"",
    password:"",
  })

  const login = async()=>{
    try {
      const response = await axios.post("/api/users/login" , user)
      console.log("Login successful " , response.data)
      alert("Login successful")
      router.push("/profile")
    } catch (error:any) {
      alert("Login failed")
      console.log(error)
    }
  }

  useEffect(()=>{
    if(user.email.length >0 && user.password.length > 0){
     setDisable(true)
    }
    else{
      setDisable(false)
    }
  } , [user])

    return (
        <>
      <div className=''>
      <div className=''>
      <video className=' w-full h-screen object-cover'  autoPlay muted loop></video>
      </div>
      <div className='absolute top-0 left-0 bg-black/40 w-full h-full'>
        <div className='p-4'><h1 className='text-white font-bold text-[2.5rem]'>Login</h1></div>
       {/* card */}
       <div className='bg-white w-[80%] lg:w-[40%] mx-auto my-[1%] p-8 rounded-sm'>
        <div className='flex flex-col gap-3 mt-2'>
          <input value={user.email}  onChange={(e)=>setUser({...user , email:e.target.value})}  className='border-gray-300 text-black border-2 w-[90%] p-2 outline-none rounded-sm mx-auto' type="text" placeholder='Email' />
          <input value={user.password} onChange={(e)=>setUser({...user , password:e.target.value})} className='border-gray-300 text-black border-2 w-[90%] p-2 outline-none rounded-sm mx-auto'type="password" placeholder='Password' />
          <button onClick={login} className='w-[90%] bg-blue-500 py-1 rounded-sm mx-auto'>{!disable? 'Cant login' : 'Login'}</button>
        </div>
        <p className='p-2 mx-auto text-center mt-1 text-black'>New to this account? <Link href='/signup' className='cursor-pointer hover:underline-3'>Signup</Link></p>
       </div>
      </div>
    </div>
        </>
    )
}