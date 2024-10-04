import axios from "axios";

const BASE_URL = "http://localhost:3000/api"

export const getAPI = async(url )=>{
    try {
        let header = {};
        if(localStorage.getItem("token")){
            header = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            }
        }

        let result = await axios.get(BASE_URL+ url,header);

        if(url== "/login" && result.statusCode === 200)
            return {
                data: result.data,
                message: result.message
            }
        else if(result.data){
            return{
                data: result.data.data,
                message: result.message
            }
        }
        
        return({
            message: result.message,

        })
        
    } catch (error) {
        localStorage.removeItem('token')
        console.log(error);
        return({
            message: error
            
        })
    }
}

export const postAPI = async(url, data )=>{
    try {
        let header = {};
        if(localStorage.getItem("token")){
            header = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            }
        }

        let result = await axios.post(BASE_URL+ url,data,header )
        if(url == "/register") return result;
        if(result.status === 200 || result.status === 201)
            return {
                data: result.data,
                message: result.message
            }
        
        return({
            message: result.message,

        })
        
    } catch (error) {
        console.log(error);
        return({
            message: error
            
        })
    }
}