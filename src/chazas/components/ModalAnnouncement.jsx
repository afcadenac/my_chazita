import Modal from "react-modal"
import { useEffect, useState } from "react";
import { useUiStore } from "../../hook";
import placeholderImage from "../../assets/images/imageDefault.jpg";
import Swal from "sweetalert2";
import { useAnnouncementStore } from "../../hook/useAnnouncementStore";
import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "./ModalLocation";
import { getEnvVariables } from "../../helpers";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '95vh', // Altura máxima del modal
        overflowY: 'auto',
    },
};

Modal.setAppElement("#root");

export const ModalAnnouncement = () => {

    const [photoState, setPhotoState] = useState(null);
    const [urlState, setUrlState] = useState(placeholderImage)
    const {isModalAnnouncement,startCloseAnnouncement,currentAnnouncement,startChangeCurrentAnnouncement,startNewAnnouncement,startUpdateAnnouncement}=useAnnouncementStore();
    
    useEffect(() => {
      setPhotoState(null);
      setUrlState(placeholderImage);
    }, [currentAnnouncement])
    

    const onPhotoChange=(event)=>{
        if(event.target.files[0]){
            setUrlState(URL.createObjectURL(event.target.files[0]));
        }else{
            setUrlState(placeholderImage);
        }
        setPhotoState(event.target.files[0]);
    }

    const handleMapClick=(e)=>{
        const { lat, lng } = e.latlng;
        console.log(lat, lng);
        startChangeCurrentAnnouncement({ ...currentAnnouncement,lat:lat, lon:lng })
    }

    const onChangeInput=(e)=>{
        startChangeCurrentAnnouncement({ ...currentAnnouncement,[e.target.name]:e.target.value})
    }

    const onSubmitForm=(e)=>{
        e.preventDefault();

        if(!photoState){
            return Swal.fire("error","imagen no valida","error");
            
        }
        
        if(currentAnnouncement.title.length<=0 || currentAnnouncement.price.length<=0 || currentAnnouncement.type.length<=0 || currentAnnouncement.description.length<=0){
            return Swal.fire("error","datos incompletos","error");
        }


        const photo=photoState;

        if(!currentAnnouncement._id){
            startNewAnnouncement(currentAnnouncement,photo);
            startCloseAnnouncement();
        }else{
            startUpdateAnnouncement(currentAnnouncement,photo);
            startCloseAnnouncement();
        }

    }

  return (
    <Modal
        isOpen={isModalAnnouncement}
        onRequestClose={startCloseAnnouncement}
        style={customStyles}
        //closeTimeoutMS={200}
    >

        <h1>Anuncio</h1>
        <hr />
        <form onSubmit={onSubmitForm} className="container text-center">
            <img src={urlState} alt="" className="changePhoto" />
            <input className="form-control m-3" type="file" name="photo" onChange={onPhotoChange}/>


            <div>
                <input className="form-control mb-2" type="text" name="title" value={currentAnnouncement.title} onChange={onChangeInput} placeholder="titulo"/>
                <input className="form-control mb-2" type="text" name="price" value={currentAnnouncement.price} onChange={onChangeInput} placeholder="precio"/>
                <select name="type" value={currentAnnouncement.type} onChange={onChangeInput} className="form-group mb-2 form-select">
                    <option value="Comida">Comida</option>
                    <option value="Objetos perdidos">Objetos perdidos</option>
                    <option value="Eventos">Eventos</option>
                    <option value="informativo">informativo</option>
                    <option value="Otros">Otros</option>
                </select>
                <textarea className="form-control mb-2" cols="50" rows="5" name="description" onChange={onChangeInput} value={currentAnnouncement.description}/>
            </div>


            <div >
                <MapContainer style={{ height: '400px', width: '100%' }} center={[currentAnnouncement.lat, currentAnnouncement.lon]} zoom={18} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <LocationMarker selectedLocation={[currentAnnouncement.lat, currentAnnouncement.lon]} onClick={handleMapClick}></LocationMarker>
                </MapContainer>
            </div>

            <button className="btn btn-primary mt-2">
                {
                    (!currentAnnouncement._id)
                    ?"Guardar"
                    :"Actualizar"
                }
            </button>
        </form>
        
    </Modal>
  )
}