import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Pruebas en el authReducer', () => {

    const initState = {
        checking: true
    }

  test('debe retornar el estado por defecto ', () => {
    const action = {
        type: types.authLogin,
        payload: {
            uid: 'sdf324',
            name:'Alejo'
        }
    }

    const state = authReducer(initState, action);

    expect(state).toStrictEqual({ checking: false, uid: 'sdf324', name: 'Alejo' });

    const logoutAction = {
        type: types.authLogout
    }

    const logoutState = authReducer(state, logoutAction );

    expect(logoutState).toStrictEqual({...state, uid:'', name: ''});
  });
  
});
