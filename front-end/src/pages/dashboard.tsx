import axios from "axios";

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

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const user = useRecoilValue(userState);
    const [data, setData] = useState<task[]>([]);
    const [displayData, setDisplayData] = useState<task[]>([]);

    async function getApplications() {
        const tasks = await axios.get(`https://task-app-l5ta.onrender.com/`, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        return tasks;
    }

    useEffect(() => {
        const fetchData = async () => {
            const dummy: any = await getApplications();
            const initialData = dummy?.data?.reverse() || [];
            setData(initialData);
            setDisplayData(initialData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleTimeSort = (value: string) => {
        const sortedData = [...displayData];
        
        switch (value) {
            case "start-asc":
                sortedData.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
                break;
            case "start-desc":
                sortedData.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
                break;
            case "end-asc":
                sortedData.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
                break;
            case "end-desc":
                sortedData.sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());
                break;
            default:
                return;
        }
        setDisplayData(sortedData);
    };

    const handlePriorityFilter = (value: string) => {
        if (!value) {
            setDisplayData(data);
            return;
        }
        const filteredData = data.filter(item => item.priority === value);
        setDisplayData(filteredData);
    };

    const handleStatusFilter = (value: string) => {
        if (!value) {
            setDisplayData(data);
            return;
        }
        const filteredData = data.filter(item => item.status === value);
        setDisplayData(filteredData);
    };

    return (
        <div className="w-full min-h-screen p-4 font-poppins">
          
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div className="flex justify-end gap-8 px-8 py-4 sm:gap-2 sm:p-2">
                        <div>
                            <Select onValueChange={handleTimeSort}>
                                <SelectTrigger className="w-[150px] sm:w-[80px]">
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
                            <Select onValueChange={handlePriorityFilter}>
                                <SelectTrigger className="w-[150px] sm:w-[80px]">
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
                            <Select onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-[150px] sm:w-[80px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="finished">Finished</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-wrap p-4 gap-2 gap-y-4 sm:gap-4 sm:flex-col sm:items-center sm:justify-center sm:mt-4">
                        {displayData.map((item) => (
                            <TaskCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                status={item.status}
                                priority={item.priority}
                                startTime={item.startTime}
                                endTime={item.endTime}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}