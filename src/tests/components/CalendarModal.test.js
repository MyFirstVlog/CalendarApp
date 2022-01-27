import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
//Porque necesito renderizar componente
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarModal } from '../../components/calendar/CalendarModal';
import moment from 'moment';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))
jest.mock('../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn(),
}))

// Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const later = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title:'hola mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: later.toDate()
        }
    },
    auth:{
        uid: '123',
        name: 'Milena'
    },
    ui:{
        modalOpen: true
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);

describe('Probar calendar Modal', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

  test('debe de mostrar el modal', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('debe de llmar la accion de actualizar y cerrar modal', () => {
    wrapper.find('form').simulate('submit',{
        preventDefault(){}
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });
  

  test('debe de mostrar error si falta el titulo', () => {
    wrapper.find('form').simulate('submit',{
        preventDefault(){}
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);

  });

  test('debe de crear un evento', () => {
    const initState = {
        calendar: {
            events: [],
            activeEvent: null
        },
        auth:{
            uid: '123',
            name: 'Milena'
        },
        ui:{
            modalOpen: true
        }
    };
    let store = mockStore(initState);
    store.dispatch = jest.fn();
    
    const wrapper = mount(
        <Provider store={store}>
            <CalendarModal />
        </Provider>
    );


        wrapper.find('input[name="title"]').simulate('change',{
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        });

        expect(eventClearActiveEvent).toHaveBeenCalled();

  });

  test('debe validar fechas', () => {
    wrapper.find('input[name="title"]').simulate('change',{
        target: {
            name: 'title',
            value: 'Hola pruebas'
        }
    });

    const hoy = new Date();
    act(() => {
        wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
    })

    wrapper.find('form').simulate('submit',{
        preventDefault(){}
    });

    expect(Swal.fire).toHaveBeenCalledWith({"icon": "error", "text": "fecha de inicio debe ser menor a la fecha de finalización", "title": "Date Error"});
  });
  
  
  
  
});
