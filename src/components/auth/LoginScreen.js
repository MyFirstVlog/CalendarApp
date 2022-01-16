import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const state = useSelector(state => state)

    const dispatch = useDispatch();

    console.log({state});

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'milena@cidenet.com',
        lPassword: '123456'
    });
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Milena',
        rEmail: 'milena@cidenet.com',
        rPassword: '123456',
        rPassword2: '123456'
    });

    const {lEmail, lPassword} = formLoginValues;
    const {rName, rEmail, rPassword, rPassword2} = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();

        const {lEmail: email,lPassword: password} = formLoginValues;

        dispatch(startLogin(email, password))
    };

    const handleRegister = (e) => {
        e.preventDefault();
        
        const {rName: name, rEmail: email, rPassword:password} = formRegisterValues;

        if(rPassword !== rPassword2){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match',
            });
        }


        dispatch(startRegister(email, password, name))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group mt-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lEmail'
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lPassword'
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group mt-2">
                            <input
                                type="text"
                                className="form-control "
                                placeholder="Nombre"
                                name="rName"
                                value= {rName}
                                onChange = {handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value= {rEmail}
                                onChange = {handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword"
                                value= {rPassword}
                                onChange = {handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group mt-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value= {rPassword2}
                                onChange = {handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group mt-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}