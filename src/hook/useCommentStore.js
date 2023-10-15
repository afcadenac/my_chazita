import { useDispatch, useSelector } from "react-redux";
import chazaApi from "../api/ChazaApi";
import Swal from "sweetalert2";
import { onCloseModalComment, onDeleteComment, onLoadComment, onNewComment, onOpenModalComment } from "../store";
import { getCommentSecondary } from "../helpers";



export const useCommentStore = () => {
    const {isModalComment,comments}=useSelector((state)=>state.comment);
    const {currentChaza}=useSelector((state)=>state.chaza);
    const {user}=useSelector((state)=>state.auth);

    const dispatch=useDispatch();

    const startLoadComments=async()=>{
        try {
            const {data}=await chazaApi.post(`/comment/`,{chaza:currentChaza._id});
            console.log(data);
            const comments=data.comments;
            for (const comment in comments) {
                const res=await chazaApi.get(`/user/${comments[comment].user}`);
                comments[comment].user={_id:res.data.user._id,name:res.data.user.name,photo:res.data.user.photo}
            }
            console.log(comments);
            dispatch(onLoadComment(comments));
            dispatch(onOpenModalComment());
        } catch (error) {
            Swal.fire("error","ocurrio un error","error");
        }
    }

    const starNewComment=async(comment)=>{
        try {
            const {data}=await chazaApi.post("/comment/new",comment);
            dispatch(onNewComment({...comment,date:data.date,user:{_id:user.uid,name:user.name,photo:user.photo}, idComment:data.idComment, _id:data._id}));
        } catch (error) {
            Swal.fire("Error","se produjo un error","error");
        }
    }

    const startDeleteComment=async(id)=>{
        try {
            const {data}=await chazaApi.delete(`/comment/${id}`);
            dispatch(onDeleteComment(id));
        } catch (error) {
            Swal.fire("Error","se produjo un error","error");
        }
    }

    const startDeleteCommentSecondary=async(comment)=>{
        const commentsSecondary=getCommentSecondary(comment,comments);

        startDeleteComment(comment._id);

        for (const com of commentsSecondary) {
            startDeleteComment(com._id);
        }
    }

    const startCloseComments=async()=>{
        try {
            dispatch(onLoadComment([]));
            dispatch(onCloseModalComment());
        } catch (error) {
            Swal.fire("error","ocurrio un error","error");
        }
    }

    const starUpdateComment=async(comment)=>{
        try {
            const {data}=await chazaApi.put(`/comment/${comment._id}`,{...comment,user:user.uid});
            //dispatch(onUpdateComment({...data.commentUpdated,user:{_id:user.uid,name:user.name,photo:user.photo}}));
        } catch (error) {
            Swal.fire("Error","se produjo un error","error");
        }
    }

    return {
        isModalComment,
        comments,

        startLoadComments,
        startCloseComments,
        starNewComment,
        startDeleteComment,
        startDeleteCommentSecondary,
        starUpdateComment
    }
}
