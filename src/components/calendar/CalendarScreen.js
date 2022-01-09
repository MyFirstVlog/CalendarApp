import React, { useState } from 'react';
import {Calendar as BigCalendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messsages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import  'moment/locale/es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
//? Para cambiar el idioma a moment y a su vez el del calendar

moment.locale('es');

const localizer = momentLocalizer(moment); 

const myEventsList = [{
    title: 'Cumpleaños de',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: "#fafafa",
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Milena'
    }
}]

export const CalendarScreen = () => {

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        console.log('double click:', e)
    };

    const onSelectEvent = (e) => {
        console.log('select event:', e)
    };

    const onViewChange = (e) => {
        console.log('view:',e)
        const currentView = e;
        setlastView(currentView);
        localStorage.setItem('lastView', currentView);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected)
        const style = {
            backgroundColor : '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }
//? Los components hacen detectar el evento
    return (
        <div className='calendar-screen'>
            <Navbar />
            <BigCalendar
                localizer={localizer}
                events={myEventsList}
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
            />

            <CalendarModal />
        </div>
    )
}
