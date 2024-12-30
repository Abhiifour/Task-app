
import back from '../assets/back.png'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRecoilValue } from "recoil";
import { taskState } from "@/features/taskAtom";
import { userState } from "@/features/userAtom";
import Nav from '@/components/Nav';


export default function New(){
    const user = useRecoilValue(userState)

    const task = useRecoilValue(taskState)
    const [loading,setLoading] = useState(true)
    const[title ,setTitle] = useState(task.title ? task.title : "")
    const [priority , setPriority] = useState(task.priority ? task.priority : "1");
    const [status , setStatus] = useState(task.status ? task.status : "pending");
    const [startTime, setStartTime] = useState<Date | null>(task.startTime ? new Date(task.startTime) : null);
    const [endTime, setEndTime] = useState<Date | null>(task.endTime ? new Date(task.endTime) : null);
    

    const navigate = useNavigate()
    

    useEffect( ()=>{
        

        setTimeout(() => {
            setLoading(false)
        }, 400);
     
    },[startTime])



    async function handleSubmit (e : React.FormEvent){
        e.preventDefault()
        try {
            if(!task.id ){

                await axios.post(`https://task-app-l5ta.onrender.com/create`, {
                    title,
                    status,
                    priority,
                    startTime: startTime ? startTime.toISOString() : null,
                    endTime: endTime ? endTime.toISOString() : null
                }, {
                    headers: { Authorization: `Bearer ${user.token}` }
                })
                toast('Task Added!', {
                    icon: '👏',
                });
                
            }
           
            else{
                console.log(user)
                await axios.put(`https://task-app-l5ta.onrender.com/update`, {
                    id: task.id,
                    title,
                    status,
                    priority,
                    startTime: startTime ? startTime.toISOString() : null,
                    endTime: endTime ? endTime.toISOString() : null
                }, {
                    headers: { Authorization: `Bearer ${user.token}` }
                })
                toast('Task Updated!', {
                    icon: '👏',
                });
                
            }
            navigate("/tasklist")
           
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className="w-full  p-4 font-poppins sm:w-full sm:p-4">
          
            <Nav/>
            <div className="text-primary font-medium text-[26px] w-[700px] m-auto p-4 font-poppins sm:w-full sm:text-[20px]" >
            {task.id ?"UPDATE TASK":"ADD TASK"}
            </div>
            <div className="w-[700px] p-2 m-auto px-8 sm:m-0 sm:w-full">
            <div className="rounded-lg hover:bg-nav w-[100px] text-[18px] p-2 text-center mb-4 cursor-pointer flex items-center justify-center transition-all ease-in-out" onClick={() => navigate('/tasklist')}>
            <div className='w-[15px] h-[15px]  cursor-pointer'>
                <img src={back} alt="full-screen" className='w-[15px] h-[15px]' />
            </div>
                Back
            </div>
            {
                loading ? <Loading/> : <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">

                    <label htmlFor="title" className="text-[16px]">Title</label>
                    <input type="text" id="title" placeholder="eg. Apply for a job" className="p-3 text-[16px] rounded-lg bg-white border" value={title} onChange={(e)=>setTitle(e.target.value)} />
                
                </div>
                <div className="flex flex-col gap-3 w-[200px]">
                    <label htmlFor="priority" className="text-[16px]">Priority</label>
                    <select name="priority" id="priority" className="p-3 text-[16px] rounded-lg bg-white border" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>    
                    
                </div>
                <div className="flex flex-col gap-3">

                    <label htmlFor="status" className="text-[16px]">Status</label>
                    <RadioGroup value={status} onValueChange={(value) => setStatus(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pending" id="option-one" />
                        <Label htmlFor="option-one">Pending</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="finished" id="option-two" />
                        <Label htmlFor="option-two">Finished</Label>
                    </div>
                    </RadioGroup>

                </div>

                <div className="flex justify-between sm:flex-wrap">
                <div className="flex flex-col gap-3 ">
                <label htmlFor="start-time">Start time:</label>

                <input
                type="datetime-local"
                id="start-time"
                name="start-time"
                value={startTime ? startTime.toISOString().slice(0, 16) : ''}
                className="border p-2 cursor-pointer"
                onChange={(e) => setStartTime(new Date(e.target.value))}
                />
                
                  
                </div>   


                <div className="flex flex-col gap-3">
                <label htmlFor="end-time">End time:</label>

                <input
                type="datetime-local"
                id="end-time"
                name="end-time"
                value={endTime ? endTime.toISOString().slice(0, 16) : ''}
                className="border p-2 cursor-pointer"
                onChange={(e) => setEndTime(new Date(e.target.value))}
                />
                
                  
                </div>       
                    
                </div>             
              
                 
                <button className="p-2 w-[120px] text-[16px] border rounded-lg bg-primary-text text-white cursor-pointer" onClick={handleSubmit}>{task.id  ?"UPDATE":"SAVE"}</button>
                
            </form>
            }
           
           </div>
        </div>
    )
}