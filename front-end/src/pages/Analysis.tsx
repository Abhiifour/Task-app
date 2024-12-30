import Loading from "@/components/Loading"

import back from "../assets/back.png"
import {
    Table,
    TableBody,

    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { userState } from "@/features/userAtom"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { useNavigate } from "react-router-dom"
import Nav from "@/components/Nav"
  
type summary = {
   length : number;
   pendingCount : number;
   pendingPercentage : number;
   completedPercentage : number;
   avg : number;
   totalLapsedTime : number;
   totalTimeToComplete : number;
   TaskPriority : {
      [key: string]: {
         count: number;
         timeLapsed: number;
         timeToFinish: number;
      }
   }
}

export default function AnalysisPage(){
   const user = useRecoilValue(userState)
   const [analysisData , setAnalysisData] = useState<summary | null>(null)
   const[loading,setLoading] = useState(true)
   const navigate = useNavigate()


   async function fetchData(){
      const response = await axios.get<summary>(`https://task-app-l5ta.onrender.com/summary`,{
         headers: { Authorization: `Bearer ${user.token}` }
      })

      setAnalysisData(response.data)
      
   }

    useEffect(()=>{
      async function getData(){
         await fetchData()
      }
      getData()
      setTimeout(() => {
         setLoading(false)
      }, 300);
     
    },[])

    if(loading) {
      return <Loading/>
    }
    return (
      <div>
 <Nav/>
        <div className="p-10 font-poppins sm:w-full sm:p-4">
         <div className="rounded-lg hover:bg-nav w-[100px] text-[18px] p-2 text-center mb-4 cursor-pointer flex items-center justify-center transition-all ease-in-out" onClick={() => navigate('/tasklist')}>
            <div className='w-[15px] h-[15px]  cursor-pointer'>
                <img src={back} alt="full-screen" className='w-[15px] h-[15px]' />
            </div>
                Back
            </div>
        {/* header */}
        <h2 className="text-[28px] font-semibold sm:text-[22px]">Dashboard</h2>
        {/* summary */}
        <h3 className="text-[24px] mt-10 sm:text-[18px]">Summary</h3>
        <div  className="flex gap-10 mt-4 sm:flex-wrap sm:gap-6">
           
            <div>
               <div className="text-[24px] font-semibold sm:text-[18px]">{analysisData?.length}</div>
               <div className="text-slate-500">Total Tasks</div>
            </div>

            <div>
               <div  className="text-[24px] font-semibold sm:text-[18px]">{Math.floor(analysisData?.completedPercentage || 0)}%</div>
               <div className="text-slate-500">Task completed</div>
            </div>

            <div>
               <div  className="text-[24px] font-semibold sm:text-[18px]">{Math.floor(analysisData?.pendingPercentage || 0)}%</div>
               <div className="text-slate-500">Tasks pending</div>
            </div> 

            <div>
               <div  className="text-[24px] font-semibold sm:text-[18px]">{analysisData?.avg} hrs</div>
               <div className="text-slate-500">Average time per completed task</div>
            </div>
        </div>


        {/* pending task summary */}

        <h3 className="text-[24px] mt-12 sm:text-[18px]">Pending Task summary</h3>
        <div className="flex gap-10 mt-6 sm:flex-wrap sm:gap-6">
           
            <div>
               <div className="text-[24px] font-semibold sm:text-[18px]">{analysisData?.pendingCount}</div>
               <div className="text-slate-500">pending Tasks</div>
            </div>

            <div>
               <div className="text-[24px] font-semibold sm:text-[18px]">{analysisData?.totalLapsedTime} hrs</div>
               <div className="text-slate-500">Total time lapsed</div>
            </div>

            <div>
               <div className="text-[24px] font-semibold sm:text-[18px]">{analysisData?.totalTimeToComplete} hrs</div>
               <div className="text-slate-500">Total time to finish</div>
            </div> 

           
        </div>


        {/* table */}

         <div className="mt-20">
         <Table className="max-w-[700px]  border rounded-xl">
        
        <TableHeader className="bg-slate-800 text-slate-50">
            <TableRow>
            <TableHead className="w-[100px]">Task Priority</TableHead>
            <TableHead>Pending Tasks</TableHead>
            <TableHead>Time lapsed</TableHead>
            <TableHead className="text-right">Time to finish</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow >
            <TableCell className="font-medium">1</TableCell>
            <TableCell>{analysisData?.TaskPriority['1']?.count ?? 0}</TableCell>
            <TableCell>{analysisData?.TaskPriority['1']?.timeLapsed ?? 0}</TableCell>
            <TableCell className="text-right">{analysisData?.TaskPriority['1']?.timeToFinish ?? 0}</TableCell>
            </TableRow>


            <TableRow >
            <TableCell className="font-medium">2</TableCell>
            <TableCell>{analysisData?.TaskPriority['2']?.count ?? 0}</TableCell>
            <TableCell>{analysisData?.TaskPriority['2']?.timeLapsed ?? 0}</TableCell>
            <TableCell className="text-right">{analysisData?.TaskPriority['2']?.timeToFinish ?? 0}</TableCell>
            </TableRow>

            <TableRow className="bg-slate-200">
            <TableCell className="font-medium">3</TableCell>
            <TableCell>{analysisData?.TaskPriority['3']?.count ?? 0}</TableCell>
            <TableCell>{analysisData?.TaskPriority['3']?.timeLapsed ?? 0}</TableCell>
            <TableCell className="text-right">{analysisData?.TaskPriority['3']?.timeToFinish ?? 0}</TableCell>
            </TableRow>

            <TableRow >
            <TableCell className="font-medium">4</TableCell>
            <TableCell>{analysisData?.TaskPriority['4']?.count ?? 0}</TableCell>
            <TableCell>{analysisData?.TaskPriority['4']?.timeLapsed ?? 0}</TableCell>
            <TableCell className="text-right">{analysisData?.TaskPriority['4']?.timeToFinish ?? 0}</TableCell>
            </TableRow>

            <TableRow className="bg-slate-200">
            <TableCell className="font-medium">5</TableCell>
            <TableCell>{analysisData?.TaskPriority['5']?.count ?? 0}</TableCell>
            <TableCell>{analysisData?.TaskPriority['5']?.timeLapsed ?? 0}</TableCell>
            <TableCell className="text-right">{analysisData?.TaskPriority['5']?.timeToFinish ?? 0}</TableCell>
            </TableRow>
        </TableBody>
        </Table>
         </div>
       

        </div>
      </div>
       
    )
}