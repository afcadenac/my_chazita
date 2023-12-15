import { ModalForm } from "./ModalForm"
import { useUiStore, useUserStore } from "../../hook";
import Swal from "sweetalert2";

export const UsersTable = () => {

    const {users,startUpdateUser,startDeleteUser}=useUserStore();
    
    const {openModal,ChangeValue,ChangeValueSelector}=useUiStore();

    const onUpdate=(user)=>{
        ChangeValue(user);
        ChangeValueSelector({
            type:["Cliente","Dueño"]
        });
        openModal();
    }

    const onDelete=(id)=>{
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
                startDeleteUser(id);
              Swal.fire(
                '¡Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
              )
            }
          });
    }

  return (
    <div className="row border border-dark bgfilter p-1 table-responsive m-0">

        <table className="table table-dark table-hover m-0">
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
                            <button className="btn btn-primary m-1" onClick={()=>onUpdate((!user.phone)?({...user,phone:""}):user)}>Actualizar</button>
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
