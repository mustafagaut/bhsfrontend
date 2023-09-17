import axios from "axios";

let url= "http://localhost:4000/api/v1/user/"

export const userLogin = async (data)=>{
    try{
 return await axios.post(`${url}login`,data,{
    headers:{
        'Content-Type': 'application/json'
    }
 });
    }catch(err){
        return err;
    }
}