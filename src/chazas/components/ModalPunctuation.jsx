import React, { useEffect, useState } from 'react'
import { useAuthStore, useChazaStore, useForm } from '../../hook'
import Modal from "react-modal";
import capuchoFill  from "../../assets/capucho.ico";
import  capuchoOutFill  from "../../assets/capuchont.ico";


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

export const ModalPunctuation = () => {
    const {user,status}=useAuthStore();
    const {isModalPunctuation,startClosePunctuation,startUpdateCurrentPunctuation,currentPunctuation,startLoadingPunctuationUser,startNewPunctuationUser,currentChaza,startUpdatePunctuationUser,startDeletePunctuationUser}=useChazaStore();

    const onFormSubmit=(e)=>{
        e.preventDefault();
    }

    const onUpdateScore=(newValue)=>{
        console.log(newValue);
        startUpdateCurrentPunctuation({...currentPunctuation,value:newValue});
    }

    
    const onSavePunctuationUser=()=>{
        startNewPunctuationUser({...currentPunctuation,user:user.uid,chaza:currentChaza._id});
        startClosePunctuation();
    }

    const onUpdatePunctuationUser=()=>{
        startUpdatePunctuationUser(currentPunctuation);
        startClosePunctuation();
    }

    const onDeletePunctuationUser=()=>{
        startDeletePunctuationUser(currentPunctuation);
        startClosePunctuation();
    }

  return (
    <Modal
        isOpen={isModalPunctuation}
        onRequestClose={startClosePunctuation}
        style={customStyles}
        className="modal"
        //closeTimeoutMS={200}
    >

        <h1>Puntuacion</h1>
        <hr />
        
        <div className='container m-3'>
            <span className="me-2">Calificación:</span>  
            
            {
                [... new Array(5)].map((star, index)=>{
                    return (index < currentPunctuation.value ? <img src={capuchoFill} key={index} onClick={()=>{onUpdateScore(index+1)}}/> : <img src={capuchoOutFill} key={index} onClick={()=>{onUpdateScore(index+1)}}/>)
                })
            }
        </div>

        {(!currentPunctuation._id)
        ?<button className='btn btn-primary' onClick={onSavePunctuationUser}>Guardar</button>
        :(
            <>
                <button className='btn btn-primary mx-2' onClick={onUpdatePunctuationUser}>actualizar</button>
                <button className='btn btn-primary mx-2' onClick={onDeletePunctuationUser}>Eliminar</button>
            </>
        )
        }
        
        
    </Modal>
  )
}