import { useNavigate } from 'react-router-dom';
import chazita from '../../assets/images/choza.jpg'
import { useAuthStore, useChazaStore } from '../../hook'
import '../../styles.css';

export const ChazaCard = ({chaza={}}) => {
    const {user}=useAuthStore();
    const {startDeleteChaza,startLoadCurrentChaza}=useChazaStore();
    const navigate=useNavigate();

    const deleteChaza=(id)=>{
        startDeleteChaza(id);
    }

    const onNavigateChaza=(id)=>{
        navigate("/chazas/"+id);
    }

  return (
    <div className="row  m-2 p-2 border border-black espace-pointer" onClick={()=>{startLoadCurrentChaza(chaza)}} onDoubleClick={()=>onNavigateChaza(chaza._id)}>
        <div className='col-sm-2'>
            <img src={chazita} alt="chaza" className="card-img border border-black"/>
        </div>

        <div className={`row col-sm-${(user.type==="Administrador")?9:10}`}>
            <div className='bg-primary col m-2 d-flex justify-content-center align-items-center'>
                <label>
                    Nombre: {chaza.name}
                </label>
            </div>
            <div className='bg-primary col m-2 d-flex justify-content-center align-items-center'>
                <label>
                    Puntuacion: {chaza.punctuation}
                </label>
            </div>
            <div className='bg-primary col m-2 d-flex justify-content-center align-items-center'>
                <label>
                    Fecha de creacion: {chaza.date}
                </label>
            </div>
            <div className='bg-primary col m-2 d-flex justify-content-center align-items-center'>
                <label>
                    ubicacion: {chaza.location}
                </label>
            </div>
        </div>
        {(user.type==="Administrador")
        ?<div className='col d-flex justify-content-center align-items-center'>
            <button className='btn btn-danger' onClick={()=>deleteChaza(chaza._id)}>eliminar</button>
        </div>
        :""
        }
        
    </div>

  )
}
