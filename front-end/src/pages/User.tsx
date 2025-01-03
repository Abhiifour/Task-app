
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { userState } from "@/features/userAtom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
  

export  function User(){
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [name , setName] = useState("")
    const [, setUser] = useRecoilState(userState)
    const navigate = useNavigate()
    


    async function handleLogin(e : any){
        e.preventDefault()
        const response = await axios.post('https://task-app-l5ta.onrender.com/login', {
            email,
            password
        });


        setUser({
            id: response.data.id,
            email:response.data.email,
            name: response.data.name,
            token: response.data.token
        })

        if(response){
            navigate('/tasklist')
        }

        // setTimeout(() => console.log(user), 0);
        // window.localStorage.setItem("token",task.data.token)

        
    }


    
    async function handleSignup(e : any){
        e.preventDefault()
        await axios.post('https://task-app-l5ta.onrender.com/signup', {
            name,
            email,
            password
        });
        toast('Please Login with the same credentials!', {
            icon: '👋🏼',
        });
    }


    return (
       <div className="h-screen flex items-center justify-center bg-bg sm:w-full">
         <div className="flex gap-6 ">


         <Dialog>
        <DialogTrigger> 
            <div className="text-[24px] font-medium border-2 p-3 rounded-md cursor-pointer sm:text-[16px]">
            Existing User
            </div>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-md ">
            <DialogHeader>
            <DialogTitle className="text-[22px] sm:text-[18px]">Log in</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-3 ">
                    <label htmlFor="email" className="text-[16px]">Email</label>
                    <input type="email" id="email" placeholder="johndoe@eg.com" className="p-3 text-[16px] rounded-lg bg-white border" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                    <label htmlFor="password" className="text-[16px]">Password</label>
                    <input type="password" id="password" placeholder="password" className="p-3 text-[16px] rounded-lg bg-white border" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="p-2 w-[120px] text-[16px] border rounded-lg bg-primary-text text-white cursor-pointer mt-8 sm:w-[80px] sm:text-[14px]"  onClick={handleLogin}>Login</button>
            </form>
        </DialogContent>
        </Dialog>


        <Dialog>
        <DialogTrigger> 
        <div className="text-[24px] font-medium border-2 p-3 rounded-md cursor-pointer sm:text-[16px]">
            New User
            </div>
        </DialogTrigger>
        <DialogContent className="bg-white">
            <DialogHeader>
            <DialogTitle className="text-[22px] sm:text-[18px]">Sign up</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSignup}>

            <div className="flex flex-col gap-3 ">
                    <label htmlFor="name" className="text-[16px]">Full Name</label>
                    <input type="text" id="name" placeholder="john doe" className="p-3 text-[16px] rounded-lg bg-white border" required  onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                    <label htmlFor="email" className="text-[16px]">Email</label>
                    <input type="email" id="email" placeholder="johndoe@eg.com" className="p-3 text-[16px] rounded-lg bg-white border" required  onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                    <label htmlFor="password" className="text-[16px]">Password</label>
                    <input type="password" id="password" placeholder="password" className="p-3 text-[16px] rounded-lg bg-white border" required  onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="p-2 w-[120px] text-[16px] border rounded-lg bg-primary-text text-white cursor-pointer mt-8 sm:w-[80px] sm:text-[14px]" onClick={handleSignup}>Signup</button>
            </form>
        </DialogContent>
        </Dialog>


       
           
        </div>
       </div>
    )
}


export  function Signup(){
    return (
        <div>

        </div>
    )
}


export  function Signin(){
    return (
        <div>

        </div>
    )
}