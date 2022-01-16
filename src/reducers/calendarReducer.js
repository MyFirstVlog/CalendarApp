import { types } from "../types/types";


const initialState = {
    events: [],
    activeEvent:null
};

/**
 * {
        id: nanoid(10),
        title: 'Cumpleaños de',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        notes: 'Comprar el pastel',
        user: {
            _id: nanoid(5),
            name: 'Milena'
        }
    }
 */

export const calendarReducer = (state=initialState, action) => {
    switch (action.type) {

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };
        case types.eventAddNew:
            return {
                ...state,
                events: [action.payload,...state.events]
            };

        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            };
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(event => {
                    if(event.id === action.payload.id){
                        return action.payload
                    }
                    return event;
                })
            };
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(event => event.id !== state.activeEvent.id),
                activeEvent: null
            };
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state;
    }
}