import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const chazaApi=axios.create({
    baseURL:getEnvVariables().VITE_API_URL
});
    
chazaApi.interceptors.request.use((configure)=>{

    configure.headers={
        ...configure.headers,
        "x-token":localStorage.getItem("token")
    }
    
    return configure;
})

export default chazaApi;