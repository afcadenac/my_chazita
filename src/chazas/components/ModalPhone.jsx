import React, { useState } from 'react'
import { useAuthStore, useChazaStore } from '../../hook'
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

export const ModalPhone = () => {
    const {user}=useAuthStore();
    const {currentPhones,isModalPhones,startClosePhone,currentChaza,startNewPhone,startDeletePhone}=useChazaStore();
    const [phone, setPhone] = useState("");
    const changedValue=(e)=>{
        setPhone(e.target.value);
    }

    const onFormSubmit=(e)=>{
        e.preventDefault();
        startNewPhone(currentChaza._id,phone);
        setPhone("");
        console.log(phone);
    }

    const onDeletePhone=(deletePhone)=>{
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
                startDeletePhone(deletePhone._id)
              Swal.fire(
                '¡Eliminado!',
                'El numero de telefono ha sido eliminada.',
                'success'
              )
            }
          });
    }

  return (
    <Modal
        isOpen={isModalPhones}
        onRequestClose={startClosePhone}
        style={customStyles}
        className="modal"
        //closeTimeoutMS={200}
    >

        <h1>Modal</h1>
        <hr />

        <div className='container'>
            {
                currentPhones?.map((phone)=>{
                    return (<div key={phone._id} className='row my-2'>
                        <h5 className='col-8'>{phone.value}</h5>
                        <button className='btn btn-danger col-2' onClick={()=>{onDeletePhone(phone)}}>Eliminar</button>
                    </div>)
                })
            }

            <form onSubmit={onFormSubmit}>
                <input type="text" value={phone} onChange={changedValue} placeholder='telefono'/>
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </div>
        
        
    </Modal>
  )
}