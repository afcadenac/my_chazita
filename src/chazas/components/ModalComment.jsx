import React, { useState } from 'react'
import { useAuthStore, useChazaStore, useCommentStore } from '../../hook'
import Modal from "react-modal"
import { CommentCard } from './CommentCard';
import { getCommentSecondary, getEnvVariables } from '../../helpers';
import placeholderImage from "../../assets/images/userDefault.png";
import { CommentSecondary } from './CommentSecondary';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement("#root");

export const ModalComment = () => {
    const {isModalComment, startCloseComments,comments,starNewComment}=useCommentStore();
    const {user,status}=useAuthStore();
    const {currentChaza}=useChazaStore();
    const [opinion, setOpinion] = useState("");
    const changedValue=(e)=>{
        setOpinion(e.target.value);
    }

    const onFormSubmit=(e)=>{
        e.preventDefault();
        starNewComment({comment:opinion,chaza:currentChaza._id});
        setOpinion("");
        console.log(opinion);
    }

    const onSecondaryList=(comment)=>{
        console.log(getCommentSecondary(comment,comments));
        console.log([].length);
    }
  return (
    <Modal
        isOpen={isModalComment}
        onRequestClose={startCloseComments}
        style={customStyles}
        className="modal"
        //closeTimeoutMS={200}
    >

        <h1>Comentarios</h1>
        <hr />
        {
            comments.map((comment)=>{
                if(comment.idComment===undefined || comment.idComment===null){
                    return (<div key={comment._id}>
                        <CommentCard key={comment._id}  comment={comment}/>
                        {(!comment.idComment) && <CommentSecondary CommentsSecondary={getCommentSecondary(comment,comments)} firstComment={comment}/> }
                    </div>)
                }
                return;
            })

        }

        {(status==="authenticated") && (
            <form onSubmit={onFormSubmit} >
                <div className="container border border-black d-flex justify-content-center my-3 p-2">
                    <img src={
                        (user.photo === "Por definir" ||
                        user.photo === undefined ||
                        user.photo === null)
                        ?placeholderImage
                        :getEnvVariables().VITE_PHOTO_URL + user.photo} alt={user.name} className=" userPhoto" 
                    />
                    <div className='container'>
                        <h4>{user.name}</h4>
                        <textarea cols="50" rows="5" onChange={changedValue} value={opinion}/>
                        <button className='btn btn-primary'>Agregar comentario</button>
                    </div>
                </div>
            </form>
        )}
        
        
    </Modal>
  )
}
