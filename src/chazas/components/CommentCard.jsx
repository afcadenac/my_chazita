import { getEnvVariables } from "../../helpers"
import { useAuthStore, useCommentStore } from "../../hook";
import placeholderImage from "../../assets/images/userDefault.png";
import { useState } from "react";

export const CommentCard = ({comment={}}) => {
  const {user}=useAuthStore();
  const {startDeleteCommentSecondary, starUpdateComment}=useCommentStore();

  const [currentComment, setCurrentComment] = useState(true);
  const [opinion, setOpinion] = useState(comment.comment);

  const onChangeInput=(e)=>{
    setOpinion(e.target.value);
  }

  const onDeleteComment=(com)=>{
    startDeleteCommentSecondary(com);
  }

  const onUpdateComment=(com)=>{
    starUpdateComment({...com,comment:opinion});
    setCurrentComment(true)
  }

  return (
    <div className="container border border-black d-flex justify-content-center my-3 p-2">
        <img src={
          (comment.user.photo === "Por definir" ||
          comment.user.photo === undefined ||
          comment.user.photo === null)
          ?placeholderImage
          :getEnvVariables().VITE_PHOTO_URL + comment.user.photo} alt={comment.user.name} className=" userPhoto" />
        <div className='container'>
            <h4>{comment.user.name}</h4>
            <textarea cols="40" rows="5" disabled={currentComment} value={opinion} onChange={onChangeInput}/>
            <p>
              {new Date(comment.date).getDate() }/
              {new Date(comment.date).getMonth()+1 }/
              {new Date(comment.date).getFullYear()}{" "}
              {new Date(comment.date).getHours() }:
              {new Date(comment.date).getMinutes() }:
              {new Date(comment.date).getSeconds()}
            </p>

            {
          (user.uid===comment.user._id || user.type==="Administrador")
          && (
            <>
            {
              (currentComment)
              ?<>
                <button className="btn btn-danger" onClick={()=>{onDeleteComment(comment)}}>Eliminar</button>
                <button className="btn btn-secondary" onClick={()=>setCurrentComment(false)}>Actualizar</button>
              </>
              :<button className="btn btn-secondary" onClick={()=>onUpdateComment(comment)}>guardar cambios</button>
            }
              
            </>
          )
        }
        </div>
        
    </div>
    
  )
}
