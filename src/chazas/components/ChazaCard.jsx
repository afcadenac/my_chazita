import { useNavigate } from 'react-router-dom';
import chazita from '../../assets/images/choza.jpg'
import { useAuthStore, useChazaStore } from '../../hook'
import '../../styles.css';
import { getEnvVariables } from '../../helpers';

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

    console.log(`http://localhost:4000/uploads//1693790296500-1.jpg`);

  return (
    <div className="row bg-success m-2 p-2 border border-black espace-pointer" onClick={()=>{startLoadCurrentChaza(chaza)}} onDoubleClick={()=>onNavigateChaza(chaza._id)}>
        <div className='col-sm-2'>
            <img src={"http://localhost:4000/"+chaza.photo} alt={chaza.name} className="card-img border border-black"/>
        </div>

        <div className={`row col-sm-${(user.type==="Administrador")?9:10}`}>
            <div className='bg-primary col m-2'>
                <label>
                    Nombre: {chaza.name}
                </label>
            </div>
            <div className='bg-primary col m-2'>
                <label>
                    Puntuacion: {chaza.punctuation}
                </label>
            </div>
            <div className='bg-primary col m-2'>
                <label>
                    Fecha de creacion: {new Date(chaza.date).getDate()+1}-{new Date(chaza.date).getMonth()+1}-{new Date(chaza.date).getFullYear()}  {new Date(chaza.date).getHours()+1}:{new Date(chaza.date).getMinutes()+1}:{new Date(chaza.date).getSeconds()}
                </label>
            </div>
            <div className='bg-primary col m-2'>
                <label>
                    ubicacion: {chaza.location}
                </label>
            </div>
        </div>
        {(user.type==="Administrador")
        ?<div className='col'>
            <button className='btn btn-danger' onClick={()=>deleteChaza(chaza._id)}>eliminar</button>
        </div>
        :""
        }
        
    </div>

  )
}
