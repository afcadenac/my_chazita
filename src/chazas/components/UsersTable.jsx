import { ModalForm } from "./ModalForm"
import { useUiStore, useUserStore } from "../../hook";

export const UsersTable = () => {

    const {users,startUpdateUser,startDeleteUser}=useUserStore();
    
    const {openModal,ChangeValue}=useUiStore();

    const onUpdate=(user)=>{
        ChangeValue(user);
        openModal();
    }

    const onDelete=(id)=>{
        startDeleteUser(id);
    }

  return (
    <div className="row border border-dark bg-primary p-3 table-responsive mt-3">

        <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user)=>
                    (
                    <tr key={user._id}>  
                        <th scope="row">{user._id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user?.phone || "no tiene"}</td>
                        <td>{user.type}</td>
                        <td>
                            <button className="btn btn-primary m-1" onClick={()=>onUpdate({...user,phone:"no tiene"})}>Actualizar</button>
                            <button className="btn btn-danger m-1" onClick={()=>onDelete(user._id)}>Eliminar</button>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
        
        <ModalForm make={startUpdateUser}/>
    </div>
  )
}
