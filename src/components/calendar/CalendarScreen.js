import React, { useEffect, useState } from 'react';
import {Calendar as BigCalendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messsages-es';
import {useDispatch, useSelector } from 'react-redux';
import {uiOpenModal} from '../../actions/ui'


import 'react-big-calendar/lib/css/react-big-calendar.css';
import  'moment/locale/es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
//? Para cambiar el idioma a moment y a su vez el del calendar

moment.locale('es');

const localizer = momentLocalizer(moment); 


export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth)

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])

    const onDoubleClick = (e) => {
        // console.log('double click:', e)
        dispatch(uiOpenModal())

    };

    const onSelectEvent = (e) => {        
        const {bgcolor, ...event} = e;
        
        console.log('select event:', event);

        dispatch(eventSetActive(event))
        
    };

    const onViewChange = (e) => {
        // console.log('view:',e)
        const currentView = e;
        setlastView(currentView);
        localStorage.setItem('lastView', currentView);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const style = {
            backgroundColor : (uid === event.user._id) ? '#367cf7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    };

    const onSelectSlot = (e) => {
        console.log(e)
        dispatch(eventClearActiveEvent());
    }
//? Los components hacen detectar el evento
    return (
        <div className='calendar-screen'>
            <Navbar />
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                selectable={true}
                onSelectSlot={onSelectSlot}
            />

            <AddNewFab />
            { (activeEvent) ? <DeleteEventFab /> : ''}

            <CalendarModal />
        </div>
    )
}
