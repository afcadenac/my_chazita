import React, { useState } from 'react'
import { useAuthStore, useChazaStore, useForm } from '../../hook'
import Modal from "react-modal"
import { getEnvVariables } from '../../helpers';
import placeholderImage from "../../assets/images/userDefault.png";
import Swal from 'sweetalert2';

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

export const ModalNetwork = () => {
    const {user}=useAuthStore();
    const {currentNetworks,isModalNetwork,startCloseNetwork,currentChaza,startNewNetwork,startDeleteNetwork}=useChazaStore();
    const {formState,onInputChange,onResetForm}=useForm({
        name:"",
        link:""
    });

    const onFormSubmit=(e)=>{
        e.preventDefault();
        startNewNetwork(currentChaza._id,formState.name,formState.link);
        onResetForm();
    }

    const onDeleteNetwork=(deleteNetwork)=>{
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!',
            cancelButtonText:"Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                startDeleteNetwork(deleteNetwork._id)
              Swal.fire(
                '¡Eliminado!',
                'La red social ha sido eliminada.',
                'success'
              )
            }
          });
    }

  return (
    <Modal
        isOpen={isModalNetwork}
        onRequestClose={startCloseNetwork}
        style={customStyles}
        className="modal"
        //closeTimeoutMS={200}
    >

        <h1>Redes sociales</h1>
        <hr />

        <div className='container'>
            {
                currentNetworks?.map((network)=>{
                    return (<div key={network._id} className='row my-2'>
                        <h5 className='col-8'>{network.value}</h5>
                        <button className='btn btn-danger col-2' onClick={()=>{onDeleteNetwork(network)}}>Eliminar</button>
                    </div>)
                })
            }

            <form onSubmit={onFormSubmit}>
                <input type="text" name='name' value={formState.name} onChange={onInputChange} placeholder='Nombre' className='form-control my-3'/>
                <input type="text" name='link' value={formState.link} onChange={onInputChange} placeholder='link' className='form-control my-3'/>
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </div>
        
        
    </Modal>
  )
}