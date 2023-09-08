


import { Link } from 'react-router-dom';
import { useForm } from '../../hook/useForm';
import './LoginPage.css';
import { useAuthStore } from '../../hook';

import "animate.css";



export const LoginPage = () => {

    const { formState, onInputChange, email, password } = useForm({
        email: '',
        password: ''
    });

    const {startLogin}=useAuthStore();

    const onSubmitLogin=(event)=>{
        event.preventDefault();
        startLogin(formState);
    }

    return (
        <div className='d-flex justify-content-center align-items-center '>
            <div className="container d-flex flex-column mt-6 w-10 loginform animate__backInDown">
                <h3 className='m-5 text-white d-flex justify-content-center'>Ingreso</h3>
                <form onSubmit={onSubmitLogin}>
                    <div className="form-group mb-2">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <input 
                            type="submit"
                            className="btnSubmit loginbg"
                            value="Login" 
                        />
                    </div>
                    <div className='mt-5 d-flex justify-content-center'>
                    <label className='me-2 text-white'>¿Aun no tiene cuenta?</label>
                    <Link to='/auth/register' className='text-white'>Ingrese aqui</Link>
                    </div>
                </form>
            </div>
        </div>  
    );
}