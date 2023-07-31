


import { Link } from 'react-router-dom';
import { useForm } from '../../hook/useForm';
import './LoginPage.css';

export const LoginPage = () => {



    const { formState, onInputChange, email, password } = useForm({
        email: '',
        password: ''
    });



    return (

        <div className='d-flex justify-content-center align-items-center'>
             <div className="login-form-2 mt-6 w-10">
                        <h3 className='mb-5'>Ingreso</h3>
                        <form>
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
                                    className="btnSubmit"
                                    value="Login" 
                                />
                            </div>
                            <div className='mt-5 d-flex justify-content-center'>
                            <label className='me-2'>¿Aun no tiene cuenta?</label>
                            <Link to='/register' className='text-white'>Ingrese aqui</Link>
                            </div>
                        </form>
                    </div>
        </div>  
    )
}