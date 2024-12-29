import Nav from "@/components/Nav"
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
  
type summary = {
   length : number;
   pendingCount : number;
   pendingPercentage : number;
   completedPercentage : number;
}

export default function AnalysisPage(){
   const user = useRecoilValue(userState)
   const [analysisData , setAnalysisData] = useState<summary | null>(null)

   async function fetchData(){
      const response = await axios.get<summary>(`http://localhost:3000/summary`,{
         headers: { Authorization: `Bearer ${user.token}` }
      })

      setAnalysisData(response.data)
   }

    useEffect(()=>{
      async function getData(){
         await fetchData()
      }
      getData()
    },[])
    return (
        <div className="p-10 font-poppins">
         <Nav/>
        {/* header */}
        <h2 className="text-[28px] font-semibold">Dashboard</h2>
        {/* summary */}
        <h3 className="text-[24px] mt-10">Summary</h3>
        <div  className="flex gap-10 mt-4">
           
            <div>
               <div className="text-[24px] font-semibold">{analysisData?.length}</div>
               <div className="text-slate-500">Total Tasks</div>
            </div>

            <div>
               <div  className="text-[24px] font-semibold">{analysisData?.completedPercentage}</div>
               <div className="text-slate-500">Task completed</div>
            </div>

            <div>
               <div  className="text-[24px] font-semibold">{analysisData?.pendingPercentage}</div>
               <div className="text-slate-500">Tasks pending</div>
            </div> 

            <div>
               <div  className="text-[24px] font-semibold">3.5</div>
               <div className="text-slate-500">Average time per completed task</div>
            </div>
        </div>


        {/* pending task summary */}

        <h3 className="text-[24px] mt-12">Pending Task summary</h3>
        <div className="flex gap-10 mt-6">
           
            <div>
               <div className="text-[24px] font-semibold">{analysisData?.pendingCount}</div>
               <div className="text-slate-500">pending Tasks</div>
            </div>

            <div>
               <div className="text-[24px] font-semibold">56 hrs</div>
               <div className="text-slate-500">Total time lapsed</div>
            </div>

            <div>
               <div className="text-[24px] font-semibold">24 hrs</div>
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
            <TableRow className="bg-slate-200">
            <TableCell className="font-medium">1</TableCell>
            <TableCell>3</TableCell>
            <TableCell>12</TableCell>
            <TableCell className="text-right">8</TableCell>
            </TableRow>

            <TableRow >
            <TableCell className="font-medium">2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>12</TableCell>
            <TableCell className="text-right">8</TableCell>
            </TableRow>

            <TableRow className="bg-slate-200">
            <TableCell className="font-medium">3</TableCell>
            <TableCell>3</TableCell>
            <TableCell>12</TableCell>
            <TableCell className="text-right">8</TableCell>
            </TableRow>

            <TableRow >
            <TableCell className="font-medium">4</TableCell>
            <TableCell>3</TableCell>
            <TableCell>12</TableCell>
            <TableCell className="text-right">8</TableCell>
            </TableRow>

            <TableRow className="bg-slate-200">
            <TableCell className="font-medium">5</TableCell>
            <TableCell>3</TableCell>
            <TableCell>12</TableCell>
            <TableCell className="text-right">8</TableCell>
            </TableRow>
        </TableBody>
        </Table>
         </div>
       

        </div>
    )
}