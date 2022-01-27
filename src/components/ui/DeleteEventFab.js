import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2';
import { eventDeleted, eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        console.log('hola');
        dispatch(eventStartDelete());
        Swal.fire({
            icon: 'success',
            title: 'Event eliminated',
            text: 'Este Evento ha sido eliminado'
        })
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
        >
            <i className='fas fa-trash'></i>
            <span>Borrar Evento</span>
        </button>
    )
}
