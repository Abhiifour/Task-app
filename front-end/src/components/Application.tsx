
import open from '../assets/open.png'

import { useNavigate } from 'react-router-dom';

type applications = {
    id : string;
    position : string;
    company : string;
    compensation : number;
    location : string;
    status : string;
}

export default function Application(props : applications){
    const navigate = useNavigate()
    
    //const Id = useSelector((state: any) => state.application)
    function handleChange (){
       
        setTimeout(()=>{
            navigate("/application")
        },400)
        
    }
    return (
        <div className="border rounded-lg shadow-md p-4 flex flex-1 justify-between items-center bg-white font-poppins">
            <div className='w-1/6'>{props.position}</div>
            <div  className='w-1/6'>{props.company}</div>
            <div className='w-1/6'>${props.compensation}</div>
            <div className='w-1/6'>{props.location}</div>
            <div className='w-1/6'>{props.status}</div>
            <div className='w-[40px] h-[20px] hover:opacity-30 cursor-pointer flex justify-center' onClick={handleChange}>
                <img src={open} alt="full-screen" className='w-[20px] h-[20px]' />
            </div>
        </div>
    )
}