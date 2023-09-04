import { useDispatch, useSelector } from "react-redux"
import { onChecking, onLogin, onLogout } from "../store";
import chazaApi from "../api/ChazaApi";
import Swal from "sweetalert2";


export const useAuthStore = () => {
    const {status,user,errorMessage}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();

    const startLogin=async({email,password})=>{
        dispatch(onChecking());
        try {
            const {data}=await chazaApi.post("/auth/login",{email,password});

            localStorage.setItem("token",data.token);

            dispatch(onLogin({name:data.name,uid:data.uid,type:data.type,chaza:data.chaza}));
        } catch (error) {
            Swal.fire("Error al iniciar sesion",error.response.data.msg || "datos invalidos","error");
            dispatch(onLogout("error xd"));
        }
    }

    const startRegister=async({name,email,password})=>{
        dispatch(onChecking());
        try {
            const {data}=await chazaApi.post("/auth/create",{name,email,password});
            console.log(data);

            localStorage.setItem("token",data.token);

            dispatch(onLogin({name:data.name,uid:data.uid,type:data.type,chaza:data.chaza}));
        } catch (error) {
            console.log(error);
            
            Swal.fire("Error al registrarse" , error.response.data.msg || "datos invalidos","error")
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
        if(!localStorage.getItem("token")){
            dispatch(onLogout());
            return;
        }
        try {
            const {data}=await chazaApi.get("/auth/token");
            //console.log(data);

            localStorage.setItem("token",data.token);
            dispatch(onLogin({name:data.name, uid:data.uid, type:data.type, chaza:data.chaza}));
        } catch (error) {
            localStorage.clear();
            Swal.fire("cerrando sesion",error.response.data.msg || "datos invalidos","error");
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
