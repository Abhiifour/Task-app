import { atom } from "recoil";

export interface task{
    id : string ,
    title : string,
    status : string ,
    priority : string , 
    startTime : string,
    endTime: string
}

export const taskState = atom({
    key: 'taskState',
    default: {} as task, 
});