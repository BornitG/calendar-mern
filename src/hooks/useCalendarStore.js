import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";



export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {

        try {
            if ( calendarEvent.id ){
                // Updating
                await calendarApi.put(`/event/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }
    
            // Creating
            const { data } = await calendarApi.post('/event', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );

        } catch (error) {
            console.log( error );
            Swal.fire('Error while saving', error.response.data.msg, 'error');
        }
        
    }
    
    const startDeletingEvent = async() => {
        
        try {
            await calendarApi.delete(`/event/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log( error );
            Swal.fire('Error while deleting', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/event');
            const events = convertEventsToDateEvents( data.events );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error loading events');
            console.log({error});
        }
    }

    return {

        //* Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,

    }

}