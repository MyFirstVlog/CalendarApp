import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
//Porque necesito renderizar componente
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../components/calendar/CalendarScreen';
import {messages} from '../../helpers/calendar-messsages-es';
import { types } from '../../types/types';
import { eventSetActive } from '../../actions/events';
import { act } from '@testing-library/react';

jest.mock('../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}))

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    calendar: {
        events: []
    },
    auth:{
        uid: '123',
        name: 'Milena'
    },
    ui:{
        modalOpen: false
    }
};
let store = mockStore(initState);

//SDolo me interesa saber si se dispara entonces, hare un mopck

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
);

describe('Pruebas en CalendarScreen', () => {
  test('debe de morstarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('pruebas con las interacciones del calendario', () => {
    const calendar = wrapper.find('Calendar');

    const calendarMessages = calendar.prop('messages')

    expect(calendarMessages).toEqual(messages)

    calendar.prop('onDoubleClickEvent')();

    expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal});
    
    calendar.prop('onSelectEvent')({start: 'hola'});

    expect(eventSetActive).toHaveBeenCalledWith({start: 'hola'});
    
    act(() => { 
        calendar.prop('onView')('week');
    
        expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    })
    
  });
  
  
});
