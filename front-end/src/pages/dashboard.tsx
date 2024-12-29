import axios from "axios";

import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import TaskCard from "@/components/TaskCard";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { task } from "@/features/taskAtom";
import { useRecoilValue } from "recoil";
import { userState } from "@/features/userAtom";
  




export default function Dashboard(){

    const [loading,setLoading] = useState(true)
    const user = useRecoilValue(userState)

    async function getApplications (){
        // console.log(user)
        const tasks = await axios.get(`http://localhost:3000/`,{
            headers: { Authorization: `Bearer ${user.token}` }
        })
        return tasks;
    }
    
   

    const [data , setData ] = useState<task[]>([])

    useEffect(()=>{

        const fetchData = async()=>{
            const dummy : any = await getApplications();
            setData(dummy.data)
            setLoading(false)
        }
        fetchData()
    //     setTimeout(() => {
    //         console.log(data)
    //     }, 1000);
    //    console.log(data);
    }, [])


    return (
        <div className="w-full min-h-screen  p-4 font-poppins ">
            <Nav/>
            {/* sorting */}
            <div className=" flex justify-end gap-8 px-8 py-4">

                <div>
                <Select>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem value="start-asc">Start time: asc</SelectItem>
                    <SelectItem value="start-desc">Start time: desc</SelectItem>
                    <SelectItem value="end-asc">End time: asc</SelectItem>
                    <SelectItem value="end-desc">End time: desc</SelectItem>
                   
                </SelectContent>
                </Select>

                </div>

                <div>
                <Select>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                </SelectContent>
                </Select>

                </div>


                <div>
                <Select>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
                </Select>

                </div>

            </div>
            {/* {
              loading ? <Loading/> :  <div className="container mt-4 px-8 flex flex-col gap-4">
              <div className="flex flex-1 items-center justify-between text-[18px] font-semibold p-4 border-b-2 font-noto"> 
              <div  className='w-1/6'>JOB POSITION</div>
              <div className=" w-1/6">COMPANY</div>
              <div  className='w-1/6'>COMPENSATION</div>
              <div  className='w-1/6'>LOCATION</div>
              <div  className='w-1/6'>STATUS</div>
              <div className=''>EDIT</div>
              </div>
              {
                  data.map((item: any) => <Application key={item.id} id={item.id} position={item.position} company={item.company} compensation={item.compensation} location={item.location} status={item.status}/>)
              }

          </div>
            } */}

            <div className="flex flex-wrap p-4 gap-2 gap-y-4">
            {
                data.map((item) =>   <TaskCard id={item.id} title={item.title} status={item.status} priority={item.priority} startTime={item.startTime} endTime={item.endTime} />)
            }
            </div>
          

            
            
        </div>
    )
}