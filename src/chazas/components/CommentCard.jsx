import { getEnvVariables } from "../../helpers"
import { useAuthStore, useCommentStore } from "../../hook";
import placeholderImage from "../../assets/images/userDefault.png";

export const CommentCard = ({comment={}}) => {
  const {user}=useAuthStore();
  const {startDeleteComment}=useCommentStore();
  const onDeleteComment=(id)=>{
    startDeleteComment(id);
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
            <label>{comment.comment}</label>
            <p>{comment.date}</p>
        </div>
        {
          (user.uid===comment.user._id || user.type==="Administrador")
          && (
            <>
              <button className="btn btn-danger" onClick={()=>{onDeleteComment(comment._id)}}>Eliminar</button>
            </>
          )
        }
    </div>
    
  )
}
