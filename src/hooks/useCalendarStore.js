import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {
        // Todo Update event
        if ( calendarEvent._id ){
            // Updating
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // Creating
            const { data } = await calendarApi.post('/event', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    }

    return {

        //* Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent

    }

}