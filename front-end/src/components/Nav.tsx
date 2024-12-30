
import { taskState } from "@/features/taskAtom"
import { userState } from "@/features/userAtom"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"


export default function Nav(){
    const navigate = useNavigate()
    const user = useRecoilValue(userState)
    const [task , setTask] = useRecoilState(taskState)
   
    function updateState(){
      setTask({
        id: '',
        title: '',
        priority: '',
        status: '',
        startTime: '',
        endTime:''
      })
      navigate('/task')

    }
    return (
        <div className=" p-4  text-center border-b shadow-sm shadow-primary rounded-lg   mb-4 flex justify-between items-center sm:w-full sm:p-1">
            <div className="text-[24px] uppercase font-rubik text-primary sm:text-[16px]" onClick={()=> navigate('/tasklist')}>
            Task Manager
            </div>
            <div className="flex justify-center gap-4 font-poppins text-white sm:gap-2 sm:items-center">
            <div className="text-[18px] px-4 py-2 rounded-full text-primary-text border-2 border-primary-text cursor-pointer sm:text-[12px] sm:p-1 sm:h-8" onClick={() => navigate('/analysis')}>
                Analysis
            </div>
            <div className="text-[18px] px-4 py-2 rounded-full bg-primary-text cursor-pointer sm:hidden" onClick={updateState}>
                Add Task
            </div>

            <div className="text-[18px] px-4 py-2 rounded-full bg-primary-text cursor-pointer sm:text-[12px] sm:p-1 sm:h-8" onClick={updateState}>
                Add 
            </div>
            <div className="text-[18px] px-4 py-2 rounded-full text-primary-text cursor-pointer sm:text-[12px]">
                 Hi ,{user.name}
            </div>
            </div>
        </div>
    )
}