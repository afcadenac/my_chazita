import { useDispatch, useSelector } from "react-redux";
import chazaApi from "../api/ChazaApi";
import { onLoadUsers, onUpdateUser } from "../store";


export const useUserStore = () => {
    const {users}=useSelector((state)=>state.user)
    const dispatch=useDispatch();

    const startLoadUser=async()=>{
        try {
            const {data}=await chazaApi.get("/user");
            console.log(data.users)
            dispatch(onLoadUsers(data.users));
            
        } catch (error) {
            console.log(error)
        }
    }

    const startUpdateUser=async(user)=>{
        try {
            const {data}=await chazaApi.put("/user/"+user._id.toString(),user);
            console.log(data)
            dispatch(onUpdateUser(user));
            
        } catch (error) {
            console.log(error)
        }
    }

    return {
        users,

        startLoadUser,
        startUpdateUser
    }
}
