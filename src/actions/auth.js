import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";


export const startLogin = (email, password) => {
    console.log({email,password})
    return async (dispatch) => {
        const response = await fetchSinToken('auth', {email,password}, 'POST');
        const body = await response.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Credentials unknowns',
            })
        }
    }
            
};

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const response = await fetchSinToken('auth/new', {name, email, password},'POST');
        const body = await response.json();
        
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Credentials unknowns',
            })
        }
    }
};

export const startChecking = () => {
    return async (dispatch) => {
        
        const response = await fetchConToken('auth/renew');
        const body = await response.json();
        
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            dispatch(checkingFinish());
        }

    }
};

export const startLogout= () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch(eventLogout())
        dispatch(logout());
    }
}

const logout  = () => ({type: types.authLogout});
const checkingFinish = () => ({type: types.authCheckingFinish});

const login = (user) => ({
    type: types.authLogin,
    payload: user
})