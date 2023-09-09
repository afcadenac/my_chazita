import Swal from 'sweetalert2';
import { useAuthStore } from '../../hook';
import { useForm } from '../../hook/useForm';
import './LoginPage.css';

import "animate.css";

export const RegisterPage = () => {

    const { formState, onInputChange, username, email, password, confirmPassword  } = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {startRegister}=useAuthStore();

    const onSubmitRegister=(event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            Swal.fire("Error en creacion de usuario","La constraseñas deben ser iguales","error");
            return;
        }

        startRegister({name:username,email:email,password:password});
    }

  return (
    <div className='d-flex justify-content-center align-items-center animate__backInDown'>
        <div className="container d-flex flex-column mt-6 w-10 loginform">
            <h3 className='m-5 text-white d-flex justify-content-center'>Registro</h3>
            <form onSubmit={onSubmitRegister}>
                <div className="form-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name='username'
                        value={username}
                        onChange={ onInputChange}
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name='email'
                        value={email}
                        onChange={ onInputChange}
                    />
                </div>
                <div className="form-group mb-2">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name='password'
                        value={password}
                        onChange={ onInputChange} 
                    />
                </div>

                <div className="form-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña" 
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={ onInputChange} 
                    />
                </div>

                <div className="d-grid gap-2">
                    <input 
                        type="submit" 
                        className="btnSubmit loginbg" 
                        value="Crear cuenta" />
                </div>
            </form>

        </div>
    </div>
  )
}
