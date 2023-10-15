import React, { useState } from 'react'
import { useAuthStore, useChazaStore, useCommentStore } from '../../hook';
import { getEnvVariables } from '../../helpers';
import placeholderImage from "../../assets/images/userDefault.png";
import { CommentCard } from './CommentCard';

export const CommentSecondary = ({CommentsSecondary=[],firstComment={}}) => {
    const {starNewComment}=useCommentStore();
    const {user,status}=useAuthStore();
    const {currentChaza}=useChazaStore();
    const [opinion, setOpinion] = useState("");

    const [open, setOpen] = useState(false);

    const changedValue=(e)=>{
        setOpinion(e.target.value);
    }

    const onFormSubmit=(e)=>{
        e.preventDefault();
        if(CommentsSecondary.length<=0){
            
            starNewComment({comment:opinion,chaza:currentChaza._id,idComment:firstComment._id});
        }else{
            starNewComment({comment:opinion,chaza:currentChaza._id,idComment:CommentsSecondary[CommentsSecondary.length-1]._id});
        }
        setOpinion("");
    }

    if(!open){
        return <button className='btn btn-primary' onClick={()=>setOpen(true)}>mas</button>
    }
    
  return (
    <div className='ms-5'>
        {
            CommentsSecondary.map((comment)=><CommentCard key={comment._id}  comment={comment}/>)

        }

        {(status==="authenticated") && (
            <form onSubmit={onFormSubmit} >
                <div className="container border border-black d-flex justify-content-center my-3 p-2">
                    <img src={
                        (user.photo === "Por definir" ||
                        user.photo === undefined ||
                        user.photo === null)
                        ?placeholderImage
                        :getEnvVariables().VITE_PHOTO_URL + user.photo} alt={user.name} className="userPhoto" 
                    />
                    <div className='container'>
                        <h4>{user.name}</h4>
                        <textarea cols="40" rows="5" onChange={changedValue} value={opinion}/>
                        <button className='btn btn-primary'>Agregar comentario</button>
                    </div>
                </div>
            </form>
        )}
        <button className='btn btn-primary' onClick={()=>setOpen(false)}>menos</button>
    </div>
  )
}
