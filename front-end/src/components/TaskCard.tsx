import { task, taskState } from "@/features/taskAtom";
import { userState } from "@/features/userAtom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

export default function TaskCard({id,title,status,priority,endTime,startTime} : task){

    const [currentTask , setCurrentTask] = useRecoilState(taskState);
    // const [startTime, setStartTime] = useState(new Date(startDate));
    // const [endTime, setEndTime] = useState(new Date(endDate));
    // const dateObject = new Date(endDate)
    // console.log(startDate)
    const user = useRecoilValue(userState)
    const navigate = useNavigate()

    function handleEdit(){
        setCurrentTask({
            id,
            title,
            status,
            priority,
            endTime,
            startTime
        })
        navigate('/task')
    }

    async function handleDelete(){
        console.log(id)
        try {
            await axios.post(`http://localhost:3000/delete`, {
            headers: { Authorization: `Bearer ${user.token}` },
            id
            });
            // Optionally, you can add code here to update the UI or state after deletion
            toast('Application Deleted !', {
                icon: '👋🏼',
            });
            navigate("/tasklist")
            
        } catch (error) {
            console.error("Failed to delete the task:", error);
        }
    }
    return (
        <div className="max-w-[250px]  border-2 font-poppins">
        <div className=" p-4 flex flex-col gap-6 ">
            <div>
                <div className="text-[13px] text-slate-400">
                    Task ID: {id}
                </div>
                <div className="text-[18px] text-primary-text font-semibold">
                    {title}
                </div>
            </div>
          

            <div className="flex justify-between items-center gap-4">
                <div className={`text-[14px] border px-2 w-[80px] text-center ${status === 'pending' ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}`}>
                    {status}
                </div>
                <div className="text-[14px] w-[100px]">
                    Priority: {priority}
                </div>
            </div>

            <div className="flex justify-between items-center text-[13px] text-slate-500">
                <div className="w-[100px]">
                    <div className="text-[16px] text-black">Start</div>
                    <>
                        <div>{new Date(startTime).toLocaleDateString()}</div>
                        <div>{new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </>
                                
                    </div>
                    <div className="w-[100px]">
                        <div className="text-[16px] text-black">End</div>
                    <>
                        <div>{new Date(endTime).toLocaleDateString()}</div>
                        <div>{new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </>
                </div>
            </div>

            
        </div>
        <div className="flex justify-between items-center p-3 px-14 bg-bg mt-6 border-t-2">
        <div className=" text-[15px] text-stone-400 hover:text-stone-600 cursor-pointer hover:underline underline-offset-1" onClick={handleEdit}>
            Edit
        </div>
        <div className="text-red-400 cursor-pointer hover:text-red-600 hover:underline underline-offset-1 " onClick={handleDelete}>
            Delete
        </div>
    </div>
    </div>
    )
}