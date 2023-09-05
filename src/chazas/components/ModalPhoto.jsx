import Modal from "react-modal"
import { useState } from "react";
import { useUiStore } from "../../hook";

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

export const ModalPhoto = ({make}) => {

    const [photoState, setPhotoState] = useState(null);
    const {isModalPhotoOpen,closeModalPhoto}=useUiStore();

    const onPhotoChange=(event)=>{
        console.log(event.target.files[0]);
        setPhotoState(event.target.files[0]);
    }

    const onSubmitForm=(e)=>{
        e.preventDefault();
        make(photoState);
    }

  return (
    <Modal
        isOpen={isModalPhotoOpen}
        onRequestClose={closeModalPhoto}
        style={customStyles}
        //closeTimeoutMS={200}
    >

        <h1>Modal</h1>
        <hr />
        <form onSubmit={onSubmitForm} className="container">
            <input type="file" name="photo" onChange={onPhotoChange}/>
            <button className="btn btn-primary mt-2">Enviar</button>
        </form>
        
    </Modal>
  )
}
