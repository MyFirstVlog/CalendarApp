import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
//Porque necesito renderizar componente
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { DeleteEventFab } from '../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../actions/events';

jest.mock('../../actions/events', () => ({
  eventStartDelete: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

//SDolo me interesa saber si se dispara entonces, hare un mopck

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab />
    </Provider>
)


describe('DeleteEventFab Test', () => {
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el eventStartDelete al hacer cliock', () => {
    
    wrapper.find('button').prop('onClick')();

    // const actions = store.getActions();

    expect(eventStartDelete).toHaveBeenCalled();
  });
  
  
});
