# Font awesome

Libreria para descargar iconos

```<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" />```

# React big calendar

Calendario 

```npm i react-big-calendar```

Demo and docs: https://jquense.github.io/react-big-calendar/examples/index.html

## Para poner en español el calendario, gist de objeto en español

https://gist.github.com/Klerith/1658fc368898dd673fc5a9a01ccb12ff

# React modal

``` npm i react-modal ```

y gist de css para el modal: 

https://gist.github.com/Klerith/5f490092ce9bd5775cb1d91162be0cea


# React date picker

```npm i react-datetime-picker```

# Installing redux on my app

```npm install react-redux redux redux-thunk```

# Testing

```https://enzymejs.github.io/enzyme/```
```https://www.npmjs.com/package/enzyme-to-json```
```https://github.com/reduxjs/redux-mock-store```

usamos thunk porque hay funciones asincronas que devuelven funciones


Cuando sale este error 

react-modal: No elements were found for selector #root.

poner condicional en calendar modal

if(process.env.NODE_ENV !== 'test'){
    Modal.setAppElement('#root');
}

Esquelto para pruebas que usan store:


//***************************************
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

//****************************************