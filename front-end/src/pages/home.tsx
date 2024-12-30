import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate()
    return (
        <div className="w-full h-screen  items-center justify-center flex flex-col">

            <div className="text-[30px] font-mono font-bold sm:text-[18px] sm:text-start">
                Smart Task Manager
            </div>
            <div className="text-[60px] font-bold sm:text-[22px] sm:text-start">
            Stay Organized, Get Things Done.
            </div>
            <div className="text-[20px] sm:text-[12px] sm:px-8 sm:text-center">
            The leading tool for organizing, tracking, and managing all of your task in one place.
            </div>
            <div className="bg-primary text-[22px] font-semibold rounded-full p-3 w-[220px] text-center text-white mt-10 bg-primary-text cursor-pointer sm:w-[140px] sm:text-[14px]" onClick={() =>navigate('/user')}>
                Start Tracking
            </div>
        </div>
    )
}