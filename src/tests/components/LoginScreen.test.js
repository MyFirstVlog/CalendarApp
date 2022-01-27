import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
//Porque necesito renderizar componente
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { LoginScreen } from '../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

//SDolo me interesa saber si se dispara entonces, hare un mopck

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
);

describe('Pruebas en login screen', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('debe de llamar el dispatch del login', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
        target: {
            name: 'lEmail',
            value: 'milena@cidenet.com',
        }
    });

    wrapper.find('input[name="lPassword"]').simulate('change', {
        target: {
            name: 'lPassword',
            value: '123456',
        }
    });

    wrapper.find('form').at(0).prop('onSubmit')({
        preventDefault(){}
    });

    expect(startLogin).toHaveBeenCalledWith('milena@cidenet.com', '123456')

  });

  test('no hay registros si las contraseñas son diferentes', () => {
    wrapper.find('input[name="rPassword"]').simulate('change', {
        target: {
            name: 'rPassword',
            value: '123456',
        }
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
        target: {
            name: 'rPassword2',
            value: '12345',
        }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
        preventDefault(){}
    })

    expect(Swal.fire).toHaveBeenCalledWith({"icon": "error", "text": "Passwords do not match", "title": "Oops..."});
    expect(startRegister).not.toHaveBeenCalled();
  });

  test('contraseñas iguales y ejecuta', () => {
    wrapper.find('input[name="rPassword"]').simulate('change', {
        target: {
            name: 'rPassword',
            value: '123456',
        }
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
        target: {
            name: 'rPassword2',
            value: '123456',
        }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
        preventDefault(){}
    })

    expect(startRegister).toHaveBeenCalled();
  });
  
  
  
});

