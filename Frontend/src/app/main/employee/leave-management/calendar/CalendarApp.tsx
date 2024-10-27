import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  DateSelectArg,
  EventClickArg,
  DatesSetArg,
  EventAddArg,
  EventChangeArg,
  EventContentArg,
} from '@fullcalendar/core';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import CalendarHeader from './CalendarHeader';
import EventDialog from './EventDialog';
import { Event } from './types';

// Keep the Root styled component (unchanged)
const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .container': {
    maxWidth: '100%!important'
  },
  '& a': {
    color: `${theme.palette.text.primary}!important`,
    textDecoration: 'none!important'
  },
  '&  .fc-media-screen': {
    minHeight: '100%',
    width: '100%'
  },
  '& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
    borderColor: `${theme.palette.divider}!important`
  },
  '&  .fc-scrollgrid-section > td': {
    border: 0
  },
  '& .fc-daygrid-day': {
    '&:last-child': {
      borderRight: 0
    }
  },
  '& .fc-col-header-cell': {
    borderWidth: '0 1px 0 1px',
    padding: '8px 0 0 0',
    '& .fc-col-header-cell-cushion': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: 12,
      textTransform: 'uppercase'
    }
  },
  '& .fc-view ': {
    '& > .fc-scrollgrid': {
      border: 0
    }
  },
  '& .fc-daygrid-day.fc-day-today': {
    backgroundColor: 'transparent!important',
    '& .fc-daygrid-day-number': {
      borderRadius: '100%',
      backgroundColor: `${theme.palette.secondary.main}!important`,
      color: `${theme.palette.secondary.contrastText}!important`
    }
  },
  '& .fc-daygrid-day-top': {
    justifyContent: 'center',

    '& .fc-daygrid-day-number': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: 12,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      margin: '4px 0',
      borderRadius: '50%',
      float: 'none',
      lineHeight: 1
    }
  },
  '& .fc-h-event': {
    background: 'initial'
  },
  '& .fc-event': {
    border: 0,
    padding: '0 ',
    fontSize: 12,
    margin: '0 6px 4px 6px!important'
  }
}));

export default function CalendarApp() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentDate, setCurrentDate] = useState<DatesSetArg | null>(null);
  const calendarRef = useRef<FullCalendar>(null);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setIsNewEvent(true);
    setSelectedEvent({
      id: String(Date.now()),
      title: '',
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay,
      extendedProps: {
        reason: '',
        summary: '',
        leaveType: 'Vacation',
        halfDay: false,
        fullDay: false,
      },
    });
    setAnchorEl(selectInfo.jsEvent.target as HTMLElement);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setIsNewEvent(false);
    setSelectedEvent(clickInfo.event.toPlainObject() as Event);
    setAnchorEl(clickInfo.jsEvent.target as HTMLElement);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (event: Event) => {
    if (isNewEvent) {
      setEvents([...events, event]);
    } else {
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    }
    console.log('Event saved:', event);
    handleClosePopover();
  };

  const handleDeleteEvent = (event: Event) => {
    setEvents(events.filter((e) => e.id !== event.id));
    console.log('Event deleted:', event);
    handleClosePopover();
  };

  const handleDatesSet = (arg: DatesSetArg) => {
    setCurrentDate(arg);
  };

  const handleEventAdd = (arg: EventAddArg) => {
    console.log('Event added:', arg.event.toPlainObject());
  };

  const handleEventChange = (arg: EventChangeArg) => {
    console.log('Event changed:', arg.event.toPlainObject());
  };

  const handleEventContent = (arg: EventContentArg) => {
    return (
      <>
        <b>{arg.timeText}</b>
        <i>{arg.event.title}</i>
      </>
    );
  };

  // New function to handle adding an event from the header
  const handleAddEventClick = () => {
    setIsNewEvent(true);
    setSelectedEvent({
      id: String(Date.now()),
      title: '',
      start: new Date(),
      end: new Date(),
      allDay: false,
      extendedProps: {
        reason: '',
        summary: '',
        leaveType: 'Vacation',
        halfDay: false,
        fullDay: false,
      },
    });
    setAnchorEl(document.body); // This will center the popover
  };

  // New function to handle view changes
  const handleViewChange = (viewType: string) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(viewType);
    }
  };

  return (
    <Root
      header={
        <CalendarHeader
          currentDate={currentDate}
          onAddEventClick={handleAddEventClick}
          onViewChange={handleViewChange}
        />
      }
      content={
        <div className="w-full">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            datesSet={handleDatesSet}
            eventAdd={handleEventAdd}
            eventChange={handleEventChange}
            eventContent={handleEventContent}
            ref={calendarRef}
          />

          <EventDialog
            event={selectedEvent}
            isNewEvent={isNewEvent}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            onSave={handleSaveEvent}
            onDelete={handleDeleteEvent}
          />
        </div>
      }
    />
  );
}