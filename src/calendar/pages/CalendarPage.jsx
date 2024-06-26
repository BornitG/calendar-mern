import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, NavBar, FabAddNew, FabDelete } from '../';
import { getMessagesEs, localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, activeEvent, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  const eventStyleGetter = ( event, start, end, isSelected) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );
    const isTheEventSelected = event.id === activeEvent?.id
    isSelected = isTheEventSelected

    const style = {
      backgroundColor: isSelected ? '#dc3545' : isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.9,
      color: 'white',
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    openDateModal();
  }
  const onSelect = ( event ) => {
    setActiveEvent( event );
  }
  const onViewChanged = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event );
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <NavBar />  

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />

    </>
  )
}