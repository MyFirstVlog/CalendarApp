import { types } from "../types/types";

const initialState = {
    modalOpen: false
}


export const uiReducer = (state = initialState, action) => {
    switch (action.types) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
            
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
    
        default:
            return state
 
    }
}