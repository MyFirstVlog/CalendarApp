//? Como verifaremos redux:
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import { fetchSinToken } from '../../helpers/fetch';
import * as fetchModule from '../../helpers/fetch';



//Hacer mock a Swal

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

//Configurar store

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

//? Mock d elocal storage para verificar que se hayan grabdo con ciertos args en especifico
let token = '';

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones de auth   ', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('StartLogin Correcto', async() => {
       await store.dispatch(startLogin('milena@cidenet.com', '123456'))

       const actions = store.getActions();

       expect(actions[0]).toEqual({
           type: types.authLogin,
           payload:{
               uid: expect.any(String),
               name: expect.any(String)
           }
       });
       expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
       expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

       //Para obtener los valores que se grabaron en el mock
       token = localStorage.setItem.mock.calls[0][1];
    });
    
    test('Start Loginm Incorrecto', async() => {
        await store.dispatch(startLogin('milena@cidenet.com', '123456789'))

       const actions = store.getActions();

        expect(actions).toEqual([]);

        expect(Swal.fire).toHaveBeenCalledWith({icon: "error",text: "Credentials unknowns",title: "Oops..."});

    //    console.log(actions);
    });

    test('startRegister correcto ', async() => {
        fetchModule.fetchSinToken = jest.fn(() => ({
            json(){
                return{
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123123'
                }
            }
        }))

        await store.dispatch(startRegister('test@test2.com', '123456', 'Test'));

        const action = store.getActions();

        console.log(action)

        expect(action[0]).toEqual({
            type:types.authLogin,
            payload: {
                uid: '123', name: 'carlos'  
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
       expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    })
    

    test('startChecking correcto', async() => {
        fetchModule.fetchConToken = jest.fn(() => ({
            json(){
                return{
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123123'
                }
            }
        }))

        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload:{
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

    })
    
    
    
})
