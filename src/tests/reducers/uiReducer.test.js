import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initState = {
    modalOpen: false
}

describe('Pruebas en el ui reducer', () => {
  test('debe retornar el estado por defecto', () => {
    const state = uiReducer( initState, {});

    expect(state).toEqual(initState);

  });

  test('debe de abrir y cerrar el modal', () => {
    const modalOpen = uiOpenModal();

    const state = uiReducer(initState, modalOpen);

    console.log(state);
    expect(state.modalOpen).toBe(true);

    const modalClose = uiCloseModal();

    const stateClose = uiReducer(state, modalClose);

    expect(stateClose.modalOpen).toBe(false);


  });
  
  
});
