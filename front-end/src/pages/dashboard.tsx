import axios from "axios";
import Application from "../components/Application";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";




export default function Dashboard(){

    async function getApplications (){
        const applications = await axios.get('http://localhost:3000/')
        return applications;
    }
    
   

    const [data , setData ] = useState<any[]>([])
    useEffect(()=>{
        const fetchData = async()=>{
            const dummy : any = await getApplications();
            setData(dummy.data)
        }
        fetchData()
       
    }, [])
    return (
        <div className="w-full  p-4 bg-bg">
            <Nav/>
            <div className="container mt-4 px-8 flex flex-col gap-4">
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
            
        </div>
    )
}