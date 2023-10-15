import Modal from "react-modal"
import { useState } from "react";
import { useUiStore } from "../../hook";
import placeholderImage from "../../assets/images/imageDefault.jpg";
import Swal from "sweetalert2";

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

    const [urlState, setUrlState] = useState(placeholderImage)
    
    const {isModalPhotoOpen,closeModalPhoto}=useUiStore();

    const onPhotoChange=(event)=>{
        if(event.target.files[0]){
            setUrlState(URL.createObjectURL(event.target.files[0]));
        }else{
            setUrlState(placeholderImage);
        }
        console.log(event.target.files[0]);
        setPhotoState(event.target.files[0]);
    }

    const onSubmitForm=(e)=>{
        e.preventDefault();

        if(!photoState){
            Swal.fire("error","imagen no valida","error");
            return;
        }
        make(photoState);
    }

  return (
    <Modal
        isOpen={isModalPhotoOpen}
        onRequestClose={closeModalPhoto}
        style={customStyles}
        //closeTimeoutMS={200}
    >

        <h1>Fotos</h1>
        <hr />
        <form onSubmit={onSubmitForm} className="container text-center">
            <img src={urlState} alt="" className="changePhoto" />
            <input className="form-control m-3" type="file" name="photo" onChange={onPhotoChange}/>
            <button className="btn btn-primary mt-2">Enviar</button>
        </form>
        
    </Modal>
  )
}
