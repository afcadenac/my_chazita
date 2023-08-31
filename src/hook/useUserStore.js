import { useDispatch, useSelector } from "react-redux";
import chazaApi from "../api/ChazaApi";
import { onCloseModal, onDeleteUser, onLoadUsers, onUpdateUser } from "../store";


export const useUserStore = () => {
    const {users}=useSelector((state)=>state.user)
    const dispatch=useDispatch();

    const startLoadUser=async()=>{
        try {
            const {data}=await chazaApi.get("/user");
            dispatch(onLoadUsers(data.users));
            
        } catch (error) {
            console.log(error)
        }
    }

    const startUpdateUser=async(user)=>{
        try {
            const {data}=await chazaApi.put("/user/"+user._id.toString(),user);
            console.log(data);
            dispatch(onUpdateUser(data.userUpdated));
            dispatch(onCloseModal());
            
        } catch (error) {
            console.log(error)
        }
    }

    const startDeleteUser=async(id)=>{
        try {
            const {data}=await chazaApi.delete(`/user/${id}`);
            console.log(data);
            dispatch(onDeleteUser(data.userDeleted._id));
        } catch (error) {
            console.log(error);
        }
    }

    return {
        users,

        startLoadUser,
        startUpdateUser,
        startDeleteUser
    }
}
