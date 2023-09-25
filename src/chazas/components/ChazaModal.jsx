import Modal from "react-modal";
import { useChazaStore, useForm, useUiStore, useUserStore } from "../../hook";
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

export const ChazaModal = () => {

    const {isModalOpen,closeModal,currentValue,ChangeValue}=useUiStore();
    const {onInputChange, name,}=useForm({
        name:""
    });

    const {users}=useUserStore();

    const {startNewChaza}=useChazaStore();

    const onSubmitChaza=(e)=>{
        e.preventDefault();
        if(name.length<=0 || !currentValue._id){
            Swal.fire("Error","Datos invalidos","error");
            return;
        }
        
        startNewChaza(currentValue,name);
    }

    const userFilter=users.filter((user)=>user.type==="Dueño" && (user.chaza===undefined || user.chaza===null));

  return (
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={50}
        className="modal"
    >

        <h1>Nueva Chaza</h1>
        <hr />
        <form onSubmit={onSubmitChaza} className="container">
            <div className="form-group mb-5">
                <input className="form-control" type="text" name="name" value={name} onChange={onInputChange} placeholder="Ingrese el nombre de la chaza"></input>
            </div>

            {(!currentValue._id)
            ?(<div className="row mb-4 table-responsive">
                <h4>Seleccione al dueño de la chaza</h4>
                <hr />
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userFilter.map((user)=>
                            (
                            <tr key={user._id}>  
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.type}</td>
                                <td>
                                    <button className="btn btn-secondary m-1" onClick={()=>ChangeValue(user)}>Seleccionar</button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>)
            :(<div className="mb-4 container border border-black">
                <h4>Usuario seleccionado</h4>
                <hr />
                <label className="row m-2">Nombre: {currentValue.name}</label>
                <label className="row m-2">Correo: {currentValue.email}</label>
                <label className="row m-2">Tipo: {currentValue.type}</label>
                <label className="row m-2">chaza: {currentValue.chaza}</label>
                <button className="btn btn-success" onClick={()=>ChangeValue({})}>Cambiar usuario</button>
            </div>)
            }

            <input type="submit" className="btn btn-primary"/>
        </form>
        
    </Modal>
  )
}
