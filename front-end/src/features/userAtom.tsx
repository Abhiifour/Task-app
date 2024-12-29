import { atom } from "recoil";

export interface user{
    id : string ,
    name : string,
    email : string ,
    token : string , 
}

export const userState = atom({
    key: 'userState',
    default: {} as user, 
});