import { useDispatch, useSelector } from "react-redux";
import chazaApi from "../api/ChazaApi";
import { onChangeValue, onCloseModal, onCloseModalPhoto, onDeleteUser, onLoadUsers, onLogin, onUpdateUser } from "../store";
import { getFilteredUsers } from "../helpers";
import { useUiStore } from "./useUiStore";
import { useAuthStore } from "./useAuthStore";


export const useUserStore = () => {
    const {users}=useSelector((state)=>state.user)
    const dispatch=useDispatch();

    const {currentValue,ChangeIsLoading}=useUiStore()
    const {user,startLogin}=useAuthStore();

    const startLoadUser=async()=>{
        try {
            ChangeIsLoading(true);
            
            const {data}=await chazaApi.get("/user");
            dispatch(onLoadUsers(data.users));
            
            ChangeIsLoading(false);
        } catch (error) {
            console.log(error);
            ChangeIsLoading(false);
        }
    }

    const startLoadUserById=async()=>{
        try {
            const {data}=await chazaApi.get("/user/"+user.uid);
            dispatch(onChangeValue(data.user));
            
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

    const startUpdateUserPhoto=async(photo)=>{
        try {
            await chazaApi.post("/image/delete",{path:currentValue.photo});
            const resp=await chazaApi.post("/image",photo);

            await startUpdateUser({...currentValue,photo:resp.data.url});
            dispatch(onCloseModalPhoto()); 

            const {data}=await chazaApi.get("/auth/updatelogin");

            console.log(data);

            localStorage.setItem("token",data.token);
            dispatch(onLogin({name:data.name,uid:data.uid,type:data.type,chaza:data.chaza,email:data.email,photo:data.photo}));
        } catch (error) {
            console.log(error);
        }
    }

    const startDeleteUser=async(id)=>{
        try {
            const {data}=await chazaApi.delete(`/user/${id}`);
            
            await chazaApi.post("/image/delete",{path:data.userDeleted.photo});

            dispatch(onDeleteUser(data.userDeleted._id));
        } catch (error) {
            console.log(error);
        }
    }

    const startFilterUser=async(filter)=>{
        try {
            const {data}=await chazaApi.get("/user");
            let usersFilter=data.users;

            usersFilter=getFilteredUsers(filter,usersFilter);
            
            dispatch(onLoadUsers(usersFilter));
        } catch (error) {
            console.log(error);
        }
    }

    return {
        users,

        startLoadUser,
        startUpdateUser,
        startDeleteUser,
        startFilterUser,
        startLoadUserById,
        startUpdateUserPhoto
    }
}
