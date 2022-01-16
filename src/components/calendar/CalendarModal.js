import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';

import './styles.css'
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import {eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const later = now.clone().add(1, 'hours');
const initEvent = {
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: later.toDate()
}
export const CalendarModal = () => {

    const dispatch = useDispatch();

    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)

    const [dateStart, setdateStart] = useState(now.toDate());
    const [dateEnd, setdateEnd] = useState(later.toDate());
    const [titleValid, setTitleValid] = useState(true)

    const [formValues, setformValues] = useState(initEvent);

    const {notes, title, start, end} = formValues

    useEffect(() => {
        if(activeEvent){
            setformValues(activeEvent);
        }else{
            setformValues(initEvent);
        }
    }, [activeEvent, setformValues])

    const handleInputChange = ({target}) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        console.log('closing ...')
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setformValues(initEvent);
    };

    const handleStartDateChange = (e) => {
        setdateStart(e);
        setformValues({
            ...formValues,
            start: e
        })
    };
    const handleEndDateChange = (e) => {
        setdateEnd(e);
        setformValues({
            ...formValues,
            end: e
        })
    };


    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)){
            // console.log('fecha de inicio debe ser menor')
            return Swal.fire({
                icon: 'error',
                title: 'Date Error',
                text: 'fecha de inicio debe ser menor a la fecha de finalización'
            })
        };
        if(title.trim().length < 2){
            return setTitleValid(false);
        }

        if(activeEvent){
            dispatch(eventStartUpdate(formValues));
        }else{
            dispatch(eventStartAddNew(formValues));
        }


        setTitleValid(true);
        closeModal();

    }

    return (
        <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName= "modal-fondo"
      >
          <h1> {(activeEvent) ? 'Editar Evento' : 'Nuevo Evento'}</h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={titleValid  ? "form-control" : "form-control is-invalid"}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
      </Modal>
    )
}
