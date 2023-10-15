import React, { useState } from 'react'
import { useAuthStore, useChazaStore, useForm } from '../../hook'
import Modal from "react-modal"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { Icon } from "leaflet";


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

const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3601/3601465.png",
    iconSize: [30, 30],
  });

export const ModalLocation = () => {
    const {isModalLocation,startCloseLocation,currentChaza,startUpdateChaza}=useChazaStore();
    const {formState,onInputChange,onResetForm,setFormState}=useForm({
        name:currentChaza.name,
        lat:currentChaza.lat,
        lon:currentChaza.lon
    });

    const onFormSubmit=(e)=>{
        e.preventDefault();
        startUpdateChaza({...currentChaza,name:formState.name,lat:formState.lat,lon:formState.lon});
        console.log(formState);
    }

    const handleMapClick=(e)=>{
        const { lat, lng } = e.latlng;
        console.log(lat, lng);
        setFormState({ ...formState,lat:lat, lon:lng })
    }
    
  return (
    <Modal
        isOpen={isModalLocation}
        onRequestClose={startCloseLocation}
        style={customStyles}
        className="modal"
        //closeTimeoutMS={200}
    >

        <h1>Redes sociales</h1>
        <hr />

       <form onSubmit={onFormSubmit}>
        <div >
        <MapContainer style={{ height: '400px', width: '100%' }} center={[formState.lat, formState.lon]} zoom={18} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker selectedLocation={[formState.lat, formState.lon]} onClick={handleMapClick}></LocationMarker>
        </MapContainer>
        </div>

        <input type="text" name='name' value={formState.name} onChange={onInputChange} className='form-control my-3' />
        <button className='btn btn-primary'>Cambiar</button>
       </form>
        
        
    </Modal>
  )
}

export function LocationMarker({ selectedLocation, onClick }) {
    useMapEvents({
      click: (e) => {
        onClick(e);
      },
    });
  
    return selectedLocation ? (
      <Marker position={selectedLocation} icon={customIcon}>
        <Popup>
          Location selected: Lat {selectedLocation.lat}, Lng {selectedLocation.lng}
        </Popup>
      </Marker>
    ) : null;
  }