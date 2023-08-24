import { useDispatch, useSelector } from "react-redux"
import { onChecking, onLogin, onLogout } from "../store";
import chazaApi from "../api/ChazaApi";


export const useAuthStore = () => {
    const {status,user,errorMessage}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();

    const startLogin=async({email,password})=>{
        dispatch(onChecking());
        try {
            const {data}=await chazaApi.post("/auth/login",{email,password});
            console.log(data);

            localStorage.setItem("token",data.token);

            dispatch(onLogin({name:data.name,uid:data.uid,type:data.type}));
        } catch (error) {
            console.log(error);
            dispatch(onLogout("error xd"));
        }
    }

    const startRegister=async({name,email,password})=>{
        dispatch(onChecking());
        try {
            const {data}=await chazaApi.post("/auth/create",{name,email,password});
            console.log(data);

            localStorage.setItem("token",data.token);

            dispatch(onLogin({name:data.name,uid:data.uid,type:data.type}));
        } catch (error) {
            console.log(error);
            dispatch(onLogout("error xd"));
        }
    }

    const startLogout=()=>{
        dispatch(onChecking());

        dispatch(onLogout());
        localStorage.clear();
    }

    const checkToken=async()=>{
        dispatch(onChecking());
        try {
            const {data}=await chazaApi.get("/auth/token");
            console.log(data);

            localStorage.setItem("token",data.token);
            dispatch(onLogin({name:data.name,uid:data.uid,type:data.type}));
        } catch (error) {
            console.log(error);
            localStorage.clear();
            dispatch(onLogout("error en el token"));
        }
    }

    return {
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
        startLogout,
        checkToken
    }
}
